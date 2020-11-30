import { VoiceRSS } from './voicerss.js';

const button = document.getElementById('button');

// Passing Joke to VoiceRSS API
const tellMe = (joke) => {
  VoiceRSS.speech({
    key: process.env.API_KEY,
    src: joke,
    hl: 'en-us',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
};

// Get Jokes from Joke API
const getJokes = async () => {
  let joke = '';
  const apiUrl =
    'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    tellMe(joke);
  } catch (error) {
    // Catch Errors Here
    console.log('whoops', error);
  }
};

getJokes();
