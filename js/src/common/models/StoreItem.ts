import Model from 'flarum/common/Model';

// For more details about frontend models
// checkout https://docs.flarum.org/extend/models.html#frontend-models

export default class StoreItem extends Model {
  itemData = Model.attribute('data');
  name = Model.attribute<string>('name');
  desc = Model.attribute<string>('desc');
  price = Model.attribute<number>('price');
  provider = Model.attribute<string>('provider');
  provider_data = Model.attribute<string>('provider_data');
  unavailable = Model.attribute<any>('unavailable');
  valid = Model.attribute('valid');
  rest_cnt = Model.attribute('rest_cnt');
  use_cnt = Model.attribute('use_cnt');
  expire_time = Model.attribute('expire_time');
  can_use = Model.attribute('can_use');
}
