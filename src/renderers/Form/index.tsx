import React from 'react';
import PropTypes from 'prop-types';
import {Renderer, RendererProps} from '../../factory';
import {observer} from 'mobx-react';
import {FormStore, IFormStore} from '../../store/form';
import {Api, SchemaNode, Schema, Action, ApiObject, Payload} from '../../types';
import {filter, evalExpression} from '../../utils/tpl';
import cx from 'classnames';
import getExprProperties from '../../utils/filter-schema';
import {
  promisify,
  difference,
  until,
  noop,
  isObject,
  isVisible,
  createObject,
  extendObject
} from '../../utils/helper';
import debouce = require('lodash/debounce');
import flatten = require('lodash/flatten');
import find = require('lodash/find');
import Scoped, {
  ScopedContext,
  IScopedContext,
  ScopedComponentType
} from '../../Scoped';
import {IComboStore} from '../../store/combo';
import qs = require('qs');
import {dataMapping} from '../../utils/tpl-builtin';
import {isApiOutdated, isEffectiveApi} from '../../utils/api';
export type FormGroup = FormSchema & {
  title?: string;
  className?: string;
};
export type FormGroupNode = FormGroup | FormGroupArray;
export interface FormGroupArray extends Array<FormGroupNode> {}

export interface FormSchema {
  fieldSetClassName?: string;
  tabsClassName?: string;
  controls?: SchemaNode;
  tabs?: FormGroupNode;
  fieldSet?: FormGroupNode;
}

export interface FormHorizontal {
  leftFixed?: boolean | string;
  left: string | number;
  right: string | number;
  offset: string | number;
}

export interface FormProps extends RendererProps, FormSchema {
  store: IFormStore;
  wrapperComponent: React.ReactType;
  title?: string; // 标题
  submitText?: string;
  submitOnChange?: boolean; // 设置是否一修改就提交。
  submitOnInit?: boolean;
  resetAfterSubmit?: boolean;
  initApi?: Api; // 可以用来设置初始数据。
  initAsyncApi?: Api; // 如果 api 处理时间过长，可以开启 initAsyncApi 来处理。轮询检测是否真的完成了。
  initCheckInterval?: number;
  initFinishedField?: string;
  interval?: number;
  silentPolling?: boolean;
  stopAutoRefreshWhen?: string;
  api?: Api; // 用来保存的 api
  asyncApi?: Api; // 如果 api 处理时间过长，可以开启 asyncApi 来处理。轮询检测是否真的完成了。
  checkInterval?: number;
  finishedField?: string;
  initFetch?: boolean; // 是否初始拉取？
  initFetchOn?: string;
  className?: string;
  body?: SchemaNode;
  wrapWithPanel?: boolean;
  panelClassName?: string;
  mode?: 'normal' | 'inline' | 'horizontal' | 'row';
  affixFooter?: boolean;
  collapsable?: boolean;
  debug?: boolean;
  autoFocus?: boolean;
  horizontal: FormHorizontal;
  canAccessSuperData: boolean;
  persistData: boolean; // 开启本地缓存
  clearPersistDataAfterSubmit: boolean; // 提交成功后清空本地缓存
  trimValues?: boolean;
  onInit?: (values: object) => any;
  onReset?: (values: object) => void;
  onSubmit?: (values: object, action: any) => any;
  onChange?: (values: object, diff: object) => any;
  onFailed?: (reason: string, errors: any) => any;
  onFinished: (values: object, action: any) => any;
  onValidate: (values: object, form: any) => any;
  messages: {
    fetchSuccess?: string;
    fetchFailed?: string;
    saveSuccess?: string;
    saveFailed?: string;
    validateFailed?: string;
  };
}

export default class Form extends React.Component<FormProps, object> {
  static defaultProps = {
    title: '表单',
    submitText: '提交',
    initFetch: true,
    wrapWithPanel: true,
    mode: 'normal',
    collapsable: false,
    controlWidth: 'full',
    horizontal: {
      left: 2,
      right: 10,
      offset: 2
    },
    panelClassName: 'Panel--default',
    messages: {
      fetchFailed: '初始化失败',
      saveSuccess: '保存成功',
      saveFailed: '保存失败'
    },
    wrapperComponent: '',
    finishedField: 'finished',
    initFinishedField: 'finished'
  };
  static propsList: Array<string> = [
    'title',
    'controls',
    'tabs',
    'fieldSet',
    'submitText',
    'initFetch',
    'wrapWithPanel',
    'mode',
    'collapsable',
    'horizontal',
    'panelClassName',
    'messages',
    'wrapperComponent',
    'resetAfterSubmit',
    'submitOnInit',
    'submitOnChange',
    'onInit',
    'onReset',
    'onSubmit',
    'onChange',
    'onFailed',
    'onFinished',
    'canAccessSuperData'
  ];

  hooks: {
    [propName: string]: Array<() => Promise<any>>;
  } = {};
  asyncCancel: () => void;
  disposeOnValidate: () => void;
  shouldLoadInitApi: boolean = false;
  timer: NodeJS.Timeout;
  mounted: boolean;
  constructor(props: FormProps) {
    super(props);

    this.onInit = this.onInit.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.handleDialogConfirm = this.handleDialogConfirm.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleDrawerConfirm = this.handleDrawerConfirm.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.submit = this.submit.bind(this);
    this.addHook = this.addHook.bind(this);
    this.removeHook = this.removeHook.bind(this);
    this.handleChange = debouce(this.handleChange.bind(this), 250, {
      trailing: true,
      leading: false
    });
    this.renderFormItems = this.renderFormItems.bind(this);
    this.reload = this.reload.bind(this);
    this.silentReload = this.silentReload.bind(this);
    this.initInterval = this.initInterval.bind(this);
  }

  componentWillMount() {
    const {store, canAccessSuperData, persistData} = this.props;

    store.setCanAccessSuperData(canAccessSuperData !== false);
    persistData && store.getPersistData();

    if (
      store &&
      store.parentStore &&
      store.parentStore.storeType === 'ComboStore'
    ) {
      const combo = store.parentStore as IComboStore;
      combo.addForm(store);
      combo.forms.forEach(item =>
        item.items.forEach(item => item.unique && item.syncOptions())
      );
    }
  }

  componentDidMount() {
    const {
      initApi,
      initFetch,
      initFetchOn,
      initAsyncApi,
      initFinishedField,
      initCheckInterval,
      store,
      messages: {fetchSuccess, fetchFailed},
      onValidate
    } = this.props;

    this.mounted = true;

    if (onValidate) {
      const finnalValidate = promisify(onValidate);
      this.disposeOnValidate = this.addHook(async () => {
        const result = await finnalValidate(store.data, store);

        if (result && isObject(result)) {
          Object.keys(result).forEach(key => {
            let msg = result[key];
            const item = store.getItemByName(key);

            // 没有这个 formItem
            if (!item) {
              return;
            }

            if (msg) {
              msg = Array.isArray(msg) ? msg : [msg];
              item.addError(msg);
            } else {
              item.clearError();
            }
          });
        }
      });
    }

    if (isEffectiveApi(initApi, store.data, initFetch, initFetchOn)) {
      store
        .fetchInitData(initApi as any, store.data, {
          successMessage: fetchSuccess,
          errorMessage: fetchFailed,
          onSuccess: () => {
            if (
              !isEffectiveApi(initAsyncApi, store.data) ||
              store.data[initFinishedField || 'finished']
            ) {
              return;
            }

            return until(
              () => store.checkRemote(initAsyncApi, store.data),
              (ret: any) => ret && ret[initFinishedField || 'finished'],
              cancel => (this.asyncCancel = cancel),
              initCheckInterval
            );
          }
        })
        .then(this.initInterval)
        .then(this.onInit);
    } else {
      this.onInit();
    }
  }

  componentDidUpdate(prevProps: FormProps) {
    const props = this.props;
    const store = props.store;

    if (
      isApiOutdated(
        prevProps.initApi,
        props.initApi,
        prevProps.data,
        props.data
      )
    ) {
      const {fetchSuccess, fetchFailed} = props;

      store
        .fetchData(props.initApi as Api, store.data, {
          successMessage: fetchSuccess,
          errorMessage: fetchFailed
        })
        .then(this.initInterval);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    clearTimeout(this.timer);
    (this.handleChange as any).cancel();
    this.asyncCancel && this.asyncCancel();
    this.disposeOnValidate && this.disposeOnValidate();
    const store = this.props.store;

    if (
      store &&
      store.parentStore &&
      store.parentStore.storeType === 'ComboStore'
    ) {
      const combo = store.parentStore as IComboStore;
      combo.removeForm(store);
    }
  }

  async onInit() {
    const {onInit, store, submitOnInit} = this.props;

    // 先拿出来数据，主要担心 form 被什么东西篡改了，然后又应用出去了
    // 之前遇到过问题，所以拿出来了。但是 options  loadOptions 默认值失效了。
    // 所以目前需要两个都要设置一下，再 init Hook 里面。
    const data = {...store.data};

    store.setInited(true);
    const hooks: Array<(data: any) => Promise<any>> = this.hooks['init'] || [];
    await Promise.all(hooks.map(hook => hook(data)));

    onInit && onInit(extendObject(store.data, data));

    submitOnInit &&
      this.handleAction(
        undefined,
        {
          type: 'submit'
        },
        store.data
      );
  }

  reload(query?: any, silent?: boolean) {
    if (query) {
      return this.receive(query);
    }

    const {
      store,
      initApi,
      initAsyncApi,
      initFinishedField,
      messages: {fetchSuccess, fetchFailed}
    } = this.props;

    isEffectiveApi(initAsyncApi, store.data) &&
      store.updateData({
        [initFinishedField || 'finished']: false
      });

    isEffectiveApi(initApi, store.data)
      ? store
          .fetchInitData(initApi, store.data, {
            successMessage: fetchSuccess,
            errorMessage: fetchFailed,
            silent,
            onSuccess: () => {
              if (
                !isEffectiveApi(initAsyncApi, store.data) ||
                store.data[initFinishedField || 'finished']
              ) {
                return;
              }

              return until(
                () => store.checkRemote(initAsyncApi, store.data),
                (ret: any) => ret && ret[initFinishedField || 'finished'],
                cancel => (this.asyncCancel = cancel)
              );
            }
          })
          .then(this.initInterval)
          .then(() => store.reset(undefined, false))
      : store.reset(undefined, false);
  }

  receive(values: object) {
    const {store} = this.props;

    store.updateData(values);
    this.reload();
  }

  silentReload(target?: string, query?: any) {
    this.reload(query, true);
  }

  initInterval(value: any) {
    const {interval, silentPolling, stopAutoRefreshWhen, data} = this.props;

    clearTimeout(this.timer);
    interval &&
      this.mounted &&
      (!stopAutoRefreshWhen || !evalExpression(stopAutoRefreshWhen, data)) &&
      (this.timer = setTimeout(
        silentPolling ? this.silentReload : this.reload,
        Math.max(interval, 3000)
      ));
    return value;
  }

  isValidated() {
    return this.props.store.validated;
  }

  validate(forceValidate?: boolean): Promise<boolean> {
    const {store} = this.props;

    return store.validate(this.hooks['validate'] || [], forceValidate);
  }

  clearErrors() {
    const {store} = this.props;

    return store.clearErrors();
  }

  submit(fn?: (values: object) => Promise<any>): Promise<any> {
    const {store, messages} = this.props;

    return store.submit(
      fn,
      this.hooks['validate' || []],
      messages && messages.validateFailed
    );
  }

  reset() {
    const {store, onReset} = this.props;
    store.reset(onReset);
  }

  addHook(fn: () => any, type: string = 'validate') {
    this.hooks[type] = this.hooks[type] || [];
    this.hooks[type].push(promisify(fn));
    return () => {
      this.removeHook(fn, type);
      fn = noop;
    };
  }

  removeHook(fn: () => any, type: string = 'validate') {
    const hooks = this.hooks[type];

    if (!hooks) {
      return;
    }

    for (let i = 0, len = hooks.length; i < len; i++) {
      let hook = hooks[i];

      if ((hook as any).raw === fn) {
        hooks.splice(i, 1);
        len--;
        i--;
      }
    }
  }

  handleChange(value: any, name: string, submit: boolean) {
    const {onChange, store, submitOnChange} = this.props;

    onChange && onChange(store.data, difference(store.data, store.pristine));

    (submit || submitOnChange) &&
      this.handleAction(
        undefined,
        {
          type: 'submit'
        },
        store.data
      );
  }

  handleFormSubmit(e: React.UIEvent<any>) {
    e.preventDefault();
    return this.handleAction(
      e,
      {
        type: 'submit'
      },
      this.props.store.data
    );
  }

  handleAction(
    e: React.UIEvent<any> | void,
    action: Action,
    data: object,
    throwErrors: boolean = false,
    delegate?: boolean
  ): any {
    const {
      store,
      onSubmit,
      api,
      asyncApi,
      finishedField,
      checkInterval,
      messages: {saveSuccess, saveFailed},
      resetAfterSubmit,
      onAction,
      onSaved,
      onReset,
      onFinished,
      onFailed,
      redirect,
      reload,
      target,
      env,
      onChange,
      clearPersistDataAfterSubmit,
      trimValues
    } = this.props;

    if (trimValues) {
      store.trimValues();
    }

    if (Array.isArray(action.required) && action.required.length) {
      return store.validateFields(action.required).then(result => {
        if (!result) {
          env.notify('error', '依赖的部分字段没有通过验证，请注意填写！');
        } else {
          this.handleAction(
            e,
            {...action, required: undefined},
            data,
            throwErrors,
            delegate
          );
        }
      });
    }

    delegate || store.setCurrentAction(action);
    if (
      action.type === 'submit' ||
      action.actionType === 'submit' ||
      action.actionType === 'confirm'
    ) {
      return this.submit(
        (values): any => {
          if (onSubmit && onSubmit(values, action) === false) {
            return Promise.resolve(values);
          }

          if (target) {
            this.submitToTarget(target, values);
          } else if (action.actionType === 'reload') {
            action.target && this.reloadTarget(action.target, values);
          } else if (action.actionType === 'dialog') {
            store.openDialog(data);
          } else if (action.actionType === 'drawer') {
            store.openDrawer(data);
          } else if (isEffectiveApi(action.api || api, values)) {
            let finnalAsyncApi = action.asyncApi || asyncApi;

            isEffectiveApi(finnalAsyncApi, store.data) &&
              store.updateData({
                [finishedField || 'finished']: false
              });

            return store
              .saveRemote(action.api || (api as Api), values, {
                successMessage: saveSuccess,
                errorMessage: saveFailed,
                onSuccess: () => {
                  if (
                    !isEffectiveApi(finnalAsyncApi, store.data) ||
                    store.data[finishedField || 'finished']
                  ) {
                    return;
                  }

                  return until(
                    () => store.checkRemote(finnalAsyncApi as Api, store.data),
                    (ret: any) => ret && ret[finishedField || 'finished'],
                    cancel => (this.asyncCancel = cancel),
                    checkInterval
                  );
                }
              })
              .then(async response => {
                onSaved && onSaved(values, response);

                // submit 也支持 feedback
                if (action.feedback && isVisible(action.feedback, store.data)) {
                  await this.openFeedback(action.feedback, store.data);
                }

                return values;
              });
          }

          return Promise.resolve(values);
        }
      )
        .then(values => {
          if (onFinished && onFinished(values, action) === false) {
            return values;
          }

          resetAfterSubmit && store.reset(onReset);
          clearPersistDataAfterSubmit && store.clearPersistData();

          if (action.redirect || redirect) {
            env.updateLocation(filter(action.redirect || redirect, store.data));
          } else if (action.reload || reload) {
            this.reloadTarget(action.reload || reload, store.data);
          }

          return values;
        })
        .catch(reason => {
          onFailed && onFailed(reason, store.errors);

          if (throwErrors) {
            throw reason;
          }
        });
    } else if (action.type === 'reset') {
      store.reset(onReset);
    } else if (action.actionType === 'dialog') {
      store.openDialog(data);
    } else if (action.actionType === 'drawer') {
      store.openDrawer(data);
    } else if (action.actionType === 'ajax') {
      if (!isEffectiveApi(action.api)) {
        return env.alert(`当 actionType 为 ajax 时，请设置 api 属性`);
      }

      return store
        .saveRemote(action.api as Api, data, {
          successMessage:
            (action.messages && action.messages.success) || saveSuccess,
          errorMessage:
            (action.messages && action.messages.failed) || saveFailed
        })
        .then(async response => {
          response &&
            onChange &&
            onChange(store.data, difference(store.data, store.pristine));
          if (store.validated) {
            await this.validate(true);
          }

          if (action.feedback && isVisible(action.feedback, store.data)) {
            await this.openFeedback(action.feedback, store.data);
          }

          action.redirect &&
            env.updateLocation(filter(action.redirect, store.data));
          action.reload && this.reloadTarget(action.reload, store.data);
        })
        .catch(() => {});
    } else if (action.actionType === 'reload') {
      action.target && this.reloadTarget(action.target, data);
    } else if (onAction) {
      // 不识别的丢给上层去处理。
      return onAction(e, action, data, throwErrors);
    }
  }

  handleDialogConfirm(
    values: object[],
    action: Action,
    ctx: any,
    targets: Array<any>
  ) {
    const {store, onChange} = this.props;

    if (
      (action.mergeData || store.action.mergeData) &&
      values.length === 1 &&
      values[0] &&
      targets[0].props.type === 'form'
    ) {
      store.updateData(values[0]);
      onChange && onChange(store.data, difference(store.data, store.pristine));
    }

    store.closeDialog(true);
  }

  handleDialogClose() {
    const {store} = this.props;
    store.closeDialog(false);
  }

  handleDrawerConfirm(
    values: object[],
    action: Action,
    ctx: any,
    targets: Array<any>
  ) {
    const {store, onChange} = this.props;

    if (
      (action.mergeData || store.action.mergeData) &&
      values.length === 1 &&
      values[0] &&
      targets[0].props.type === 'form'
    ) {
      store.updateData(values[0]);
      onChange && onChange(store.data, difference(store.data, store.pristine));
    }

    store.closeDrawer(true);
  }

  handleDrawerClose() {
    const {store} = this.props;
    store.closeDrawer(false);
  }

  submitToTarget(target: string, values: object) {
    // 会被覆写
  }

  reloadTarget(target: string, data?: any) {
    // 会被覆写
  }

  openFeedback(dialog: any, ctx: any) {
    return new Promise(resolve => {
      const {store} = this.props;
      store.setCurrentAction({
        type: 'button',
        actionType: 'dialog',
        dialog: dialog
      });
      store.openDialog(ctx, undefined, confirmed => {
        resolve(confirmed);
      });
    });
  }

  buildActions() {
    const {actions, submitText, controls} = this.props;

    if (
      typeof actions !== 'undefined' ||
      !submitText ||
      (Array.isArray(controls) &&
        controls.some(
          item =>
            !!~['submit', 'button', 'reset', 'button-group'].indexOf(
              (item as Schema).type
            )
        ))
    ) {
      return actions;
    }

    return [
      {
        type: 'submit',
        label: submitText,
        primary: true
      }
    ];
  }

  renderFormItems(
    schema: FormSchema,
    region: string = '',
    otherProps: Partial<FormProps> = {}
  ): React.ReactNode {
    return this.renderControls(
      schema.controls as SchemaNode,
      region,
      otherProps
    );

    // return schema.tabs ? this.renderTabs(schema.tabs, schema, region)
    // : schema.fieldSet ? this.renderFiledSet(schema.fieldSet, schema, region) : this.renderControls(schema.controls as SchemaNode, schema, region);
  }

  renderControls(
    controls: SchemaNode,
    region: string,
    otherProps: Partial<FormProps> = {}
  ): React.ReactNode {
    controls = controls || [];

    if (!Array.isArray(controls)) {
      controls = [controls];
    }

    if (this.props.mode === 'row') {
      const ns = this.props.classPrefix;

      controls = flatten(controls).filter(item => {
        if ((item as Schema).hidden || (item as Schema).visible === false) {
          return false;
        }

        const exprProps = getExprProperties(
          item as Schema,
          this.props.store.data
        );
        if (exprProps.hidden || exprProps.visible === false) {
          return false;
        }

        return true;
      });

      if (!controls.length) {
        return null;
      }

      return (
        <div className={`${ns}Form-row`}>
          {controls.map((control, key) =>
            ~['hidden', 'formula'].indexOf((control as any).type) ||
            (control as any).mode === 'inline' ? (
              this.renderControl(control, key, otherProps)
            ) : (
              <div
                key={key}
                className={cx(
                  `${ns}Form-col`,
                  (control as Schema).columnClassName
                )}
              >
                {this.renderControl(control, '', {
                  ...otherProps,
                  mode: 'row'
                })}
              </div>
            )
          )}
        </div>
      );
    }

    return controls.map((control, key) =>
      this.renderControl(control, key, otherProps, region)
    );
  }

  renderControl(
    control: SchemaNode,
    key: any = '',
    otherProps: Partial<FormProps> = {},
    region: string = ''
  ): React.ReactNode {
    if (!control) {
      return null;
    } else if (typeof control === 'string') {
      control = {
        type: 'tpl',
        tpl: control
      };
    }

    const props = {
      ...this.props,
      ...otherProps
    };
    const form = this.props.store;
    const {
      render,
      mode,
      horizontal,
      store,
      disabled,
      controlWidth,
      resolveDefinitions
    } = props;

    const subProps = {
      formStore: form,
      data: store.data,
      key,
      formInited: form.inited,
      formMode: mode,
      formHorizontal: horizontal,
      controlWidth,
      disabled: disabled || (control as Schema).disabled || form.loading,
      btnDisabled: form.loading || form.validating,
      onAction: this.handleAction,
      onChange: this.handleChange,
      addHook: this.addHook,
      removeHook: this.removeHook,
      renderFormItems: this.renderFormItems,
      formPristine: form.pristine
    };

    const subSchema: any =
      control && (control as Schema).type === 'control'
        ? control
        : {
            type: 'control',
            control
          };

    if (subSchema.control) {
      let control = subSchema.control as Schema;
      if (control.$ref) {
        subSchema.control = control = {
          ...resolveDefinitions(control.$ref),
          ...control
        };
        delete control.$ref;
      }
      control.hiddenOn && (subSchema.hiddenOn = control.hiddenOn);
      control.visibleOn && (subSchema.visibleOn = control.visibleOn);
    }

    return render(`${region ? `${region}/` : ''}${key}`, subSchema, subProps);
  }

  renderBody() {
    const {tabs, fieldSet, controls} = this.props;

    return this.renderFormItems({
      tabs,
      fieldSet,
      controls
    });
  }

  render() {
    const {
      className,
      wrapWithPanel,
      render,
      title,
      store,
      panelClassName,
      debug,
      headerClassName,
      footerClassName,
      actionsClassName,
      bodyClassName,
      classPrefix: ns,
      classnames: cx,
      $path,
      affixFooter,
      mode
    } = this.props;
    const WrapperComponent =
      this.props.wrapperComponent ||
      (/(?:\/|^)form\//.test($path as string) ? 'div' : 'form');

    let body = (
      <WrapperComponent
        onSubmit={this.handleFormSubmit}
        className={cx(`Form`, `Form--${mode || 'normal'}`, className)}
        noValidate
      >
        {debug ? (
          <pre>
            <code>{JSON.stringify(store.data, null, 2)}</code>
          </pre>
        ) : null}

        {this.renderBody()}

        {render(
          'modal',
          {
            ...((store.action as Action) &&
              ((store.action as Action).dialog as object)),
            type: 'dialog'
          },
          {
            key: 'dialog',
            data: store.dialogData,
            onConfirm: this.handleDialogConfirm,
            onClose: this.handleDialogClose,
            show: store.dialogOpen
          }
        )}

        {render(
          'modal',
          {
            ...((store.action as Action) &&
              ((store.action as Action).drawer as object)),
            type: 'drawer'
          },
          {
            key: 'drawer',
            data: store.drawerData,
            onConfirm: this.handleDrawerConfirm,
            onClose: this.handleDrawerClose,
            show: store.drawerOpen
          }
        )}
      </WrapperComponent>
    );

    if (wrapWithPanel) {
      body = render(
        'body',
        {
          type: 'panel',
          title: title
        },
        {
          className: cx(panelClassName, 'Panel--form'),
          children: body,
          actions: this.buildActions(),
          onAction: this.handleAction,
          disabled: store.loading,
          btnDisabled: store.loading || store.validating,
          headerClassName,
          footerClassName,
          actionsClassName,
          bodyClassName,
          affixFooter
        }
      ) as JSX.Element;
    }

    return body;
  }
}

@Renderer({
  test: (path: string) =>
    /(^|\/)form$/.test(path) &&
    !/(^|\/)form(?:\/.+)?\/control\/form$/.test(path),
  storeType: FormStore.name,
  name: 'form',
  isolateScope: true
})
export class FormRenderer extends Form {
  static contextType = ScopedContext;

  componentWillMount() {
    const scoped = this.context as IScopedContext;
    scoped.registerComponent(this);
    super.componentWillMount();
  }

  componentDidMount() {
    super.componentDidMount();

    if (this.props.autoFocus) {
      const scoped = this.context as IScopedContext;
      const inputs = scoped.getComponents();
      let focuableInput = find(
        inputs,
        input => input.focus
      ) as ScopedComponentType;
      focuableInput && setTimeout(() => focuableInput.focus!(), 200);
    }
  }

  componentWillUnmount() {
    const scoped = this.context as IScopedContext;
    scoped.unRegisterComponent(this);
  }

  doAction(action: Action, data: object, throwErrors: boolean = false) {
    return this.handleAction(undefined, action, data, throwErrors);
  }

  handleAction(
    e: React.UIEvent<any> | undefined,
    action: Action,
    ctx: object,
    throwErrors: boolean = false,
    delegate?: boolean
  ) {
    if (action.target && action.actionType !== 'reload') {
      const scoped = this.context as IScopedContext;

      return Promise.all(
        action.target.split(',').map(name => {
          let target = scoped.getComponentByName(name);
          return (
            target &&
            target.doAction &&
            target.doAction(
              {
                ...action,
                target: undefined
              },
              ctx,
              throwErrors
            )
          );
        })
      );
    } else {
      return super.handleAction(e, action, ctx, throwErrors, delegate);
    }
  }

  handleDialogConfirm(
    values: object[],
    action: Action,
    ctx: any,
    targets: Array<any>
  ) {
    super.handleDialogConfirm(values, action, ctx, targets);

    const store = this.props.store;
    const scoped = this.context as IScopedContext;

    if (action.reload) {
      scoped.reload(action.reload, ctx);
    } else if (store.action && store.action.reload) {
      scoped.reload(store.action.reload, ctx);
    }
  }

  submitToTarget(target: string, values: object) {
    const scoped = this.context as IScopedContext;
    scoped.send(target, values);
  }

  reloadTarget(target: string, data: any) {
    const scoped = this.context as IScopedContext;
    scoped.reload(target, data);
  }

  reload(target?: string, query?: any, ctx?: any) {
    if (query) {
      return this.receive(query);
    }

    const scoped = this.context as IScopedContext;
    let subPath: string = '';
    let idx: number;
    let subQuery: any = null;
    if (target && ~(idx = target.indexOf('.'))) {
      subPath = target.substring(idx + 1);
      target = target.substring(0, idx);
    }
    const idx2 = target ? target.indexOf('?') : -1;
    if (~idx2) {
      subQuery = dataMapping(
        qs.parse((target as string).substring(idx2 + 1)),
        ctx
      );
      target = (target as string).substring(0, idx2);
    }

    let component;
    if (
      target &&
      (component = scoped.getComponentByName(target)) &&
      component.reload
    ) {
      component.reload(subPath, subQuery, ctx);
    } else if (target === '*') {
      super.reload();
      const components = scoped.getComponents();
      components.forEach(
        (component: any) =>
          component.reload && component.reload('', subQuery, ctx)
      );
    } else {
      super.reload();
    }
  }

  receive(values: object, name?: string) {
    if (name) {
      const scoped = this.context as IScopedContext;
      const idx = name.indexOf('.');
      let subPath = '';

      if (~idx) {
        subPath = name.substring(1 + idx);
        name = name.substring(0, idx);
      }

      const component = scoped.getComponentByName(name);
      component && component.receive && component.receive(values, subPath);
      return;
    }

    return super.receive(values);
  }
}
