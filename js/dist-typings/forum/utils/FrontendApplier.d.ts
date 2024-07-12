import StoreItem from "../../common/models/StoreItem";
import PurchaseHistory from "../../common/models/PurchaseHistory";
/**
 * implement provider's frontend part.
 * @param provider provider id
 * @param name provider name(translated)
 * @param getProviderData Function to make select in create modal. Accept an Record<string,string>, which should be filled with `provider_data:describe` after invoke.
 * @param getShowCase Function to create showcase for item box. Return Mithril.VNode/string
 * @param getUseData Function to get data that is filled to use form. Should return SERIALIZED data as string.
 */
export declare function addFrontendProviders(provider: string, name: string, getProviderData: (providerDatas: {
    [key: string]: string;
}) => Promise<void>, getShowCase: (item: StoreItem, purchase_history?: PurchaseHistory) => any, getUseData: (item: PurchaseHistory) => Promise<string>): void;
