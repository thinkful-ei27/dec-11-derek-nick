'use strict';

// eslint-disable-next-line no-unused-vars
const store= (function(){
  const videos = [];
  const pageTokens = {};

  function setVideos(videos) {
    this.videos = videos;
  }

  function setPageTokens(pageTokens) {
    this.pageTokens = pageTokens;
  }

  return {
    videos,
    pageTokens,
    setVideos,
    setPageTokens
  };
}());