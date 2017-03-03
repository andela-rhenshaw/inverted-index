/**
 *
 *
 * @class InvertedIndex
 */
class InvertedIndex {
/**
* Creates an instance of InvertedIndex.
* @memberOf InvertedIndex
*/
  constructor() {
    this.mainIndex = {};
    this.bookNames = [];
  }
/**
 * Gets a book and returns it as as a concatenated text
 * @param {Object} book - a book object with title and text property
 * @returns {String} text- returns boolean if conditions are not met
 * @memberOf InvertedIndex
 */
  getBookText(book) {
    const status = InvertedIndexUtility.validateInput([book]);
    if (status) {
      this.bookNames.push(book.title);
      return `${book.title} ${book.text}`;
    }
    return status;
  }

/**
 * Builds an index for a Book Objects
 * @param {Array} books - An Array of book objects
 * @returns {String} Build status as a feedback message
 * @memberOf InvertedIndex
 */
  buildIndex(books) {
    let nonUniqueWords = '';
    let words = '';
    books.forEach((book) => {
      nonUniqueWords = InvertedIndexUtility
      .generateToken(this.getBookText(book));
      words = InvertedIndexUtility.createUniqueWords(nonUniqueWords);
      words.forEach((word) => {
        this.addWordToMainIndex(word, book.title);
      });
    });
    return 'Index Built';
  }


/**
 * Takes a word and a book title and stores it in tne mainIndex
 * @param {String} word
 * @param {String} bookTitle
 * @returns {none} ...
 * @memberOf InvertedIndex
 */
  addWordToMainIndex(word, bookTitle) {
    if (this.mainIndex[word]) {
      this.mainIndex[word].push(bookTitle);
    } else {
      this.mainIndex[word] = [bookTitle];
    }
  }

/**
 *
 * Takes in word(s) and returns found results based on created index
 * @param {String} searchedWords - Word(s) used to initiate a search
 * @returns {Array} searchResult - An array of matched books
 * @memberOf InvertedIndex
*/
  searchIndex(searchedWords) {
    let searchResult = [];
    let output = '';
    const wordsToSearch = InvertedIndexUtility
    .createUniqueWords(InvertedIndexUtility
       .generateToken(searchedWords));
    wordsToSearch.forEach((searchedWord) => {
      const indexedWords = Object.keys(this.mainIndex);
      indexedWords.forEach((indexedWord) => {
        if (searchedWord === indexedWord) {
          output = this.mainIndex[indexedWord];
          searchResult = output;
          console.log(indexedWord + ' ' + searchResult);
        }
      });
    });
    return searchResult;
  }
}
