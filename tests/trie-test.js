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

  it('should insert two words', () => {
    var completion = new Trie;

    completion.insert('pizza');
    completion.insert('nodes');

    assert.equal(completion.root.next.p.data, 'p');
    assert.equal(completion.root.next.p.next.i.data, 'i');
    assert.equal(completion.root.next.p.next.i.next.z.data, 'z');
    assert.equal(completion.root.next.p.next.i.next.z.next.z.data, 'z');
    assert.equal(completion.root.next.p.next.i.next.z.next.z.next.a.data, 'a');
    assert.equal(completion.root.next.n.data, 'n');
    assert.equal(completion.root.next.n.next.o.data, 'o');
    assert.equal(completion.root.next.n.next.o.next.d.data, 'd');
    assert.equal(completion.root.next.n.next.o.next.d.next.e.data, 'e');
    assert.equal(completion.root.next.n.next.o.next.d.next.e.next.s.data, 's');
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

  it('should find the correct node with similar words inserted', () => {
    var completion = new Trie();

    completion.insert('cat');
    completion.insert('at');
    completion.insert('ats');

    var finds = completion.find('at');

    assert.equal(finds.data, completion.root.next.a.next.t.data);
  })

  it('should return an array', () => {
    var completion = new Trie();

    var result = completion.suggest('piz');

    assert.isArray(result, 'true');
  })

  it.only('should return the words with pi as the prefix', () => {
    var completion = new Trie();

    completion.insert('pizza');
    completion.insert('pie');
    var result = completion.suggest('pi');

    assert.deepEqual(result, ['pizza', 'pie']);
  })

  it('should return the words with piz as the prefix', () => {
    var completion = new Trie();

    completion.insert('pizza');
    completion.insert('pizzas');
    completion.insert('node');
    completion.insert('nodes');
    var result = completion.suggest('piz');

    assert.deepEqual(result, ['pizza', 'pizzas']);
  })

  it('should return the number of words in completion', () => {
    var completion = new Trie();

    completion.insert('pizza');

    assert.equal(completion.count(), 1);
  })

  it('should return the number of words in completion', () => {
    var completion = new Trie();

    completion.insert('pizza');
    completion.insert('lost');
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

  it('should update the timesSelected property to 1', () => {
    var completion = new Trie();
    let dictionary = fs.readFileSync(text).toString().trim().split('\n');

    completion.populate(dictionary);
    completion.select('piz', 'pizzeria')
    var result = completion.find('pizzeria')

    assert.equal(result.timesSelected, 1);
  })

  it('should update the timesSelected property to 4', () => {
    var completion = new Trie();
    let dictionary = fs.readFileSync(text).toString().trim().split('\n');

    completion.populate(dictionary);
    completion.select('piz', 'pizzeria')
    completion.select('piz', 'pizzeria')
    completion.select('piz', 'pizzeria')
    completion.select('piz', 'pizza')
    completion.select('piz', 'pizzeria')
    var result = completion.find('pizzeria')

    assert.equal(result.timesSelected, 4);
  })

  it('should update the first word returned for suggest to pizzeria', () => {
    var completion = new Trie();
    let dictionary = fs.readFileSync(text).toString().trim().split('\n');

    completion.populate(dictionary);
    completion.suggest('piz');
    completion.select('piz', 'pizzeria')
    var result = completion.suggest('piz')

    assert.equal(result[0], 'pizzeria');
  })
})
