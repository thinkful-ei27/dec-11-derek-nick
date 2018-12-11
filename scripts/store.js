'use strict';

// eslint-disable-next-line no-unused-vars
const store= (function(){
  const videos = [];
  const pageTokens = {};
  const searchTerm = '';

  function setVideos(videos) {
    this.videos = videos;
  }

  function setPageTokens(pageTokens) {
    this.pageTokens = pageTokens;
  }

  function setSearchTerm(searchTerm) {
    this.searchTerm = searchTerm;
  }

  return {
    videos,
    pageTokens,
    searchTerm,
    setVideos,
    setPageTokens,
    setSearchTerm
  };
}());