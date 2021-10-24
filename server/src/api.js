const express = require('express');
const fs = require('fs');
const { UserInputError } = require('./errors');
const weblogService = require('./weblogService');

const router = express.Router();

router.post('/weblog', (req, res, next) => {
  try {
    if (!req.files) {
      throw new UserInputError("No files were uploaded.");
    }

    const { log } = req.files;
    const { unique, order } = req.query;
    

    fs.readFile(log.tempFilePath, 'utf-8', function (err, data) {
      if (err) {
        throw err;
      }

      const result = unique
      ? weblogService.totalUniquePageViews(data, order)
      : weblogService.totalPageViews(data, order);
      res.status(200).json(result);
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
