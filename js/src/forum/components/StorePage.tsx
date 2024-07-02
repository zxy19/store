import Page from 'flarum/common/components/Page';
import IndexPage from 'flarum/forum/components/IndexPage';
import listItems from 'flarum/common/helpers/listItems';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import app from 'flarum/forum/app';
import StoreItemComponent from '../components/StoreItemComponent';
import Button from 'flarum/common/components/Button';
import CreateItemModal from '../../forum/components/CreateItemModal';

export default class StorePage extends Page {
  loading: boolean = false;
  record: any[] = [];
  oncreate(vnode: any): void {
    super.oncreate(vnode);
    this.reloadItem();
  }
  view() {
    return (
      <div>
        {IndexPage.prototype.hero()}
        <div className="container">
          <div className="sideNavContainer">
            <nav className="IndexPage-nav sideNav">
              <ul>{listItems(IndexPage.prototype.sidebarItems().toArray())}</ul>
            </nav>
            <div class="StoreListPage">
              <div class="store-list-title">
                <h1>{app.translator.trans('xypp-store.forum.store')}</h1>
                {!(app.session.user as any).canCreateStoreItem() ? (
                  ''
                ) : (
                  <Button class="Button Button--primary" onclick={this.create.bind(this)}>
                    <i class="fas fa-plus" />
                    <span>{app.translator.trans('xypp-store.forum.create')}</span>
                  </Button>
                )}
              </div>
              <div class="StoreListContainer">
                {this.loading ? (
                  <LoadingIndicator></LoadingIndicator>
                ) : (
                  this.record.map((item) => {
                    return <StoreItemComponent item={item}></StoreItemComponent>;
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  async reloadItem() {
    this.loading = true;
    m.redraw();
    await app.store.find('store-item');
    this.record = app.store.all('store-items');
    this.loading = false;
    m.redraw();
  }

  create() {
    app.modal.show(CreateItemModal);
  }
}
