import Component from 'flarum/common/Component';
import StoreItem from '../../common/models/StoreItem';
import StoreItemUtils from '../../common/utils/StoreItemUtils';
import Button from 'flarum/common/components/Button';
import app from 'flarum/forum/app';
import setRouteWithForcedRefresh from 'flarum/common/utils/setRouteWithForcedRefresh';
import CreateItemModal from '../components/CreateItemModal';

export default class StoreItemComponent extends Component {
  loading: boolean = false;
  isConfirm: boolean = false;
  view(vnode: any) {
    const item: StoreItem = (this.attrs as any).item;
    let tipKey = 'xypp-store.forum.purchase';
    if (item.unavailable()) {
      tipKey = 'xypp-store.forum.unavailable.' + item.unavailable();
    } else if (this.isConfirm) {
      tipKey = 'xypp-store.forum.purchase-confirm';
    }
    return (
      <div class="store-item">
        <h3>{item.name()}</h3>
        <div class="store-item-showcase">
          <div className='store-item-showcase-tip'>
            {app.translator.trans('xypp-store.forum.type.' + item.provider())}
          </div>
          {StoreItemUtils.getInstance().createItemShowCase(item)}
        </div>
        <div class="store-item-description">{item.desc()}</div>
        <span className='text-separate store-item-bottom'>
          <span className='store-item-price'>
            <i class="fas fa-coins" />
            {item.price()}
          </span>
          <Button
            className={item.unavailable() ? 'store-item-button Button' : 'store-item-button Button Button--primary'}
            onclick={this.buy.bind(this)}
            loading={this.loading}
            disabled={this.loading || item.unavailable()}
          >
            <i class="fas fa-cart-plus" />
            <span>{app.translator.trans(tipKey)}</span>
          </Button>
        </span>
        {
          (this.attrs as any).noEdit ? (
            ''
          ) : (
            <div class="edit-store-item" onclick={this.edit.bind(this)}>
              <i class="fas fa-edit" aria-label={app.translator.trans('xypp-store.forum.edit_button')}></i>
            </div>
          )}
      </div>
    );
  }
  async buy() {
    if (!this.isConfirm) {
      this.isConfirm = true;
      setTimeout(this.resetConfirm.bind(this), 6000);
      return;
    }
    this.loading = true;
    m.redraw();
    try {
      await app.request({
        method: 'GET',
        url: app.forum.attribute('apiUrl') + '/store-item/' + (this.attrs as any).item.id() + '/purchase',
      });
      setRouteWithForcedRefresh(app.route("storePage"));
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
      this.isConfirm = false;
      m.redraw();
    }
  }
  edit() {
    app.modal.show(CreateItemModal, { item_id: (this.attrs as any).item.id() });
    m.redraw();
  }
  resetConfirm(){
    if(this.isConfirm){
      this.isConfirm = false;
      m.redraw();
    }
  }
}
