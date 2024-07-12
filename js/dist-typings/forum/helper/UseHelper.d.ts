import PurchaseHistory from "../../common/models/PurchaseHistory";
export declare class UseHelper {
    purchaseHistory: PurchaseHistory[];
    constructor(purchaseHistory: PurchaseHistory[]);
    static get(provider: string): Promise<UseHelper>;
    filter(predicate: (item: PurchaseHistory) => boolean): UseHelper;
    filterWithData(predicate: (data: Record<string, string>) => boolean): UseHelper;
    filterAvailable(): UseHelper;
    expireTimeRev(): UseHelper;
    expireTime(): UseHelper;
    sort(predicate: (a: PurchaseHistory, b: PurchaseHistory) => number): UseHelper;
    query(): Promise<UseHelper>;
    hasItem(): boolean;
    use(data: string): Promise<void>;
}
