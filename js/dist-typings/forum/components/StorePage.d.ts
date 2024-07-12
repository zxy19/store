/// <reference types="mithril" />
import Page from 'flarum/common/components/Page';
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
}
