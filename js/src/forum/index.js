import app from 'flarum/forum/app';
import {extend} from 'flarum/common/extend';
import IndexPage from 'flarum/forum/components/IndexPage';
import LinkButton from 'flarum/common/components/LinkButton';
import StorePage from './page/StorePage';
app.initializers.add('xypp/store', () => {
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
            // this.user.moderatorNoteCount() > 0 ? <span className="Button-badge">{this.user.moderatorNoteCount()}</span> : '',
          ]
        ),
        10
      );
  });
});
