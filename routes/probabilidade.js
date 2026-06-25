var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  // #region agent log
  var payload = { sessionId: '64e654', location: 'routes/probabilidade.js:GET/', message: 'rendering probabilidade', data: { template: 'probabilidade/index' }, hypothesisId: 'C', timestamp: Date.now(), runId: 'pre-fix' };
  console.error('[DEBUG-64e654]', JSON.stringify(payload));
  fetch('http://127.0.0.1:7547/ingest/e57c4033-b143-45f8-8da6-1263b2ad858c', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '64e654' }, body: JSON.stringify(payload) }).catch(function () {});
  // #endregion
  res.render('probabilidade/index', { title: 'Probabilidade' });
});

module.exports = router;
