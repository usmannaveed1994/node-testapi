var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ToDoSchema = new Schema({
    text:{
        type: String,
        required: true
    },
    completed:{
        type: Boolean,
        default: false
    },
    completedAt:{
        type: Number,
        default: 0
    }

});

var ToDo = mongoose.model('ToDo', ToDoSchema);

// var ToDo = mongoose.model('ToDo', {
//     text: String,
//     completed: Boolean, 
//     completedAt: Number
// });

module.exports = {
    ToDo
};