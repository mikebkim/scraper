var request = require('request');
var cheerio = require('cheerio');

request('http://books.toscrape.com/catalogue/category/books/fantasy_19/index.html', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('article.product_pod').each(function(i, element) {
        var title = $(element).children('h3').find('a').attr('title');
        console.log(title);
        var price = $(element).find('.price_color').text();
        console.log(price);
        var rating = $(element).find('.star-rating').attr('class');
        console.log(rating);
    });
  }
});

