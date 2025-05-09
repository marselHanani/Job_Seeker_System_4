
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/home",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/home"
  },
  {
    "renderMode": 2,
    "route": "/register"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "route": "/notfound"
  },
  {
    "renderMode": 2,
    "redirectTo": "/notfound",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 6349, hash: '69efd90337ace2228d3a4cd7b0963e4914e14c9b9da6358253e71400eeec008f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1478, hash: '099a23350868c40918403ab261eda24f3b1353f407aa55402b99860f79495024', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'register/index.html': {size: 35723, hash: '06dbfbdd3d0f57892933240e1f8826534df70a68c6d424b9f3dbb46c3bc3105b', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 26826, hash: '4b9618e45a21c6dd6ab9ced185acc77cb7ae4ceb0593e53e1efbd04b1585d0cf', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 34935, hash: 'cac40795355e63cd24e36528b2c8dd5cc37c37a6a1271df827cc0aef9a4bad75', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'notfound/index.html': {size: 32096, hash: '938007069ae34ddef7677ff29dc6dffa9f3b1f270fa62684ff28a0b6daef1230', text: () => import('./assets-chunks/notfound_index_html.mjs').then(m => m.default)},
    'styles-KJQTTSLW.css': {size: 305530, hash: '3wfvNanecSU', text: () => import('./assets-chunks/styles-KJQTTSLW_css.mjs').then(m => m.default)}
  },
};
