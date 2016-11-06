var request = require('request');
var cheerio = require('cheerio');

function _check(str, callback) {
    request('http://tw.dictionary.search.yahoo.com/search?p=' + str, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(body);
            var result = $('.explain').text();
        }
        callback(error, result);
    });
}
// _check('check', function (error, message) {
//     // console.log(message);
// });
module.exports = _check;