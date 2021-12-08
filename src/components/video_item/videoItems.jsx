import React from 'react';

const VideoItems = (props) => {
  return (  
    <h1>
      {props.video.snippet.title}
    </h1>
  )  
}

export default VideoItems;