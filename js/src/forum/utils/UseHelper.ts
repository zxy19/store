import app from "flarum/forum/app";
import PurchaseHistory from "../../common/models/PurchaseHistory";
import StoreItemUtils from "./StoreItemUtils";

export class UseHelper {
    purchaseHistory: PurchaseHistory[];

    constructor(purchaseHistory: PurchaseHistory[]) {
        this.purchaseHistory = purchaseHistory;
    }
    static async get(provider: string): Promise<UseHelper> {
        return new UseHelper(await app.store.find("purchase-history", { type: provider } as any) as any);
    }

    filter(predicate: (item: PurchaseHistory) => boolean) {
        this.purchaseHistory = this.purchaseHistory.filter(predicate);
        return this;
    }
    filterWithData(predicate: (data: Record<string, string>) => boolean) {
        this.purchaseHistory = this.purchaseHistory.filter(d => predicate(d.attribute("data")));
        return this;
    }
    filterAvailable() {
        return this.filter(d => { return (d.rest_cnt() as number) > 0 });
    }
    expireTimeRev() {
        this.purchaseHistory.sort((a, b) => {
            if (a.expire_at() === null) {
                if (b.expire_at() === null) return 0;
                else return 1;
            }
            return new Date(a.expire_at() as string).getTime() > new Date(b.expire_at() as string).getTime() ? 1 : -1;
        });
        return this;
    }
    expireTime() {
        this.purchaseHistory.sort((a, b) => {
            if (a.expire_at() === null) {
                if (b.expire_at() === null) return 0;
                else return -1;
            }
            return new Date(a.expire_at() as string).getTime() > new Date(b.expire_at() as string).getTime() ? -1 : 1;
        });
        return this;
    }
    sort(predicate: (a: PurchaseHistory, b: PurchaseHistory) => number) {
        this.purchaseHistory.sort(predicate);
        return this;
    }
    async use(data: string): Promise<void> {
        if (!this.purchaseHistory.length) {
            throw new Error("no_item_to_use");
        }
        return await StoreItemUtils.getInstance().useWithData(this.purchaseHistory[0], data);
    }
}