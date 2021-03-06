import React from 'react';
import VideoItems from '../video_item/video_item';
import styles from './video_list.module.css';

const Video_list = ({ videos, onVideoClick, display }) => {
  return (
  <ul className={styles.videos}>
      {videos.map(video => (
        <VideoItems key={video.id} video={video} onVideoClick={onVideoClick} display={display}/>
      ))}
  </ul>) 
}
export default Video_list;


// <VideoItems 밖에서> props로 받아 온다음에 map을 써야하는거 아닌가?음..?
//console.log(props.videoList[0])이걸하면 undefined가 뜨고 난 이후 이 값을 읽어와서,,에러나는듯 {videoList: Array(0)}videoList: [][[Prototype]]: Object
