let express = require('express');
let router = express.Router();
const { Video } = require('../public/javascripts/video-class');


// Get the json data for the video
router.get('/:videoId.mp4/gro