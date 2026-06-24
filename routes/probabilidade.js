var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  // #region agent log
  fetch('http://127.0.0.1:7547/ingest/e57c4033-b143-45f8-8da6-1263b2ad858c', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '64e654' },
    body: JSON.stringify({
      sessionId: '64e654',
      hypothesisId: 'E',
      location: 'routes/probabilidade.js:GET/',
      message: 'Render probabilidade requested',
      data: { path: req.path, url: req.url, originalUrl: req.originalUrl },
      timestamp: Date.now(),
      runId: 'pre-fix'
    })
  }).catch(() => {});
  // #endregion
  res.render('probabilidade/index', { title: 'Probabilidade' });
});

module.exports = router;
