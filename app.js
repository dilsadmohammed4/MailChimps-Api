const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");


});
app.post('/', (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us1.api.mailchimp.com/3.0/lists/8cd55bf6bb"

    const Option = {
        method: "POST",
        auth: "tonystack422:fea6601e1ce82f4686df0187159a69ca-us1"
    }
    const request = https.request(url, Option, (response) => {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + '/failure.html');
        }

        response.on("data", (data) => {
            console.log(JSON.parse(data));
        })
    });
    request.write(jsonData);
    request.end();



});

app.post('/fail',(req,res)=>{
    res.redirect('/');
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running in port 3000..");
})
