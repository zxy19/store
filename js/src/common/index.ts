import app from 'flarum/common/app';

app.initializers.add('xypp/store', () => {
  console.log('[xypp/store] Hello, forum and admin!');
});
