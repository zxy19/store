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
                </div>

                <div className="store-history-page">
                    {this.loading ? (
                        <LoadingIndicator display="block" />
                    ) : (
                        this.record?.map((item, index) => {
                            return (
                                <PurchaseHistoryComponent item={item} />
                            );
                        })
                    )}
                </div>
            </div>
        );
    }
    changeFilter(e: string) {
        this.currentFilter = e;
        this.loadData();
    }
    async loadData() {
        if (this.record != null) return;
        if (!this.user?.id()) return;
        if (this.loading) return;
        this.loading = true;
        m.redraw();
        this.record = await app.store.find("purchase-history", { id: this.user?.id() } as any) as any;
        this.loading = false;
        m.redraw();
    }
}