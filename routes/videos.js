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
router.get('/:videoName.mp4/group-of-pictures/:groupIndex.mp4', (req, res, next) => { 
  try {
    const video = new Video(req.params.videoName);
    video.getSingleGop(+req.params.groupIndex, res);
  } catch (e) {
    console.log('ERROR IN GET CLIP: ', e);
    next(e);
  }
});


// Get html page with each group of pictures (playable mp4) and accompanying metadata
router.get('/:videoName.mp4/group