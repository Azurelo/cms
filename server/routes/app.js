const express = require('express');
const router = express.Router();
const path = require('path');

// Serve index.html for root route
router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../dist/cms/browser/index.html'));
});

module.exports = router;
