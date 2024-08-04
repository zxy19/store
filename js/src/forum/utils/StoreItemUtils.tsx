import app from "flarum/forum/app";
import StoreItem from "../../common/models/StoreItem";
import PurchaseHistory from "../../common/models/PurchaseHistory";
import Placeholder from "flarum/common/components/Placeholder";
export default class StoreItemUtils {
  static instance: StoreItemUtils;
  public static getInstance() {
    if (!StoreItemUtils.instance) {
      StoreItemUtils.instance = new StoreItemUtils();
    }
    return StoreItemUtils.instance;
  }
  public getFilterProviderDict(dict: Record<string, string>) {
    dict['all'] = app.translator.trans("xypp-store.forum.provider.all") as string;
  }
  public createItemShowCase(item: StoreItem, purchase_history?: PurchaseHistory) {
    return <Placeholder text={app.translator.trans('xypp-store.forum.provider.error.no-preview')} />;
  }
  public getUseButtonName(item: PurchaseHistory, confirm: boolean, alwaysShow: boolean): { text: string, disable: boolean } {
    if (item.unavailable()) {
      const tipKey = (item.unavailable() as string) || "";
      if (tipKey.split(".").length <= 2)
        return { text: app.translator.trans('xypp-store.forum.unavailable.' + tipKey) as string, disable: true };
      return { text: app.translator.trans(tipKey) as string, disable: true };
    } else if (!item.can_use() && !alwaysShow) {
      return { text: app.translator.trans("xypp-store.forum.history.unable_to_use") as string, disable: true };
    }
    if (confirm) {
      return { text: app.translator.trans("xypp-store.forum.history.confirm_use") as string, disable: false };
    }
    return { text: app.translator.trans("xypp-store.forum.history.use") as string, disable: false };
  }
  public async getUseData(item: PurchaseHistory): Promise<string> {
    return "";
  }
  public async use(item: PurchaseHistory) {
    const data = await this.getUseData(item);
    await this.useWithData(item, data);
  }
  public async useWithData(item: PurchaseHistory, data: string) {
    const result: any = await app.request({
      method: "POST",
      url: app.forum.attribute("apiUrl") + `/purchase-history/${item.id()}/use`,
      body: { data }
    });
    if (result.msg) {
      app.alerts.show({ type: 'info' }, result.msg);
    }
  }
  public getProviderName(provider: string): string {
    return app.translator.trans("xypp-store.forum.provider.error.title") as string;
  }
  public async afterPurchase(item: PurchaseHistory) {
    //To be override
  }
}