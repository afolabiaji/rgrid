const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file');

const isAuth = require('../middleware/is-auth')


/* get last saved file */
router.post('/download', isAuth, fileController.downloadFile);

/* post new file*/
router.post('/upload', isAuth, fileController.uploadFile);

module.exports = router;
