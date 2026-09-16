/* Click-to-play video facade. The poster image and play button are real markup;
   the YouTube player is only injected once someone presses play, so no
   third-party script loads for visitors who never watch. Tiny, dependency-free,
   deferred — same shape as the other scripts in this folder. */
(function () {
  var facades = document.querySelectorAll('.js-video-facade');
  if (!facades.length) return;

  facades.forEach(function (facade) {
    facade.addEventListener('click', function () {
      var id = facade.dataset.videoId;
      if (!id) return;

      var frame = document.createElement('iframe');
      /* autoplay because the click IS the play action — anything else would make
         people press play twice. */
      frame.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0';
      frame.title = facade.dataset.videoTitle || 'Video';
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      frame.allowFullscreen = true;
      frame.setAttribute('frameborder', '0');

      var media = facade.parentNode;
      media.classList.add('is-playing'); // drops the gradient tint off the player
      facade.replaceWith(frame);
      frame.focus();
    });
  });
})();
