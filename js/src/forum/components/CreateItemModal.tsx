import Modal from 'flarum/common/components/Modal';
import app from 'flarum/forum/app';
import Button from 'flarum/common/components/Button';
import Select from 'flarum/common/components/Select';
import setRouteWithForcedRefresh from 'flarum/common/utils/setRouteWithForcedRefresh';
export default class CreateItemModal extends Modal {
  loading = false;
  className() {
    return 'Modal--small';
  }

  title() {
    return app.translator.trans('xypp-store.forum.create-modal.title');
  }

  content() {
    const that = this;
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label for="xypp-store-create-ipt-name">{app.translator.trans('xypp-store.forum.create-modal.name')}</label>
            <input id="xypp-store-create-ipt-name" required className="FormControl" type="text" step="any" />
          </div>
          <div className="Form-group">
            <label for="xypp-store-create-ipt-desc">{app.translator.trans('xypp-store.forum.create-modal.desc')}</label>
            <textarea id="xypp-store-create-ipt-desc" required className="FormControl" step="any"></textarea>
          </div>
          <div className="Form-group">
            <label for="xypp-store-create-ipt-price">{app.translator.trans('xypp-store.forum.create-modal.price')}</label>
            <input id="xypp-store-create-ipt-price" required className="FormControl" type="number" step="any" />
          </div>
          <div className="Form-group">
            <label for="xypp-store-create-ipt-provider">{app.translator.trans('xypp-store.forum.create-modal.provider')}</label>
            <input id="xypp-store-create-ipt-provider" required className="FormControl" type="text" step="any" />
          </div>
          <div className="Form-group">
            <label for="xypp-store-create-ipt-provider_data">{app.translator.trans('xypp-store.forum.create-modal.provider_data')}</label>
            <input id="xypp-store-create-ipt-provider_data" required className="FormControl" type="text" step="any" />
          </div>
          <div className="Form-group">
            <Button class="Button Button--primary" type="submit" loading={this.loading}>
              {app.translator.trans('xypp-store.forum.create-modal.button')}
            </Button>
          </div>
        </div>
      </div>
    );
  }
  async onsubmit(e: any) {
    e.preventDefault();
    this.loading = true;
    try {
      await app.request({
        url: app.forum.attribute('apiUrl') + '/store-item',
        method: 'POST',
        body: {
          attributes: {
            name: this.$('#xypp-store-create-ipt-name').val(),
            desc: this.$('#xypp-store-create-ipt-desc').val(),
            price: this.$('#xypp-store-create-ipt-price').val(),
            provider: this.$('#xypp-store-create-ipt-provider').val(),
            provider_data: this.$('#xypp-store-create-ipt-provider_data').val(),
          },
        },
      });
      app.modal.close();
      setRouteWithForcedRefresh("store_page");
    } catch (e: any) {
      app.alerts.show({ type: 'error' }, e.toString());
      this.loading = false;
    }
  }
}
