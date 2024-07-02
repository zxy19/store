import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import IndexPage from 'flarum/forum/components/IndexPage';
import LinkButton from 'flarum/common/components/LinkButton';
import StorePage from './components/StorePage';
import StoreItemUtils from '../common/utils/StoreItemUtils';
import Model from 'flarum/common/Model';
import User from 'flarum/common/models/User';
app.initializers.add('xypp/store', () => {
  //@ts-ignore
  User.prototype.canCreateStoreItem = Model.attribute('canCreateStoreItem');

  StoreItemUtils.init(app);
  app.routes['storePage'] = {
    path: '/store',
    component: StorePage,
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
          app.translator.trans('xypp-store.forum.store'),
        ]
      ),
      10
    );
  });
});
