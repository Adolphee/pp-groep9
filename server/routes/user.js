const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/register', (req, res) => {
    let { username, pwd } = req.body;
    console.log(username, pwd);
    if (username == 'jarno' && pwd == '1234') {
        req.session.sid = username;
        res.send('logged in');
        console.log(req.session);
        
    } else {
        res.send('not logged in');
    }

    
});

module.exports = router;