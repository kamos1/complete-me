import { assert } from 'chai';
import Node from '../scripts/Node'

describe('Node', () => {

  it('should be an instance of Node', () => {
    let node = new Node();

    assert.instanceOf(node, Node);
  })

  it('should take a data value', () => {
    let node = new Node(5);

    assert.equal(node.data, 5);
  })

  it('should create a node with no children', () => {
    let node = new Node();

    assert.deepEqual(node.next, {})
  })

  it('should create a node with a child', () => {
    let me = new Node('a');
    let you = new Node('b', me)

    assert.equal(you.next, me)
  })
})
