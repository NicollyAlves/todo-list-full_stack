const mongoose = require('mongoose');

const TodoItemSchema = new mongoose.Schema({
    text : {
        type: String,
        required: true
    },
    check: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('todo', TodoItemSchema);