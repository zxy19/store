import Page from 'flarum/common/components/Page';
import IndexPage from 'flarum/forum/components/IndexPage';
import listItems from 'flarum/common/helpers/listItems';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import app from 'flarum/forum/app';
import StoreItemComponent from '../components/StoreItemComponent';
import Button from 'flarum/common/components/Button';
import CreateItemModal from '../../forum/components/CreateItemModal';
import Select from 'flarum/common/components/Select';
import StoreItemUtils from '../utils/StoreItemUtils';

export default class StorePage extends Page {
  loading: boolean = false;
  record: any[] = [];
  filters: Record<string, string> = {};
  currentFilter: string = "all";
  oninit(vnode: any): void {
    super.oninit(vnode);
    StoreItemUtils.getInstance().getFilterProviderDict(this.filters);
  }
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
                <Select options={this.filters} value={this.currentFilter} onchange={this.changeFilter.bind(this)}></Select>
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
      </div >
    );
  }
  changeFilter(e: string) {
    this.currentFilter = e;
    this.reloadItem();
  }
  async reloadItem() {
    this.loading = true;
    m.redraw();
    let type: string | undefined = this.currentFilter;
    if (type == "all") type = undefined;
    this.record = await app.store.find('store-item', { type } as any) as any;
    this.loading = false;
    m.redraw();
  }

  create() {
    app.modal.show(CreateItemModal);
  }
}
