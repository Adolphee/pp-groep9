const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/submitForm', (req, res) => {
    console.log('form gekregen');
    let { naam, email, msg } = req.body;
    console.log(req.body);
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'campify09@gmail.com',
            pass: 'Groep@09'
        }
    });
    const mailOptions = {
        from: 'jarnobog@gmail.com', // sender address
        to: 'campify09@gmail.com', // list of receivers
        subject: 'Klacht of Vraag | Campify', // Subject line
        html: `
            <h2>Klacht Of Vraag</h2>
            <p><b>Naam klant: </b>${naam}</p>
            <p><b>Email klant: </b>${email}</p>
            <p><b>Bericht klant: </b>${msg}</p>
        `
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if(err) {
            console.log(err)
            res.send({
                msg: 'Je klacht of vraag is niet verzonden probeer opnieuw.'
            })
        }
        else {
            console.log(info);
            res.send({
                msg: 'Je klacht of vraag is succesvol verzonden.'
            })
        }
    });

});

module.exports = router;