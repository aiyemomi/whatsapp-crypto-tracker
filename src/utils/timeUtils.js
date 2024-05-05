function getRandomTimeBetweenTwelveAndOne() {
  const randomMinutes = Math.floor(Math.random() * 60);

  const randomTime = `12:${randomMinutes < 10 ? "0" : ""}${randomMinutes}`;

  return randomTime;
}
const randomTimeTwelve = getRandomTimeBetweenTwelveAndOne();

function getRandomTimeBetweenFiveandSix() {
  const randomMinutes = Math.floor(Math.random() * 60);

  const randomTime = `5:${randomMinutes < 10 ? "0" : ""}${randomMinutes}`;

  return randomTime;
}
const randomTimeFive = getRandomTimeBetweenFiveandSix();

function getRandomMinutes() {
  const randomMinutes = Math.floor(Math.random() * 60);
  return randomMinutes;
}
module.exports = {
  getRandomTimeBetweenFiveandSix,
  getRandomTimeBetweenTwelveAndOne,
  getRandomMinutes,
};
