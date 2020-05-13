const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.port || 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser("Coding rules!"));

app.get('/', (req, res) => {
    let {cookies} = req
    console.log("Cookies:", cookies);
    let cookieNames = Object.keys(cookies);
    console.log("names:", cookieNames);
    console.log("signed cookies:", req.signedCookies);
    let signedCookieNames = Object.keys(req.signedCookies);
    console.log(signedCookieNames);
    if (!signedCookieNames.includes("serverCookie")){
        res.cookie("serverCookie", "banana", {
            signed: true
        });
    }
    
    res.setHeader("Content-type", "text/html");
    if (cookieNames.length > 0) {
        return res.send(`On server have cookies for: ${cookieNames} and signed: ${signedCookieNames}`);
    }
    res.send("No cookies for you!");
    
})

app.get('/clearCookie', (req, res) => {
    console.log("In clearCookie got cookies:", req.cookies);
    console.log("got query string", req.query);
    const {name} = req.query
    console.log(name);
    res.clearCookie(name)
    res.send(`Cleared Cookie: ${name}`);
})

app.get('/cookies', (req, res) => {
    res.send(req.cookies);
})

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});