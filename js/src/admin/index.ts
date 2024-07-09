import app from 'flarum/admin/app';

app.initializers.add('xypp/store', () => {
  app.extensionData.for('xypp-store')
    .registerPermission({
      icon: 'fas fa-eye',
      label: app.translator.trans('xypp-store.admin.permissions.view-history'),
      permission: 'user.viewHistory',
    }, 'moderate', 30)
    .registerPermission({
      icon: 'fas fa-trash',
      label: app.translator.trans('xypp-store.admin.permissions.remove-history'),
      permission: 'user.removePurchaseHistory',
    }, 'moderate', 30)
    .registerPermission({
      icon: 'fas fa-plus-circle',
      label: app.translator.trans('xypp-store.admin.permissions.add-item'),
      permission: 'user.addStoreItem',
    }, 'moderate', 30)
    .registerPermission({
      icon: 'fas fa-trash',
      label: app.translator.trans('xypp-store.admin.permissions.remove-item'),
      permission: 'user.removeStoreItem',
    }, 'moderate', 30)
});
