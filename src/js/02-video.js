import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const vimeoPlayer = new Player(iframe);
const TIME_CODE = 'videoplayer-current-time';

const getLocalTimeOptions = () => {
  let initialTime = 0;
  const localDataTime = localStorage.getItem(TIME_CODE);
  if (localDataTime) {
    initialTime = parseFloat(localDataTime);
  }
  return initialTime;
};

const initialTime = getLocalTimeOptions();

vimeoPlayer.setCurrentTime(initialTime);

vimeoPlayer.on('timeupdate', throttle(onVideoPlay, 1000));
vimeoPlayer.on('ended', onVideoEnded);

function onVideoPlay(event) {
  if (event.duration - event.seconds < 1) {
    return;
  }
  localStorage.setItem(TIME_CODE, event.seconds);
}

function onVideoEnded(event) {
  localStorage.removeItem(TIME_CODE);
}
