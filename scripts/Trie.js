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

    if (!currentNode.isWord) {
      currentNode.isWord = true
      this.wordCount++;
    } else {
      currentNode.isWord = true;
    }
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


  suggest(data, suggestions) {
    var foundNode = this.find(data)
    var suggestionsObj = suggestions || [];
    var keys = Object.keys(foundNode.next)

    //if the property isWord for the foundNodef is true
    //push an object of word: data and timesSelected: foundNode.timesSelected
    //in suggestionsObj array
    if (foundNode.isWord) {
      suggestionsObj.push({word: data, timesSelected: foundNode.timesSelected})
    }


    //iterate over each key
    //recursively call suggest and
    //each time concatenate data and the key of the current object
    keys.forEach((key) => {
      this.suggest(data + key, suggestionsObj);
    })

    //sort the suggestionsObj array by the timesSelected property
    suggestionsObj.sort((a, b) => {
      return b.timesSelected - a.timesSelected
    })

    //map the data value for each word key into suggestionsArray
    var suggestionsArray = suggestionsObj.map((obj) => {
      return obj['word']
    })

    return suggestionsArray;
  }

  count() {
    return this.wordCount;
  }

  populate(data) {
    data.forEach((word) => {
      this.insert(word)
    })
  }

  select(data, selected) {
    var collector = this.suggest(data);
    var foundWord = collector.find((word) => {
      if (word === selected) {
        return word;
      }
    })
    var node = this.find(foundWord);

    node.timesSelected++
  }

}
