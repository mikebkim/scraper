var mongoose = require('mongoose');
var data = require('./scrape');
var Book = require('./models/book');
mongoose.connect('mongodb://localhost/scraper');
var db = mongoose.connection;

db.once('open', () => {
    console.log(`DB Connected for Seeding`);
});

db.on('error', (err) => {
    console.log(`DB Error: \n${err}`);
});

db.on('open', () => {
    db.db.dropDatabase();
    console.log('DB DROPPED');
    booksPromises = [];

    data.forEach(function(book) {
        booksPromises.push(asyncSave(book));
    });

    console.log('promises', booksPromises);

    Promise.all(booksPromises).then(function() {
        db.close(function() {
            console.log('Mongoose Connection Closed');
        });
    });
});

function asyncSave(book) {
    return new Promise(function(resolve, reject) {
        new Book(book).save(function(err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}