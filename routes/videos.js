let express = require('express');
let router = express.Router();
const { Video } = require('../public/javascripts/video-class');


// Get the json data for the video
router.get('/:videoId.mp4/group-of-pictures.json', async function(req, res, next) {
  try {
    const video = new Video(req.params.videoId);
    res.send(video.json);
  } catch (e) {
    console.log('ERROR IN GET JSON, ', e)
    next(e);
  }
});


// Get a single GOP by index // TODO: Fix bug with getting 0th group
router.get('/:videoName.mp4/group