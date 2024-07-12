/// <reference types="mithril" />
import Component from 'flarum/common/Component';
export default class StoreItemComponent extends Component {
    loading: boolean;
    isConfirm: boolean;
    view(vnode: any): JSX.Element;
    buy(): Promise<void>;
    edit(): void;
    resetConfirm(): void;
}
