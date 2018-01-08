var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose') //we can leave the extension. 
var {ToDo} = require('./models/todo'); //models
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

//HTTP POST save a note
app.post('/todos', (req, res) => {
    console.log(req.body);
    var todo = new ToDo({
        text: req.body.text,
        completed: req.body.completed,
        completedAt: req.body.completedAt
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(500).send(e);
    });
});

//HTTP GET get all notes
app.get('/todos', (req, res) => {
    //ToDo.find().then(() => {}, () => {});
    ToDo.find().then((result) => {
        res.send({
            HttpStatusCode: 200,
            ToDos: result
        });
    }, (e) => {
        res.status(500).send(e);
    });
});

//HTTP GET todos/100 - get a single record
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    console.log(id);
    ToDo.findById(id).then((result) => {
        if(!result)
            return res.status(404).send();
        res.send(result);
    }, (e) => {
        res.status(500).send(e);
    });
});




app.listen(port, () => {
    console.log('express app started on port: ' + port);  
});