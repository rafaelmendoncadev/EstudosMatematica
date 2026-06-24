const fs = require('fs');
const path = require('path');
const app = require('../app');

// #region agent log
const appRoot = path.dirname(require.resolve('../app'));
const diag = {
  hypothesisId: 'A-C',
  cwd: process.cwd(),
  apiDir: __dirname,
  appRoot,
  viewsPath: path.join(appRoot, 'views'),
  viewsExists: fs.existsSync(path.join(appRoot, 'views')),
  probPugExists: fs.existsSync(path.join(appRoot, 'views', 'probabilidade', 'index.pug')),
  publicExists: fs.existsSync(path.join(appRoot, 'public')),
  nodeVersion: process.version,
  vercel: process.env.VERCEL === '1'
};
console.error('[DEBUG-64e654] startup', JSON.stringify(diag));
fetch('http://127.0.0.1:7547/ingest/e57c4033-b143-45f8-8da6-1263b2ad858c', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '64e654' },
  body: JSON.stringify({
    sessionId: '64e654',
    hypothesisId: 'A-C',
    location: 'api/index.js:startup',
    message: 'Vercel startup diagnostics',
    data: diag,
    timestamp: Date.now(),
    runId: 'pre-fix'
  })
}).catch(() => {});
// #endregion

module.exports = app;
