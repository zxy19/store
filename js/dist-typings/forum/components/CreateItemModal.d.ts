/// <reference types="mithril" />
/// <reference types="flarum/@types/translator-icu-rich" />
import Modal from 'flarum/common/components/Modal';
export default class CreateItemModal extends Modal {
    loading: boolean;
    selectedProvider: string;
    selectedData: string;
    selectedSpecialData: string;
    providers: Record<string, any>;
    providerDatas: Record<string, any>;
    specialDatas: Record<string, () => Promise<string>>;
    className(): string;
    title(): import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
    onupdate(vnode: any): void;
    oncreate(vnode: any): void;
    content(): JSX.Element;
    onsubmit(e: any): Promise<void>;
    delete(): Promise<void>;
    getProviderData(e: string): Promise<void>;
    changeProvider(e: string): void;
    changeProviderData(e: string): void;
    changeSpecialData(e: string): void;
}
