const express = require('express');
const router = express.Router();
const apiRouter = require('./api');
module.exports = router;


router.use('/api', apiRouter)
