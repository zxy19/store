import Model from 'flarum/common/Model';
export default class StoreItem extends Model {
    itemData: () => unknown;
    name: () => unknown;
    desc: () => unknown;
    price: () => unknown;
    provider: () => unknown;
    provider_data: () => unknown;
    unavailable: () => unknown;
    valid: () => unknown;
    rest_cnt: () => unknown;
    use_cnt: () => unknown;
    expire_time: () => unknown;
    can_use: () => unknown;
}
