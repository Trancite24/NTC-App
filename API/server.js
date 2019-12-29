const express = require('express')
const app = express()
const port = 3000
const ha = require('./handler')
const bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(express.json());
app.post('/', (req, res) => {

    console.log(req.body)
    res.send(ha.insertIntoJourneyTable(req.body))


});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))