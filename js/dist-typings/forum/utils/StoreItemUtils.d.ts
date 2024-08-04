/// <reference types="mithril" />
import StoreItem from "../../common/models/StoreItem";
import PurchaseHistory from "../../common/models/PurchaseHistory";
export default class StoreItemUtils {
    static instance: StoreItemUtils;
    static getInstance(): StoreItemUtils;
    getFilterProviderDict(dict: Record<string, string>): void;
    createItemShowCase(item: StoreItem, purchase_history?: PurchaseHistory): JSX.Element;
    getUseButtonName(item: PurchaseHistory, confirm: boolean, alwaysShow: boolean): {
        text: string;
        disable: boolean;
    };
    getUseData(item: PurchaseHistory): Promise<string>;
    use(item: PurchaseHistory): Promise<void>;
    useWithData(item: PurchaseHistory, data: string): Promise<void>;
    getProviderName(provider: string): string;
    afterPurchase(item: PurchaseHistory): Promise<void>;
}
