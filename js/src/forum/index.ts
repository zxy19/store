import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import IndexPage from 'flarum/forum/components/IndexPage';
import LinkButton from 'flarum/common/components/LinkButton';
import StorePage from './components/StorePage';
import HistoryPage from './components/HistoryPage';
import StoreItemUtils from './utils/StoreItemUtils';
import Model from 'flarum/common/Model';
import User from 'flarum/common/models/User';
import CreateItemModal from "./components/CreateItemModal"
import { addFrontendProviders } from './utils/frontendApplier';
import UserPage from 'flarum/forum/components/UserPage';
import { PurchaseHelper } from './utils/PurchaseHelper';
import { UseHelper } from './utils/UseHelper';
app.initializers.add('xypp/store', () => {
  //@ts-ignore
  User.prototype.canCreateStoreItem = Model.attribute('canCreateStoreItem');
  app.routes['storePage'] = {
    path: '/store',
    component: StorePage,
  };
  app.routes['user.purchase_history'] = {
    path: '/u/:username/purchase_history',
    component: HistoryPage,
  };
  extend(IndexPage.prototype, 'navItems', function (items) {
    items.add(
      'store_page',
      LinkButton.component(
        {
          href: app.route('storePage'),
          icon: 'fas fa-store',
        },
        [
          app.translator.trans('xypp-store.forum.store')
        ]
      ),
      10
    );
  });
  extend(UserPage.prototype, 'navItems', function (items) {
    if (app.session.user) {
      items.add(
        'purchase_history',
        LinkButton.component(
          {
            href: app.route('user.purchase_history', { username: this.user?.username() }),
            icon: 'fas fa-receipt',
          },
          [
            app.translator.trans('xypp-store.forum.history.title')
          ]
        ),
        10
      );
    }
  });
});
export { addFrontendProviders, StoreItemUtils, CreateItemModal, UseHelper, PurchaseHelper };