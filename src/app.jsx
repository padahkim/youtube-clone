import React, { useState, useEffect }from 'react';
import styles from './app.module.css';
import Video_list from './components/video_list/video_list';
import SearchHeader from './components/search_header/search_header';

const App = () => {
  const [videos, setVideos] = useState([]);

  const search = query => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`, requestOptions)
      .then(response => response.json())
      .then(result => result.items.map(item => {
        return {...item, id:item.id.videoId}
      }))
      .then(result => setVideos(result))
      .catch(error => console.log('error', error));
  }
  
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`, requestOptions)
      .then(response => response.json())
      .then(result => setVideos(result.items))
      .catch(error => console.log('error', error))
  }, [])

  return (
    <div className={styles.app}>
      <SearchHeader className={styles.searchHeader} onSearch={search}/>
      <Video_list videos={videos}/>
    </div>
  );
};

export default App;
//useState([])인데 setVideo(result)인가 setVideo([result])인가,, 후자일껏 같다. 빈배열을 넣어줬으니 데이터 형태를 유지 해야 할 것 아닌가...
//둘다 틀림. setVideo(result.items)로 하면 list에서 props.videos.map 에러 안뜸,,, setVideo(result)로 하고 props.videos.items.map에러 뜸,,, 
//                                           전달되는 초기값 [] 전달값 (25)[{...},{...},...,{...}]        props.videos.items의 값이 undefined랑 배열이 나옴. undefined에 map하니 에러가,,,
//search api를 app.js에 넣을 것인가 nav_search에 넣을것인가,,, app에 넣으려 했지만 const requestOptions이 겹쳤으므로=>useEffect 여러개 사용가능 nav_search에 넣어보겟다...굳이 app까지 상태를
//끌어와야 할 이유도 찾지 못했고,,,끌어와야할것같음...search api로 받아온 값을 결국 video state에 넣는거 아닐까..라는생각이
//ㄴㄴㄴ.. onSubmit이 되었을때 마운트 해야하니까 search에 넣어야할듯..아닌가 값을 받아와서 결국은 setVideo에 넣어줘야하는거 아닌가?..아닌데 바로 search에서호출됬던거같은데->이결과로 video를 바꿔줄꺼니 걍 app에

//1. useEffect 첫마운트 생략 업데이트될때만