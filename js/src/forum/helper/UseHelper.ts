import app from "flarum/forum/app";
import PurchaseHistory from "../../common/models/PurchaseHistory";
import StoreItemUtils from "../utils/StoreItemUtils";
import QueryModal from "../components/QueryModal";

export class UseHelper {
    purchaseHistory: PurchaseHistory[];

    constructor(purchaseHistory: PurchaseHistory[]) {
        this.purchaseHistory = purchaseHistory;
    }
    static async get(provider: string): Promise<UseHelper> {
        return new UseHelper(await app.store.find("purchase-history", { type: provider } as any) as any);
    }

    filter(predicate: (item: PurchaseHistory) => boolean): UseHelper {
        this.purchaseHistory = this.purchaseHistory.filter(predicate);
        return this;
    }
    filterWithData(predicate: (data: Record<string, string>) => boolean): UseHelper {
        this.purchaseHistory = this.purchaseHistory.filter(d => predicate(d.attribute("data")));
        return this;
    }
    filterAvailable(): UseHelper {
        return this.filter(d => { return (d.rest_cnt() as number) > 0 });
    }
    expireTimeRev(): UseHelper {
        this.purchaseHistory.sort((a, b) => {
            if (a.expire_at() === null) {
                if (b.expire_at() === null) return 0;
                else return 1;
            }
            return new Date(a.expire_at() as string).getTime() > new Date(b.expire_at() as string).getTime() ? 1 : -1;
        });
        return this;
    }
    expireTime(): UseHelper {
        this.purchaseHistory.sort((a, b) => {
            if (a.expire_at() === null) {
                if (b.expire_at() === null) return 0;
                else return -1;
            }
            return new Date(a.expire_at() as string).getTime() > new Date(b.expire_at() as string).getTime() ? -1 : 1;
        });
        return this;
    }
    sort(predicate: (a: PurchaseHistory, b: PurchaseHistory) => number): UseHelper {
        this.purchaseHistory.sort(predicate);
        return this;
    }
    query(): Promise<UseHelper> {
        return new Promise((resolve, reject) => {
            if (!this.purchaseHistory.length) return resolve(this);
            const items = this.purchaseHistory;
            this.purchaseHistory = [];
            app.modal.show(QueryModal, {
                items,
                on_submit: (selected: PurchaseHistory) => {
                    this.purchaseHistory = [selected];
                },
                on_close: () => {
                    resolve(this);
                }
            }, true)
        });
    }
    hasItem(): boolean {
        return this.purchaseHistory.length > 0;
    }
    async use(data: string): Promise<void> {
        if (!this.purchaseHistory.length) {
            throw new Error("no_item_to_use");
        }
        return await StoreItemUtils.getInstance().useWithData(this.purchaseHistory[0], data);
    }
}