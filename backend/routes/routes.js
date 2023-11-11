const express = require('express');
const router = express.Router();

router.get('/countiesData', (req, res) => {
    try {
        const counties = require('../data/counties.json');
        res.json({success: true, counties});
    }catch(error) {
       console.error(error);
       res.json({success: false, error: error.message});
    }
});

module.exports = router;