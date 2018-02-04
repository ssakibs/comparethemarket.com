const CountWords = require('./count');
const util = require('./utils');

const countWords = new CountWords('test_text.txt', 4000);
countWords.processFile().then((result) => {
  util.processResult(result);
}).catch((err) => {
  console.log(err);
});
