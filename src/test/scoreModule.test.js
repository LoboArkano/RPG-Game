import scoreModule from '../score';

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

test('Get a value of 10 after reset score', () => {
  scoreModule.resetScore();
  expect(scoreModule.getScore()).toBe(10);
});

test('Update score with 500 more points, the result should be 510', () => {
  scoreModule.resetScore();
  scoreModule.updateScore(500);
  expect(scoreModule.getScore()).toBe(510);
});

test('After several updates the score is 2992', () => {
  scoreModule.resetScore();
  scoreModule.updateScore(150);
  scoreModule.updateScore(750);
  scoreModule.updateScore(1000);
  scoreModule.updateScore(1082);
  expect(scoreModule.getScore()).toBe(2992);
});
