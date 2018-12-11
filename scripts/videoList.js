'use strict';

/* global $, store, apiYt */

const videoList = (function(){
  function generateListItem(video) {
    return `<li data-video-id="${video.id}">
    <a href="https://www.youtube.com/watch?v=${video.id}" data-lity><img src="${video.thumbnail}" alt="${video.title}"></a>
    <h3>${video.title}</h3>
    </li>`;
  }

  function render() {
    const videoElements = store.videos.map(video => this.generateListItem(video));
    $('.results').html(videoElements);
  }

  function handleFormSubmit() {
    $('form').on('submit', function(){
      event.preventDefault();
      const searchTerm = $('#search-term').val();
      $('#search-term').val('');
      apiYt.fetchVideos(searchTerm, function(response){
        const decoratedVideos = apiYt.decorateResponse(response);
        store.setVideos(decoratedVideos);
        videoList.render();
      });
      
    });
  }

  function bindEventListeners() {
    handleFormSubmit();
  }

  return {
    generateListItem,
    render,
    handleFormSubmit,
    bindEventListeners
  };
}());