import Mithril from 'mithril';
import UserPage from 'flarum/forum/components/UserPage';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import app from 'flarum/forum/app';
import Button from 'flarum/common/components/Button';
import User from 'flarum/common/models/User';
import PurchaseHistory from '../../common/models/PurchaseHistory';
import PurchaseHistoryComponent from './PurchaseHistoryComponent';
import Select from 'flarum/common/components/Select';
import StoreItemUtils from '../utils/StoreItemUtils';
import Placeholder from 'flarum/common/components/Placeholder';
import { showIf } from '../utils/NodeUtil';
export default class HistoryPage extends UserPage {
    loading: boolean = false;
    record: PurchaseHistory[] | null = null;
    filters: Record<string, string> = {};
    currentFilter: string = "all";
    oninit(vnode: Mithril.Vnode<any, this>): void {
        super.oninit(vnode);
        this.loadUser(m.route.param('username'));
        StoreItemUtils.getInstance().getFilterProviderDict(this.filters);
    }
    show(user: User): void {
        super.show(user);
        this.loadData();
    }
    content(): JSX.Element {
        return (
            <div className="store-history-page-container">
                <div class="store-history-page-title">
                    <Select options={this.filters} value={this.currentFilter} onchange={this.changeFilter.bind(this)}></Select>
                    <span></span>
                </div>

                <div className="store-history-page">
                    {showIf(this.loading, <LoadingIndicator display="block" />,
                        showIf(!!(this.record?.length), this.record?.map((item, index) => {
                            return (
                                <PurchaseHistoryComponent
                                    item={item}
                                    onSubmit={this.updateItem.bind(this)}
                                    onDelete={this.itemHasDeleted.bind(this)}
                                />
                            );
                        }), <Placeholder text={app.translator.trans("xypp-store.forum.history.no_record")} />)
                    )}
                </div>
            </div>
        );
    }
    changeFilter(e: string) {
        this.currentFilter = e;
        this.record = null;
        this.loadData();
    }
    async loadData() {
        if (this.record != null) return;
        if (!this.user?.id()) return;
        if (this.loading) return;
        this.loading = true;
        m.redraw();
        let type = undefined;
        if (this.currentFilter != "all") {
            type = this.currentFilter;
        }
        this.record = await app.store.find("purchase-history", { id: this.user?.id(), type } as any) as any;
        this.loading = false;
        m.redraw();
    }
    itemHasDeleted(item: PurchaseHistory) {
        if (this.record)
            this.record = this.record?.filter(i => i.id() != item.id());
        m.redraw();
    }
    updateItem(item: PurchaseHistory) {
        if (!this.record) {
            this.record = [];
        }
        if (this.record.find(i => i.id() == item.id())) {
            this.record = this.record.map(i => i.id() == item.id() ? item : i);
        } else {
            this.record.push(item);
        }
        m.redraw();
    }
}