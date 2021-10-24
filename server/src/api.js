const express = require('express');
const fs = require('fs');
const weblogService = require('./weblogService');

const router = express.Router();

router.post('/weblog', (req, res, next) => {
  const { log } = req.files;
  const { unique, order } = req.query;

  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }

  if (log.mimetype !== 'text/plain') {
    res.status(400).send("File must be plain text.");
  }

  fs.readFile(log.tempFilePath, 'utf-8', function (err, data) {
    if (err) {
      next(err);
    }

    try {
      const result = unique
      ? weblogService.totalUniquePageViews(data, order)
      : weblogService.totalPageViews(data, order);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });
});

module.exports = router;
