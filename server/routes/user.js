const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/register', (req, res) => {
    let { username, password } = req.body;
    console.log(username, password);
    
    res.json(
        {
            "msg-type": "success",
            "msg": "successfully registered"
        }
    );
});

module.exports = router;