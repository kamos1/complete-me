import Node from '../scripts/Node'
require('locus')

export default class Trie {
  constructor() {
    this.root = new Node();
    this.wordCount = 0;
  }

  insert(data) {
    var currentNode = this.root;
    var lettersArray = data.split('');

    lettersArray.forEach((letter) => {
      if (currentNode.next[letter]) {
        return currentNode = currentNode.next[letter]
      }

      currentNode.next[letter] = new Node(letter)
      currentNode = currentNode.next[letter];
    })
    currentNode.isWord = true
    this.wordCount++;
  }

  find(data) {
    var currentNode = this.root;
    var lettersArray = data.split('');

    lettersArray.forEach((letter) => {
      if (currentNode.next[letter]) {
        currentNode = currentNode.next[letter]
      }
    })
    return currentNode;
  }

  suggest(data, node) {
    var foundNode = node || this.find(data)
    var suggestions = [];
    var words = data
    var keys = Object.keys(foundNode.next)

    if (foundNode.isWord) {
      suggestions.push(words)
    }

    if (!foundNode.next) {
      return
    } else {
      keys.forEach(key => {
        words = data + foundNode.next[key].data
        var garbage = this.suggest(words, foundNode.next[key]);

        suggestions = suggestions.concat(garbage)
      })
    }

    return suggestions;
  }

  count() {
    return this.wordCount;
  }

  populate() {
    //check the root node
    //split the words
    //populate the trie
  }
  // select()

}
