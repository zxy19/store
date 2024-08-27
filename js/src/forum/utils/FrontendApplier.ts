import { extend, override } from "flarum/common/extend";
import CreateItemModal from "../components/CreateItemModal";
import StoreItemUtils from "./StoreItemUtils";
import StoreItem from "../../common/models/StoreItem";
import PurchaseHistory from "../../common/models/PurchaseHistory";
import type { ComponentTypes } from 'mithril';
import app from "flarum/forum/app";
/**
 * implement provider's frontend part.
 * @param provider provider id
 * @param name provider name(translated)
 * @param getProviderData Function to make select in create modal. Accept an Record<string,string>, which should be filled with `provider_data:describe` after invoke and an Record<string,()=>Promise<string>> which should be filled with callbacks for those data keys requires special value. See template repo for example.
 * @param getShowCase Function to create showcase for item box. Return Mithril.VNode/string
 * @param getUseData Function to get data that is filled to use form. Should return SERIALIZED data as string.
 * @param afterPurchase Function to be called after purchase.
 * @param getUseButtonName Function to get button name for use. Return {text:string,disable:boolean}
 */
export function addFrontendProviders(
    provider: string,
    name: string,
    getProviderData?: (providerDatas: Record<string, string>, specialProviderKeyCallback: Record<string, () => Promise<string>>) => Promise<void>,
    getShowCase?: (item: StoreItem, purchase_history?: PurchaseHistory) => ComponentTypes,
    getUseData?: (item: PurchaseHistory) => Promise<string>,
    afterPurchase?: (item: PurchaseHistory) => Promise<void>,
    getUseButtonName?: (item: PurchaseHistory, confirm: boolean, alwaysShow: boolean) => { text: string, disable: boolean }
): void {
    if (getProviderData) {
        override(CreateItemModal.prototype, "getProviderData", async function (_originFunc: any, comingProvider) {
            if (comingProvider === provider) {
                await getProviderData(this.providerDatas, this.specialDatas);
            }
            return await _originFunc(comingProvider);
        });
    } else {
        override(CreateItemModal.prototype, "getProviderData", async function (_originFunc: any, comingProvider) {
            if (comingProvider === provider) {
                this.providerDatas['default'] = app.translator.trans("xypp-store.forum.create-modal.provider_data_default")
            }
            return await _originFunc(comingProvider);
        });
    }
    extend(CreateItemModal.prototype, "oninit", function () {
        this.providers[provider] = name;
    });
    override(StoreItemUtils.prototype, "getFilterProviderDict", function (_originFunc: any, item: Record<string, string>) {
        item[provider] = name;
        _originFunc(item);
    });
    override(StoreItemUtils.prototype, "getProviderName", function (_originFunc: any, comingProvider: string) {
        if (provider === comingProvider) {
            return name;
        }
        return _originFunc(comingProvider);
    });
    if (getShowCase) {
        override(StoreItemUtils.prototype, "createItemShowCase", function (_originFunc: any, item: StoreItem, purchase_history?: PurchaseHistory) {
            if (item.provider() == provider) {
                return getShowCase(item, purchase_history);
            }
            return _originFunc(item, purchase_history);
        })
    }
    if (getUseData) {
        override(StoreItemUtils.prototype, "getUseData", function (_originFunc: any, item: PurchaseHistory) {
            if (item.provider() == provider) {
                return getUseData(item);
            }
            return _originFunc(item);
        })
    }
    if (afterPurchase) {
        override(StoreItemUtils.prototype, "afterPurchase", function (_originFunc: any, item: PurchaseHistory) {
            if (item.provider() == provider) {
                return afterPurchase(item);
            }
            return _originFunc(item);
        })
    }
    if (getUseButtonName) {
        override(StoreItemUtils.prototype, "getUseButtonName", function (_originFunc: any, item: PurchaseHistory, confirm: boolean, alwaysShow: boolean) {
            if (item.provider() == provider) {
                return getUseButtonName(item, confirm, alwaysShow);
            }
            return _originFunc(item, confirm, alwaysShow);
        })
    }
    console.log(`Provider:${provider}#${name} registered`);
}