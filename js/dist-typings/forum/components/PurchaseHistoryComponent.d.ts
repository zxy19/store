/// <reference types="mithril" />
import Component from 'flarum/common/Component';
export default class PurchaseHistoryComponent extends Component {
    loading: boolean;
    isConfirm: boolean;
    view(vnode: any): JSX.Element;
    use(): Promise<void>;
    delete(): Promise<void>;
    resetConfirm(): void;
}
