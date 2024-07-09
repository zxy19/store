import Modal from 'flarum/common/components/Modal';
import app from 'flarum/forum/app';
import Button from 'flarum/common/components/Button';
import Select from 'flarum/common/components/Select';
import setRouteWithForcedRefresh from 'flarum/common/utils/setRouteWithForcedRefresh';
import LinkButton from 'flarum/common/components/LinkButton';
import Switch from 'flarum/common/components/Switch';
export default class CreateItemModal extends Modal {
  loading = false;
  selectedProvider: string = "unknown";
  selectedData: string = "unknown"
  providers: Record<string, any> = {
    unknown: app.translator.trans("xypp-store.forum.create-modal.providers.unknown")
  };
  providerDatas: Record<string, any> = {
    unknown: app.translator.trans("xypp-store.forum.create-modal.providers.unknown_data")
  }
  className() {
    return 'Modal--small';
  }
  title() {
    if ((this.attrs as any)?.item_id) {
      return app.translator.trans("xypp-store.forum.create-modal.edit-title", [(this.attrs as any)?.item_id] as any)
    }
    return app.translator.trans('xypp-store.forum.create-modal.title');
  }
  onupdate(vnode: any): void {
    this.$("#xypp-store-create-selector-provider_data").val(this.selectedData);
    this.$("#xypp-store-create-selector-provider").val(this.selectedProvider);
  }
  oncreate(vnode: any): void {
    super.oncreate(vnode);
    if ((this.attrs as any).item_id) {
      const data = app.store.getById('store-item', (this.attrs as any).item_id);
      this.$('#xypp-store-create-ipt-name').val(data?.attribute("name") as string);
      this.$('#xypp-store-create-ipt-desc').val(data?.attribute("desc") as string);
      this.$('#xypp-store-create-ipt-price').val(data?.attribute("price") as string);
      this.$('#xypp-store-create-ipt-provider').val(data?.attribute("provider") as string);
      this.$('#xypp-store-create-ipt-provider_data').val(data?.attribute("provider_data") as string);
      this.$('#xypp-store-create-ipt-expire_time').val(data?.attribute("expire_time") as string);
      this.$('#xypp-store-create-ipt-rest_cnt').val(data?.attribute("rest_cnt") as string);
      this.$('#xypp-store-create-ipt-use_cnt').val(data?.attribute("use_cnt") as string);
    }
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
            <label for="xypp-store-create-ipt-use_cnt">{app.translator.trans('xypp-store.forum.create-modal.use_cnt')}</label>
            <input id="xypp-store-create-ipt-use_cnt" className="FormControl" step="any" />
          </div>
          <div className="Form-group">
            <label for="xypp-store-create-ipt-expire_time">{app.translator.trans('xypp-store.forum.create-modal.expire_time')}</label>
            <input id="xypp-store-create-ipt-expire_time" className="FormControl" step="any" />
            <p>
              {app.translator.trans('xypp-store.forum.create-modal.expire_time_tip')}
            </p>
          </div>
          <div className="Form-group">
            <label for="xypp-store-create-ipt-rest_cnt">{app.translator.trans('xypp-store.forum.create-modal.rest_cnt')}</label>
            <input id="xypp-store-create-ipt-rest_cnt" className="FormControl" step="any" />
            <p>
              {app.translator.trans('xypp-store.forum.create-modal.rest_cnt_tip')}
            </p>
          </div>
          <div className="Form-group">
            <label for="xypp-store-create-ipt-provider">{app.translator.trans('xypp-store.forum.create-modal.provider')}</label>
            <Select id="xypp-store-create-selector-provider" value={this.selectedProvider} options={this.providers} onchange={this.changeProvider.bind(this)}></Select>
          </div>
          <div className="Form-group">
            <label for="xypp-store-create-ipt-provider_data">{app.translator.trans('xypp-store.forum.create-modal.provider_data')}</label>
            <Select id="xypp-store-create-selector-provider_data" value={this.selectedData} options={this.providerDatas} onchange={this.changeProviderData.bind(this)}></Select>
          </div>
          <div className="Form-group">
            <Button class="Button Button--primary" type="submit" loading={this.loading}>
              {(this.attrs as any).item_id ? app.translator.trans('xypp-store.forum.create-modal.edit-button') :
                app.translator.trans('xypp-store.forum.create-modal.button')}
            </Button>
            {(this.attrs as any).item_id ? (
              <LinkButton loading={this.loading} disabled={this.loading} onclick={this.delete.bind(this)}>
                <i class="fas fa-trash"></i>{app.translator.trans('xypp-store.forum.create-modal.delete-button')}
              </LinkButton>) : ""
            }
          </div>
        </div>
      </div >
    );
  }
  async onsubmit(e: any) {
    e.preventDefault();
    if (this.selectedData === "unknown" || this.selectedProvider === "unknown" || this.selectedProvider.startsWith("to_select_")) {
      if ((this.attrs as any).item_id) {
        const data = app.store.getById('store-item', (this.attrs as any).item_id);
        this.selectedData = data?.attribute("provider_data") as string;
        this.selectedProvider = data?.attribute("provider") as string;
      } else {
        app.alerts.show({ type: 'error' }, app.translator.trans('xypp-store.forum.create-modal.provider_data_error'));
        return;
      }
    }
    this.loading = true;
    try {
      await app.request({
        url: app.forum.attribute('apiUrl') + '/xypp-store-item',
        method: 'POST',
        body: {
          attributes: {
            id: (this.attrs as any).item_id || undefined,
            name: this.$('#xypp-store-create-ipt-name').val(),
            desc: this.$('#xypp-store-create-ipt-desc').val(),
            price: this.$('#xypp-store-create-ipt-price').val(),
            provider: this.selectedProvider,
            provider_data: this.selectedData,
            rest_cnt: this.$('#xypp-store-create-ipt-rest_cnt').val(),
            expire_time: this.$('#xypp-store-create-ipt-expire_time').val(),
            use_cnt: this.$('#xypp-store-create-ipt-use_cnt').val(),

          },
        },
      });
      app.modal.close();
      setRouteWithForcedRefresh(app.route("storePage"));
    } catch (e: any) {
      app.alerts.show({ type: 'error' }, e.toString());
      this.loading = false;
    }
  }
  async delete() {
    this.loading = true;
    m.redraw();
    try {
      await app.request({
        method: 'GET',
        url: app.forum.attribute('apiUrl') + '/xypp-store-item/' + (this.attrs as any).item_id + "/delete",
      });
      app.modal.close();
      setRouteWithForcedRefresh(app.route("storePage"));
    } catch (e: any) {
      this.loading = false;
    }
  }
  async getProviderData(e: string) {
    if (e == "unknown") {
      this.providerDatas = {
        unknown: app.translator.trans("xypp-store.forum.create-modal.providers.unknown_data")
      };
    } else {
      this.selectedData = "to_select_" + e;
      (this.providerDatas as any)[this.selectedData] = app.translator.trans("xypp-store.forum.create-modal.providers.no_select_data");
    }
    m.redraw();
    this.loading = false;
  }
  changeProvider(e: string) {
    this.selectedProvider = e;
    if (e == "unknown" || e.startsWith("to_select_")) {
      return;
    }
    this.$('#xypp-store-create-ipt-provider').val(e);
    this.loading = true;
    this.providerDatas = {};
    this.getProviderData(e);
  }
  changeProviderData(e: string) {
    this.selectedData = e;
    if (e == "unknown" || e.startsWith("to_select_")) {
      return;
    }
    this.$('#xypp-store-create-ipt-provider_data').val(e);
    m.redraw();
  }
}
