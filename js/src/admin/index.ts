import app from 'flarum/admin/app';

app.initializers.add('xypp/store', () => {
  console.log('[xypp/store] Hello, admin!');
});
