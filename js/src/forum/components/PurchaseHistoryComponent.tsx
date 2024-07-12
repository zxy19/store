import Component from 'flarum/common/Component';
import StoreItem from '../../common/models/StoreItem';
import StoreItemUtils from '../utils/StoreItemUtils';
import Button from 'flarum/common/components/Button';
import app from 'flarum/forum/app';
import setRouteWithForcedRefresh from 'flarum/common/utils/setRouteWithForcedRefresh';
import CreateItemModal from './CreateItemModal';
import PurchaseHistory from '../../common/models/PurchaseHistory';
import { showIf } from "../utils/NodeUtil"
import dayjs from 'dayjs';
import { expireTimeFormat } from '../utils/TimeUtils';
import Alert from 'flarum/common/components/Alert';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';

export default class PurchaseHistoryComponent extends Component {
  loading: boolean = false;
  isConfirm: boolean = false;
  view(vnode: any) {
    const item: PurchaseHistory = (this.attrs as any).item;
    const storeItem = item.store_item() as StoreItem;

    let button = "primary";
    let tipKey: string = 'xypp-store.forum.history.use';
    if (item.unavailable()) {
      tipKey = (item.unavailable() as string) || "";
      if (tipKey.split(".").length <= 2)
        tipKey = 'xypp-store.forum.unavailable.' + tipKey;
      button = "disabled";
    } else if (!item.can_use() && !(this.attrs as any).alwaysShowBtn) {
      tipKey = "xypp-store.forum.history.unable_to_use";
      button = "disabled";
    } else if (this.isConfirm) {
      tipKey = 'xypp-store.forum.history.confirm_use';
    }

    return (
      <div className={"store-item" + (item.valid() ? "" : " invalid")}>
        <h3>{storeItem.name()}</h3>
        <div class="store-item-showcase">
          <div className='store-item-showcase-tip'>
            {StoreItemUtils.getInstance().getProviderName(storeItem.provider() as string)}
          </div>
          {showIf(this.loading, <LoadingIndicator />, StoreItemUtils.getInstance().createItemShowCase(storeItem, item))}
        </div>
        <div class="store-item-description">{storeItem.desc()}</div>
        <div class="store-item-info">
          <span className='store-item-time'>
            <i className='fas fa-clock fas-space-right'></i>
            {showIf(!!(item.expire_at()),
              app.translator.trans('xypp-store.forum.history.expire', [expireTimeFormat(item.expire_at() as string)] as any),
              app.translator.trans('xypp-store.forum.history.forever'))}
          </span>
          {showIf(!!item.can_use(), <span><i className='fas fa-undo-alt fas-space-right'></i>
            {showIf(item.rest_cnt() !== null,
              app.translator.trans('xypp-store.forum.history.rest_cnt', [item.rest_cnt()] as any),
              app.translator.trans('xypp-store.forum.history.infinity_use'))}
          </span>, <span></span>)}
        </div>
        <span className='text-separate store-item-bottom'>
          <Button
            className={'store-item-button Button Button--' + button}
            onclick={button != "disabled" && this.use.bind(this)}
            loading={this.loading}
            disabled={button === "disabled" || this.loading}>
            {app.translator.trans(tipKey)}
          </Button>
        </span>
        {// 删除按钮（右上角）
          showIf(!((this.attrs as any).noDelete),
            <div class="delete-history" onclick={this.delete.bind(this)}>
              <i class="fas fa-times" aria-label={app.translator.trans('xypp-store.forum.history.delete_button')}></i>
            </div>
          )}
      </div>
    );
  }
  async use() {
    if (!this.isConfirm) {
      this.isConfirm = true;
      setTimeout(this.resetConfirm.bind(this), 6000);
      return;
    }
    if ((this.attrs as any).onUse) {
      (this.attrs as any).onUse();
      return;
    }
    this.loading = true;
    m.redraw();
    try {
      await StoreItemUtils.getInstance().use((this.attrs as any).item);
      this.loading = false;
      m.redraw();
      app.alerts.show(Alert, { type: "success" }, app.translator.trans('xypp-store.forum.use_result.success'));
      setRouteWithForcedRefresh(app.route('user.purchase_history', { username: (app.current.data as any).user.slug() }));
    } catch (e: any) {
      if (e.message)
        app.alerts.show(Alert, { type: "warn" }, e.message);
      this.loading = false;
      m.redraw();
      return;
    }
  }
  async delete() {
    if (confirm(app.translator.trans('xypp-store.forum.history.confirm_delete') as string)) {
      this.loading = true;
      try {
        await app.request({
          url: app.forum.attribute('apiUrl') + '/purchase-history/' + (this.attrs as any).item.id() + '/delete',
        });
      } catch (ignore) { };
      this.loading = false;
      m.redraw();
      setRouteWithForcedRefresh(app.route('user.purchase_history', { username: (app.current.data as any).user.slug() }));
    }
  }
  resetConfirm() {
    if (this.isConfirm) {
      this.isConfirm = false;
      m.redraw();
    }
  }
}
