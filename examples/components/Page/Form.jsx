export default {
  type: 'page',
  title: '表单页面',
  body: {
    type: 'form',
    mode: 'horizontal',
    title: '',
    api: '/api/mock2/form/saveForm',
    controls: [
      {
        label: 'Name',
        type: 'text',
        name: 'name'
      },

      {
        label: 'Email',
        type: 'email',
        name: 'email'
      },

      {
        name: 's',
        type: 'select',
        label: '下拉框',
        multiple: true,
        checkAll: true,
        searchable: true,
        creatable: true,
        editable: true,
        size: 'sm',
        deleteApi: 'xxx',
        options: [
          {
            label: 'A',
            value: 'a'
          },

          {
            label: 'B',
            value: 'b'
          },

          {
            label: 'C',
            value: 'c'
          }
        ]
      },

      {
        type: 'tree-select',
        name: 'tree',
        label: '树',
        creatable: true,
        editable: true,
        checkAll: true,
        multiple: true,
        removable: true,
        showIcon: false,
        options: [
          {
            label: 'Folder A',
            value: 1,
            children: [
              {
                label: 'file A',
                value: 2
              },
              {
                label: 'file B',
                value: 3
              }
            ]
          },
          {
            label: 'file C',
            value: 4
          },
          {
            label: 'file D',
            value: 5
          }
        ]
      }
    ]
  }
};
