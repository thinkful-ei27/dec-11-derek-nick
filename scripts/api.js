'use strict';

/* global $ */

const apiYt = (function(){
  const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
  const API_KEY = 'AIzaSyDnc7Zms70Zf99U8didJx_lK3Q7-rEsxlI';

  function fetchVideos(searchTerm, callback) {
    let query = {
      part: 'snippet',
      q: searchTerm,
      key: API_KEY
    };
    $.getJSON(BASE_URL, query, callback);
  }

  function decorateResponse(response) {
    console.log(response);
    let mappedResponse = response.items.map(item => {
      return {
        id: item.id.videoId,
        thumbnail: item.snippet.thumbnails.default.url,
        title: item.snippet.title,
        channelId: item.snippet.channelId,
        type: 'video'
      };
    });
    return mappedResponse;
  }

  function getPageTokens(response){
    if(response.nextPageToken){
      console.log(`${response.nextPageToken} exists!`);
    } else {
      console.log('NextPageToken does not exist');
    }
    if(response.prevPageToken){
      console.log(`${response.prevPagetoken} exists!`);
    } else {
      console.log('PrevPageToken does not exist');
    }
  }

  return {
    fetchVideos,
    decorateResponse,
    getPageTokens
  }
}());