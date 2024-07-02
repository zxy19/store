import Component from 'flarum/common/Component';
import StoreItem from '../../common/models/StoreItem';
import StoreItemUtils from '../../common/utils/StoreItemUtils';
import Button from 'flarum/common/components/Button';
import app from 'flarum/forum/app';
import setRouteWithForcedRefresh from 'flarum/common/utils/setRouteWithForcedRefresh';

export default class StoreItemComponent extends Component {
  loading: boolean = false;
  view(vnode: any) {
    const item: StoreItem = (this.attrs as any).item;
    let tipKey = 'xypp-store.forum.purchase';
    if (item.unavailable()) {
      tipKey = 'xypp-store.forum.unavailable.' + item.unavailable();
    }
    return (
      <div class="store-item">
        <h3>{item.name()}</h3>
        {StoreItemUtils.getInstance().createItemShowCase(item)}
        <div class="store-item-description">{item.desc()}</div>
        <div class="store-item-price">
          <i class="fas fa-coins" />
          {item.price()}
        </div>
        <Button
          class={item.unavailable() ? 'store-item-button Button' : 'store-item-button Button Button--primary'}
          onclick={this.buy.bind(this)}
          loading={this.loading}
          disabled={this.loading || item.unavailable()}
        >
          <i class="fas fa-cart-plus" />
          <span>{app.translator.trans(tipKey)}</span>
        </Button>
      </div>
    );
  }
  async buy() {
    if (!confirm(app.translator.trans('xypp-store.forum.purchase-confirm') as string)) {
      return;
    }
    this.loading = true;
    m.redraw();
    try {
      await app.request({
        method: 'GET',
        url: app.forum.attribute('apiUrl') + '/store-item/' + (this.attrs as any).item.id() + '/purchase',
      });
      setRouteWithForcedRefresh('store_page');
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
      m.redraw();
    }
  }
}
