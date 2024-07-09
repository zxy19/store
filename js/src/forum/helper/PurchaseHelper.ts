import app from "flarum/forum/app";
import StoreItem from "../../common/models/StoreItem";
import QueryModal from "../components/QueryModal";

export class PurchaseHelper {
    storeItem: StoreItem[];

    constructor(storeItem: StoreItem[]) {
        this.storeItem = storeItem;
    }
    static async get(provider: string): Promise<PurchaseHelper> {
        return new PurchaseHelper(await app.store.find("store-item", { type: provider } as any) as any);
    }

    filter(predicate: (item: StoreItem) => boolean): PurchaseHelper {
        this.storeItem = this.storeItem.filter(predicate);
        return this;
    }
    filterWithData(predicate: (data: Record<string, string>) => boolean): PurchaseHelper {
        this.storeItem = this.storeItem.filter(d => predicate(d.attribute("data")));
        return this;
    }
    filterAvailable(): PurchaseHelper {
        return this.filter(d => { return (d.rest_cnt() as number) > 0 });
    }
    sort(predicate: (a: StoreItem, b: StoreItem) => number): PurchaseHelper {
        this.storeItem.sort(predicate);
        return this;
    }
    query(): Promise<PurchaseHelper> {
        return new Promise((resolve, reject) => {
            if (!this.storeItem.length) return resolve(this);
            const items = this.storeItem;
            this.storeItem = [];
            app.modal.show(QueryModal, {
                items,
                on_submit: (selected: StoreItem) => {
                    this.storeItem = [selected];
                },
                on_close: () => {
                    resolve(this);
                }
            }, true)
        });
    }
    hasItem() {
        return this.storeItem.length > 0;
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