import Model from 'flarum/common/Model';
export default class PurchaseHistory extends Model {
    expire_at: () => unknown;
    user_id: () => unknown;
    item_id: () => unknown;
    valid: () => unknown;
    itemData: () => unknown;
    store_item: () => false | Model;
    provider: () => unknown;
    can_use: () => unknown;
    rest_cnt: () => unknown;
    unavailable: () => unknown;
}
