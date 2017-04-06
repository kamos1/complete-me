export default class Node {
  constructor(data, next = {}) {
    this.data = data;
    this.isWord = false;
    this.next = next;
    this.timesSelected = 0;
  }
}
