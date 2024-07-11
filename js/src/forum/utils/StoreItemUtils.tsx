import app from "flarum/forum/app";
import StoreItem from "../../common/models/StoreItem";
import PurchaseHistory from "../../common/models/PurchaseHistory";
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
  public createItemShowCase(item: StoreItem,purchase_history?:PurchaseHistory) {
    return <div class="showcase-error">{app.translator.trans('xypp-store.forum.provider.error.title')}</div>;
  }
  public async getUseData(item: PurchaseHistory): Promise<string> {
    return "";
  }
  public async use(item: PurchaseHistory) {
    const data = await this.getUseData(item);
    await this.useWithData(item, data);
  }
  public async useWithData(item: PurchaseHistory, data: string) {
    await app.request({
      method: "POST",
      url: app.forum.attribute("apiUrl") + `/purchase-history/${item.id()}/use`,
      body: { data }
    });
  }
  public getProviderName(provider: string): string {
    return app.translator.trans("xypp-store.forum.provider.error.title") as string;
  }
}