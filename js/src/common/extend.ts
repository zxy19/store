import Extend from 'flarum/common/extenders';
import UserDecorations from "./models/StoreItem"
import User from 'flarum/common/models/User';
import StoreItem from './models/StoreItem';
import PurchaseHistory from './models/PurchaseHistory';
export default [
  new Extend.Store()
    .add('store-item', StoreItem)
    .add('purchase-history', PurchaseHistory)
];