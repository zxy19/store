/// <reference types="mithril" />
/// <reference types="flarum/@types/translator-icu-rich" />
import Modal from 'flarum/common/components/Modal';
import PurchaseHistory from '../../common/models/PurchaseHistory';
import StoreItem from '../../common/models/StoreItem';
export default class QueryModal<T extends PurchaseHistory | StoreItem> extends Modal {
    selected: number;
    className(): string;
    title(): import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
    oninit(vnode: any): void;
    content(): "" | JSX.Element;
    prev(): void;
    next(): void;
    onsubmit(): void;
    onremove(): void;
}
