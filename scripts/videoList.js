'use strict';

/* global $, store, apiYt */

const videoList = (function(){
  function generateListItem(video) {
    return `<li data-video-id="${video.id}">
    <a href="https://www.youtube.com/watch?v=${video.id}" data-lity><img src="${video.thumbnail}" alt="${video.title}"></a>
    <h3>${video.title}</h3>
    <p><a href="https://www.youtube.com/channel/${video.channelId}">More from this channel</a></p>
    </li>`;
  }

  function render() {
    const videoElements = store.videos.map(video => this.generateListItem(video));
    const moreButton = '<button id="more-results">MORE RESULTS</button>';
    $('.results').html(videoElements);
    $('body').append(moreButton);
  }

  function handleFormSubmit() {
    $('form').on('submit', function(){
      event.preventDefault();
      const searchTerm = $('#search-term').val();
      $('#search-term').val('');
      apiYt.fetchVideos(searchTerm, function(response){
        const decoratedVideos = apiYt.decorateResponse(response);
        const pageTokens = apiYt.getPageTokens(response);
        store.setPageTokens(pageTokens);
        store.setSearchTerm(searchTerm);
        store.setVideos(decoratedVideos);
        videoList.render();
      });
      
    });
  }

  function handleMoreResultsButton() {
    $('body').on('click', '#more-results', function(){
      $.getJSON(`https://www.googleapis.com/youtube/v3/search/?part=snippet&key=AIzaSyDnc7Zms70Zf99U8didJx_lK3Q7-rEsxlI&pageToken=${store.pageTokens.nextPageToken}&q=${store.searchTerm}`, function(response) {
        const decoratedVideos = apiYt.decorateResponse(response);
        store.setVideos(decoratedVideos);
        videoList.render();
        console.log(response);
      });
    });
  }

  function bindEventListeners() {
    handleFormSubmit();
    handleMoreResultsButton();
  }

  return {
    generateListItem,
    render,
    bindEventListeners
  };
}());