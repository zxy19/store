import Modal from 'flarum/common/components/Modal';
import app from 'flarum/forum/app';
import Button from 'flarum/common/components/Button';
import Select from 'flarum/common/components/Select';
import setRouteWithForcedRefresh from 'flarum/common/utils/setRouteWithForcedRefresh';
import LinkButton from 'flarum/common/components/LinkButton';
import Switch from 'flarum/common/components/Switch';
import PurchaseHistory from '../../common/models/PurchaseHistory';
import StoreItem from '../../common/models/StoreItem';
import { showIf } from '../utils/NodeUtil';
import StoreItemComponent from '../components/StoreItemComponent';
import PurchaseHistoryComponent from '../components/PurchaseHistoryComponent';
export default class QueryModal<T extends PurchaseHistory | StoreItem> extends Modal {
    selected = 0;
    className() {
        return 'Modal--small';
    }
    title() {
        const attrs: {
            items?: T[],
        } = (this.attrs as any);
        if (!attrs.items?.length) return "";

        if (attrs.items[0] instanceof StoreItem)
            return app.translator.trans('xypp-store.forum.query-modal.purchase.title');
        return app.translator.trans('xypp-store.forum.query-modal.use.title');
    }
    oninit(vnode: any) {
        super.oninit(vnode);
        this.selected = 0;
    }
    content() {
        const attrs: {
            items?: T[],
            on_submit?: (selected: T) => void,
            on_close?: () => void
        } = (this.attrs as any);
        if (!attrs.items?.length) { return ""; }
        return (
            <div className="Modal-body">
                <div className='query-body'>
                    {
                        showIf(!!attrs.items, attrs.items && showIf(!!(attrs.items[this.selected] instanceof StoreItem),
                            <StoreItemComponent noEdit={true} onBuy={this.onsubmit.bind(this)} item={attrs.items[this.selected]} />,
                            <PurchaseHistoryComponent alwaysShowBtn={true} noDelete={true} onUse={this.onsubmit.bind(this)} item={attrs.items[this.selected]} />
                        ))
                    }
                </div>
                <div className='query-control'>
                    <Button class="query-control-prev Button Button--primary" onclick={this.prev.bind(this)}>
                        <i class="fas fa-chevron-left"></i>
                    </Button>
                    <span>{this.selected + 1}/{attrs.items?.length}</span>
                    <Button class="query-control-after Button Button--primary" onclick={this.next.bind(this)}>
                        <i class="fas fa-chevron-right"></i>
                    </Button>
                </div>
            </div >
        );
    }
    prev() {
        if (this.selected > 0) {
            this.selected--;
            m.redraw();
        }
    }
    next() {
        const attrs: {
            items?: T[],
            on_submit?: (selected: T) => void,
            on_close?: () => void
        } = (this.attrs as any);
        if (attrs.items && this.selected < attrs.items.length - 1) {
            this.selected++;
            m.redraw();
        }
    }
    onsubmit() {
        const attrs: {
            items?: T[],
            on_submit?: (selected: T) => void,
            on_close?: () => void
        } = (this.attrs as any);
        if (attrs.on_submit && attrs.items)
            attrs.on_submit(attrs.items[this.selected]);
        app.modal.close();
    }
    onremove(): void {
        const attrs: {
            items?: T[],
            on_submit?: (selected: T) => void,
            on_close?: () => void
        } = (this.attrs as any);
        if (attrs.on_close)
            attrs.on_close();
    }
}
