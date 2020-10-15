import leaderboardAPI from '../leaderboardAPI';

test('Get object from API', () => {
  leaderboardAPI.getScore().then(scores => {
    expect(typeof scores).toBe('object');
  });
});

test('Get username Luke from API', () => {
  let username;
  leaderboardAPI.getScore().then(scores => {
    scores.forEach(score => {
      if (score.user === 'Luke') username = score.user;
    });
    expect(username).toBe('Luke');
  });
});

test('Post valid score 5', () => {
  leaderboardAPI.postScore({ user: 'jestTest', score: 5 }).then(answer => {
    expect(answer.result).toBe('Leaderboard score created correctly.');
  });
});

test('Post invalid score 0', () => {
  leaderboardAPI.postScore({ user: 'jestTest', score: 0 }).then(answer => {
    expect(answer.result).toBe(undefined);
  });
});
