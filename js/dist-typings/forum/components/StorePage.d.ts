/// <reference types="mithril" />
import Page from 'flarum/common/components/Page';
import StoreItem from '../../common/models/StoreItem';
export default class StorePage extends Page {
    loading: boolean;
    record: any[];
    filters: Record<string, string>;
    currentFilter: string;
    oninit(vnode: any): void;
    oncreate(vnode: any): void;
    view(): JSX.Element;
    changeFilter(e: string): void;
    reloadItem(): Promise<void>;
    create(): void;
    updateItem(item: StoreItem): void;
    itemHasDeleted(item: StoreItem): void;
}
