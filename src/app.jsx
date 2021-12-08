import './app.css';
import React, { useState, useEffect }from 'react';
import Video_list from './components/video_list/video_list';

const App = (props) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=AIzaSyD9if3bvpa_HTlYZlAUKtKIGKoVfrMlCHQ&=AIzaSyD9if3bvpa_HTlYZlAUKtKIGKoVfrMlCHQ", requestOptions)
      .then(response => response.json())
      .then(result => setVideos(result.items))
      .catch(error => console.log('error', error));
  
  }, [])

  return (
    
    <>
      <Video_list videos={videos}/>
    </>
  );
};

export default App;

//useState([])인데 setVideo(result)인가 setVideo([result])인가,, 후자일껏 같다. 빈배열을 넣어줬으니 데이터 형태를 유지 해야 할 것 아닌가...
//둘다 틀림. setVideo(result.items)로 하면 list에서 props.videos.map 에러 안뜸,,, setVideo(result)로 하고 props.videos.items.map에러 뜸,,, 
//                                           전달되는 초기값 [] 전달값 (25)[{...},{...},...,{...}]        props.videos.items의 값이 undefined랑 배열이 나옴. undefined에 map하니 에러가,,,