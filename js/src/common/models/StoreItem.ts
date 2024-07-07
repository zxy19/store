import Model from 'flarum/common/Model';

// For more details about frontend models
// checkout https://docs.flarum.org/extend/models.html#frontend-models

export default class StoreItem extends Model {
  itemData = Model.attribute('data');
  type = Model.attribute("type");
  createdAt = Model.attribute('createdAt', Model.transformDate);
  name = Model.attribute('name');
  desc = Model.attribute('desc');
  price = Model.attribute('price');
  provider = Model.attribute('provider');
  provider_data = Model.attribute('provider_data');
  unavailable = Model.attribute('unavailable');
  valid = Model.attribute('valid');
  rest_cnt = Model.attribute('rest_cnt');
  use_cnt = Model.attribute('use_cnt');
  expire_time = Model.attribute('expire_time');
  can_use = Model.attribute('can_use');
}
