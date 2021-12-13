import React, { useState, useEffect }from 'react';
import styles from './app.module.css';
import VideoList from './components/video_list/video_list';
import SearchHeader from './components/search_header/search_header';
import VideoDetail from './components/video_detail/video_detail';

const App = ({ youtube }) => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  //const [searchIs,setSearchIs] = useState(null);

  const selectVideo = (video) => {
    setSelectedVideo(video);
  }

  useEffect(() => {
    youtube//난 videos(youtube.이런식으로함;직접 state에 넣는게 아니라 state의 값을 setState에 넣어주는것.dependency error떳었음
    .mostPopular()
    .then(videos => setVideos(videos));
  }, [youtube]);

  const onSearch = query => {
    youtube//난 videos(youtube.이런식으로함;
      .search(query)
      .then(videos => {
        setSelectedVideo(null);
        setVideos(videos)});
      //.then(videos => setSearchIs(videos))
  };

  return (
    <div className={styles.app}>
      <SearchHeader className={styles.searchHeader} onSearch={onSearch}/>
      <section className={styles.content}>
      {selectedVideo && 
        <div className={styles.detail}>
          <VideoDetail video={selectedVideo}/>
        </div>}
        <div className={styles.list}>
        <VideoList videos={videos} onVideoClick={selectVideo} display={selectedVideo ? 'list': 'grid'}/>{/*{selectedVideo ? 'list': searchIs ? 'list' : 'grid'}/ */}
        </div>
      </section>
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