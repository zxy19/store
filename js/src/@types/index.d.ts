import type Model from "flarum/common/Model";

type feApp = (
    provider: string,
    name: string,
    getProviderData?: (providerDatas: { [key: string]: string }) => Promise<void>,
    getShowCase?: (item: any, purchase_history?: any) => any,
    getUseData?: (item: any) => Promise<string>
) => void;
type StoreItem = Model | {
    itemData: () => Record<string, any> | null,
    name: () => string,
    desc: () => string,
    price: () => number
    provider: () => string,
    provider_data: () => string,
    unavailable: () => string | false,
    valid: () => boolean,
    rest_cnt: () => number,
    use_cnt: () => number,
    expire_time: () => number,
    can_use: () => boolean
}
type PurchaseHistory = Model | {
    expire_at: () => string,
    user_id: () => number,
    item_id: () => number,
    valid: () => boolean,
    itemData: () => Record<string, any> | null,
    store_item: () => StoreItem | null,
    provider: () => string,
    can_use: () => boolean,
    rest_cnt: () => number
}
type cUseHelper = {
    get: (provider: string) => Promise<UseHelper>,
}
type UseHelper = {
    filter: (predicate: (item: PurchaseHistory) => boolean) => UseHelper
    filterWithData: (predicate: (data: Record<string, string>) => boolean) => UseHelper,
    filterAvailable: () => UseHelper,
    expireTimeRev: () => UseHelper;
    expireTime: () => UseHelper
    sort: (predicate: (a: PurchaseHistory, b: PurchaseHistory) => number) => UseHelper,
    query: () => Promise<UseHelper>,
    hasItem: () => boolean,
    use: (data: string) => Promise<void>
}

type cPurchaseHelper = {
    get: (provider: string) => Promise<PurchaseHelper>,
}
type PurchaseHelper = {
    filter: (predicate: (item: PurchaseHistory) => boolean) => PurchaseHelper
    filterWithData: (predicate: (data: Record<string, string>) => boolean) => PurchaseHelper,
    filterAvailable: () => PurchaseHelper,
    sort: (predicate: (a: PurchaseHistory, b: PurchaseHistory) => number) => PurchaseHelper,
    query: () => Promise<PurchaseHelper>,
    hasItem: () => boolean,
    purchase: (data: string) => Promise<void>
}

export { feApp, cPurchaseHelper, cUseHelper, PurchaseHistory, StoreItem }