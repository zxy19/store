import Mithril from 'mithril';
import UserPage from 'flarum/forum/components/UserPage';
import User from 'flarum/common/models/User';
import PurchaseHistory from '../../common/models/PurchaseHistory';
export default class HistoryPage extends UserPage {
    loading: boolean;
    record: PurchaseHistory[] | null;
    filters: Record<string, string>;
    currentFilter: string;
    oninit(vnode: Mithril.Vnode<any, this>): void;
    show(user: User): void;
    content(): JSX.Element;
    changeFilter(e: string): void;
    loadData(): Promise<void>;
}
