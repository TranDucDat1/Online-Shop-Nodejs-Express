const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.send('get catalog');
});

module.exports = router;