import app from "flarum/forum/app";
import PurchaseHistory from "../../common/models/PurchaseHistory";
import StoreItemUtils from "./StoreItemUtils";
import StoreItem from "../../common/models/StoreItem";

export class PurchaseHelper {
    storeItem: StoreItem[];

    constructor(storeItem: StoreItem[]) {
        this.storeItem = storeItem;
    }
    static async get(provider: string): Promise<PurchaseHelper> {
        return new PurchaseHelper(await app.store.find("store-item", { type: provider } as any) as any);
    }

    filter(predicate: (item: StoreItem) => boolean) {
        this.storeItem = this.storeItem.filter(predicate);
        return this;
    }
    filterWithData(predicate: (data: Record<string, string>) => boolean) {
        this.storeItem = this.storeItem.filter(d => predicate(d.attribute("data")));
        return this;
    }
    filterAvailable() {
        return this.filter(d => { return (d.rest_cnt() as number) > 0 });
    }
    sort(predicate: (a: StoreItem, b: StoreItem) => number) {
        this.storeItem.sort(predicate);
        return this;
    }
    async purchase() {
        if (!this.storeItem.length) {
            throw new Error("no_item_to_purchase");
        }
        return await app.request({
            method: 'GET',
            url: app.forum.attribute('apiUrl') + '/store-item/' + this.storeItem[0].id() + '/purchase',
        });
    }
}