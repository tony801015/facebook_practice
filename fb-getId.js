var request = require('request');
var cheerio = require('cheerio');

var options = {
    url: 'https://www.facebook.com/XXXXXXXXXX', //your name or facebook id
    headers: {
        'User-Agent': 'MY Mac Air'
    }
};

function callback(error, response, body) {

    var $ = cheerio.load(body);
    var number = body.indexOf("profile") + 8;
    var result = body.substr(number, 15);
    console.log(result);

}


if (options.url.indexOf('profile.php?id=') != -1) {
    var result = options.url.substr(options.url.indexOf('profile.php?id=') + 15, 15);
    console.log(result);
} else {
    request(options, callback);
}