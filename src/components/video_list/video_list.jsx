import React from 'react';
import VideoItems from '../video_item/videoItems';

const Video_list = (props) => {
  console.log(props.videos)
  //console.log(props.videos.map(video=>console.log(video)))
//console.log(props.videos.items.map(video=>1))
//console.log(props.videos.items.map((video)=>1)
  return (
  <ul>
      {props.videos.map(video => (
        <VideoItems key={video.id} video={video}/>
      ))}
  </ul>) 
}
export default Video_list;


// <VideoItems 밖에서> props로 받아 온다음에 map을 써야하는거 아닌가?음..?
//console.log(props.videoList[0])이걸하면 undefined가 뜨고 난 이후 이 값을 읽어와서,,에러나는듯 {videoList: Array(0)}videoList: [][[Prototype]]: Object
