const scoreModule = (() => {
  const setScore = (score) => {
    localStorage.setItem('score', JSON.stringify(score));
  };

  const getScore = () => JSON.parse(localStorage.getItem('score'));

  const resetScore = () => {
    localStorage.clear();
    setScore(10);
  };

  const updateScore = (points) => {
    let score = getScore();

    score += points;
    setScore(score);
  };

  return { resetScore, getScore, updateScore };
})();

export default scoreModule;
