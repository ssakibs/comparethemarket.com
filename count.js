const fs = require('fs');

class CountUniqueWords {
  constructor(filepath, buffer) {
    this.sourcePath = filepath;
    this.bufferSize = buffer || 4096;
    this.individualCount = {};
  }

  sanitizeString(chunk) {
    let str = chunk.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"'?]/g, '');
    str = str.replace(/\n/g, ' ').split(' ')
    return str;
  }

  countInString(chunk, wordCount) {
    this.sanitizeString(chunk).forEach((el) => {
      if (el.length) {
        wordCount[el] = wordCount[el] ? ++wordCount[el] : 1;
      }
    });
    return wordCount;
  }

  processFile() {
    return new Promise((resolve, reject) => {
      const path = this.sourcePath;
      const bufferSize = this.bufferSize;
      if (path.length === 0 || typeof path !== 'string') {
        reject('The file path must be a valid.');
      }

      const stream = fs.createReadStream(path, {
        encoding: 'utf8',
        bufferSize,
      });

      stream.on('data', (data) => {
        this.individualCount = this.countInString(data, this.individualCount);
      });

      stream.on('error', (error) => {
        reject(error);
      });

      stream.on('end', () => {
        resolve(this.individualCount);
      });
    });
  }
}

module.exports = CountUniqueWords;

