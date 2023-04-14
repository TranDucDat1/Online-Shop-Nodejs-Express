const express = require('express')
const router = express.Router()

const { Catalog } = require('../controllers');

router.post('/create-catalog', Catalog.createCatalog);

module.exports = router;