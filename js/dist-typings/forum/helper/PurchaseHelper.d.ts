import StoreItem from "../../common/models/StoreItem";
export declare class PurchaseHelper {
    storeItem: StoreItem[];
    constructor(storeItem: StoreItem[]);
    static get(provider: string): Promise<PurchaseHelper>;
    filter(predicate: (item: StoreItem) => boolean): PurchaseHelper;
    filterWithData(predicate: (data: Record<string, string>) => boolean): PurchaseHelper;
    filterAvailable(): PurchaseHelper;
    sort(predicate: (a: StoreItem, b: StoreItem) => number): PurchaseHelper;
    query(): Promise<PurchaseHelper>;
    hasItem(): boolean;
    purchase(): Promise<unknown>;
}
