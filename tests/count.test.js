const chai = require('chai');

const chaiAsPromised = require('chai-as-promised');

const expect = chai.expect;

const CountWords = require('../count');

chai.use(chaiAsPromised);

describe('Constructor', () => {
  it('should be created with three properties: sourcePath, bufferSize, and individualCount', () => {
    const countWords = new CountWords();
    expect(countWords).to.have.property('sourcePath');
    expect(countWords).to.have.property('bufferSize');
    expect(countWords).to.have.property('individualCount');
  });

  it('should have args set when supplied', () => {
    const countWords = new CountWords('./tests/mock_text_no.txt', 4000);
    expect(countWords.sourcePath).to.equal('./tests/mock_text_no.txt');
    expect(countWords.bufferSize).to.equal(4000);
    expect(countWords.individualCount).to.deep.equal({});
  });
});

describe('sanitizeString', () => {
  it('should return an array', () => {
    const countWords = new CountWords();
    expect(countWords.sanitizeString('')).to.deep.equal(['']);
  });
  it('should satinze punctuation and return an array', () => {
    const countWords = new CountWords();
    expect(countWords.sanitizeString('hello!? there')).to.deep.equal(['hello', 'there']);
    expect(countWords.sanitizeString('hello!? there .,\/#!$sakib%\^&\*;:{}=\-_`~()"')).to.deep.equal(['hello', 'there', 'sakib']);
  });
  it('should satinze and be in lowercase and return an array', () => {
    const countWords = new CountWords();
    expect(countWords.sanitizeString('helLo!? there I AM TESting'))
            .to.deep.equal(['hello', 'there', 'i', 'am', 'testing']);
  });
  it('should care about linebreaks and return an array', () => {
    const countWords = new CountWords();
    expect(countWords.sanitizeString('helLo!? \nthere I AM \nTESting'))
            .to.deep.equal(['hello', '', 'there', 'i', 'am', '', 'testing']);
  });
});

describe('countInString', () => {
  it('should return as is wordcount object when string is empty', () => {
    const countWords = new CountWords();
    expect(countWords.countInString('', {})).to.deep.equal({});
    expect(countWords.countInString('', { the: 1 })).to.deep.equal({ the: 1 });
  });
  it('should add to wordcount object when there is a match', () => {
    const countWords = new CountWords();
    expect(countWords.countInString('the', { the: 1 })).to.deep.equal({ the: 2 });
  });
  it('should add the word if not present and increment wordcount object when there is a match', () => {
    const countWords = new CountWords();
    expect(countWords.countInString('it\'s a sunny day', { its: 1, day: 5 }))
          .to.deep.equal({ its: 2, a: 1, sunny: 1, day: 6 });
  });
});

describe('processFile', () => {
  it('Invalid File path', () => {
    const countWords = new CountWords('./tests/mock_text_no.txt', 4000);
    return expect(countWords.processFile()).to.eventually
          .be.rejectedWith('Error: ENOENT: no such file or directory, open \'./tests/mock_text_no.txt\'');
  });
  it('Invalid File names', () => {
    const countWords = new CountWords('', 4000);
    return expect(countWords.processFile()).to.eventually
          .be.rejectedWith('The file path must be a valid.');
  });
  it('File name should be an string', () => {
    const countWords = new CountWords(121212, 4000);
    return expect(countWords.processFile()).to.eventually
          .be.rejectedWith('The file path must be a valid.');
  });

  it('Correct file path should return values', () => {
    const expectedOutput = { good: 1,
      morning: 1,
      its: 1,
      a: 1,
      sunny: 1,
      day: 1,
      how: 1,
      are: 1,
      you: 2,
      doing: 1,
      thats: 1,
      nice: 1,
      to: 1,
      hear: 1,
      i: 1,
      am: 1,
      writing: 1,
      test: 1,
      cases: 1,
      bye: 1,
      see: 1,
      soon: 1 };
    const countWords = new CountWords('./tests/mock_text.txt', 4000);

    return expect(countWords.processFile()).to.eventually.deep.equal(expectedOutput);
  });
});

