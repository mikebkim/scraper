var request = require('request');
var cheerio = require('cheerio');
var dataArr = [];

request('http://books.toscrape.com/catalogue/category/books/fantasy_19/index.html', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('article.product_pod').each(function(i, element) {
        var obj = {};
        var title = $(element).children('h3').find('a').attr('title');
        console.log(title);
        var price = $(element).find('.price_color').text();
        price = exchange(price);
        console.log(price);
        var rating = $(element).find('.star-rating').attr('class').substr(12, 5);
        console.log(rating);
        obj.title = title;
        obj.price = price;
        obj.rating = rating;
        dataArr.push(obj);
    });
  }
});

function exchange(str) {
    var num = parseFloat(str.substr(1, 5));
    num = (num * 1.17);
    var newStr = ('$' + num).substr(0, 6);

    return newStr;
}

module.exports = dataArr;