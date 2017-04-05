import { assert } from 'chai';
import Node from '../scripts/Node'
import Trie from '../scripts/Trie'
const fs = require('fs');

require('locus')

describe('Trie', () => {
  const text = "/usr/share/dict/words"

  it('should create a node', () => {
    var completion = new Trie();

    assert.instanceOf(completion.root, Node);
  })

  it('should create a node with no children', () => {
    var completion = new Trie();

    assert.deepEqual(completion.root.next, {});
  })

  it('should insert a word', () => {
    var completion = new Trie;

    completion.insert('pizza');

    assert.equal(completion.root.next.p.data, 'p');
    assert.equal(completion.root.next.p.next.i.data, 'i');
    assert.equal(completion.root.next.p.next.i.next.z.data, 'z');
    assert.equal(completion.root.next.p.next.i.next.z.next.z.data, 'z');
    assert.equal(completion.root.next.p.next.i.next.z.next.z.next.a.data, 'a');
  })

  it('should grow the branch', () => {
    var completion = new Trie;

    completion.insert('at');
    completion.insert('ats');

    assert.equal(completion.root.next.a.data, 'a');
    assert.equal(completion.root.next.a.next.t.data, 't');
    assert.equal(completion.root.next.a.next.t.next.s.data, 's');
  })

  it('should find a node', () => {
    var completion = new Trie();

    completion.insert('at');
    completion.insert('ats');

    var finds = completion.find('at');

    assert.equal(finds.data, completion.root.next.a.next.t.data);
  })

  it('should return the words with the given prefix', () => {
    var completion = new Trie();

    completion.insert('pizza');
    completion.insert('pizzas');
    var result = completion.suggest('piz');

    assert.deepEqual(result, ['pizza', 'pizzas']);
  })

  it('should return the number of words in completion', () => {
    var completion = new Trie();

    completion.insert('pizza');
    completion.insert('lost');

    assert.equal(completion.count(), 2);
  })

  it('should populate the trie', () => {
    var completion = new Trie();
    let dictionary = fs.readFileSync(text).toString().trim().split('\n');

    completion.populate(dictionary);
    var count = completion.count();

    assert.equal(count, 235886);
  })
})
