import Model from 'flarum/common/Model';
export default class StoreItem extends Model {
    itemData: () => unknown;
    name: () => string;
    desc: () => string;
    price: () => number;
    provider: () => string;
    provider_data: () => string;
    unavailable: () => any;
    valid: () => unknown;
    rest_cnt: () => unknown;
    use_cnt: () => unknown;
    expire_time: () => unknown;
    can_use: () => unknown;
}
