var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Book = new Schema({
    title: String,
    price: String,
    rating: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', Book);