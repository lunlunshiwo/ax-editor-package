export declare class SimpleMap<V = any, K = any> {
    private readonly list;
    set(key: K, value: V): void;
    get(key: K): V | null;
    delete(key: K): void;
    dispose(): void;
}
