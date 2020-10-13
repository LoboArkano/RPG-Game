const leaderboardAPI = (() => {
  const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/wbFk9kL5lA8GJ2kKbrWL/scores/';

  const postScore = async (data) => {
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(json => json);
  };

  const getScore = async () => {
    const data = await fetch(url)
      .then(response => response.json())
      .then(json => json.result);

    return data;
  };

  return { postScore, getScore };
})();

export default leaderboardAPI;
