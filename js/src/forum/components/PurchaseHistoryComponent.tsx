import Component from 'flarum/common/Component';
import StoreItem from '../../common/models/StoreItem';
import StoreItemUtils from '../utils/StoreItemUtils';
import Button from 'flarum/common/components/Button';
import app from 'flarum/forum/app';
import setRouteWithForcedRefresh from 'flarum/common/utils/setRouteWithForcedRefresh';
import CreateItemModal from './CreateItemModal';
import PurchaseHistory from '../../common/models/PurchaseHistory';
import { showIf } from "../utils/nodeUtil"
import dayjs from 'dayjs';
import { expireTimeFormat } from '../utils/timeUtils';

export default class PurchaseHistoryComponent extends Component {
  loading: boolean = false;
  isConfirm: boolean = false;
  view(vnode: any) {
    const item: PurchaseHistory = (this.attrs as any).item;
    const storeItem = item.store_item() as StoreItem;
    return (
      <div className={"store-item" + (item.valid() ? "" : " invalid")}>
        <h3>{storeItem.name()}</h3>
        <div class="store-item-showcase">
          <div className='store-item-showcase-tip'>
            {app.translator.trans('xypp-store.forum.type.' + item.provider())}
          </div>
          {StoreItemUtils.getInstance().createItemShowCase(storeItem)}
        </div>
        <div class="store-item-description">{storeItem.desc()}</div>
        <div class="store-item-info">
          {showIf(!!item.can_use(), <span className=''>
            {showIf(item.rest_cnt()!==null,
              app.translator.trans('xypp-store.forum.history.rest_cnt', [item.rest_cnt()] as any),
              app.translator.trans('xypp-store.forum.history.infinit'))}
          </span>, <span></span>)}
          <span>
            {showIf(!!(item.expire_at()),
              app.translator.trans('xypp-store.forum.history.expire', [expireTimeFormat(item.expire_at() as string)] as any),
              app.translator.trans('xypp-store.forum.history.forever'))}
          </span>
        </div>
        <span className='text-separate store-item-bottom'>
          {showIf(!!(item.can_use()), [
            <span></span>,
            <Button
              className='store-item-button Button Button--primary'
              onclick={this.use.bind(this)}
              loading={this.loading}
              disabled={this.loading}>
              {app.translator.trans('xypp-store.forum.history.use')}
            </Button>
          ]
          )}
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
    this.loading = true;
    m.redraw();
    await StoreItemUtils.getInstance().use((this.attrs as any).item);
    this.loading = false;
    m.redraw();
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
    }
  }
}
