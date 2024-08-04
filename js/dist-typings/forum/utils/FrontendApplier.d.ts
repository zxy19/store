import StoreItem from "../../common/models/StoreItem";
import PurchaseHistory from "../../common/models/PurchaseHistory";
import type { ComponentTypes } from 'mithril';
/**
 * implement provider's frontend part.
 * @param provider provider id
 * @param name provider name(translated)
 * @param getProviderData Function to make select in create modal. Accept an Record<string,string>, which should be filled with `provider_data:describe` after invoke and an Record<string,()=>Promise<string>> which should be filled with callbacks for those data keys requires special value. See template repo for example.
 * @param getShowCase Function to create showcase for item box. Return Mithril.VNode/string
 * @param getUseData Function to get data that is filled to use form. Should return SERIALIZED data as string.
 */
export declare function addFrontendProviders(provider: string, name: string, getProviderData?: (providerDatas: Record<string, string>, specialProviderKeyCallback: Record<string, () => Promise<string>>) => Promise<void>, getShowCase?: (item: StoreItem, purchase_history?: PurchaseHistory) => ComponentTypes, getUseData?: (item: PurchaseHistory) => Promise<string>, afterPurchase?: (item: PurchaseHistory) => Promise<void>, getUseButtonName?: (item: PurchaseHistory, confirm: boolean, alwaysShow: boolean) => {
    text: string;
    disable: boolean;
}): void;
