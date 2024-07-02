import AdminApplication from 'flarum/admin/AdminApplication';
import ForumApplication from 'flarum/forum/ForumApplication';

export default class StoreItemUtils {
  app: ForumApplication | AdminApplication;
  static instance: StoreItemUtils;
  public static init(app: ForumApplication | AdminApplication) {
    StoreItemUtils.instance = new StoreItemUtils(app);
  }
  public static getInstance() {
    return StoreItemUtils.instance;
  }
  constructor(app: ForumApplication | AdminApplication) {
    this.app = app;
  }

  public createItemShowCase($item: any) {
    return <div class="showcase-error">{this.app.translator.trans('xypp-store.forum.provider.error.title')}</div>;
  }
}
