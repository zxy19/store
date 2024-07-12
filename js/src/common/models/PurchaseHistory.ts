import Model from 'flarum/common/Model';

// For more details about frontend models
// checkout https://docs.flarum.org/extend/models.html#frontend-models

export default class PurchaseHistory extends Model {
  expire_at = Model.attribute('expire_at');
  user_id = Model.attribute('user_id');
  item_id = Model.attribute('item_id');
  valid = Model.attribute('valid');
  itemData = Model.attribute('itemData');
  store_item = Model.hasOne('store_item');
  provider = Model.attribute('provider');
  can_use = Model.attribute('can_use');
  rest_cnt = Model.attribute('rest_cnt');
  unavailable = Model.attribute('unavailable');
}