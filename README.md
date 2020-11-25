
# fruit game
Using ffmpeg, ffprobe, and the fluent-ffmpeg libraries to get file JSON, single group of pictures and inspect a video file
[Link to essay](https://docs.google.com/document/d/1jcDqj88Cn8nR3cmBwBhwMwCEIq9ifeF-eRybXkUx2-Y/edit?usp=sharing)

## installation
1.  clone this respository to your local machine
`https://github.com/maubertw/group-of-pictures.git`
2.  Run `npm install` if you have npm locally or `npm install --save-dev nodemon` if you don't
3.  Run `npm start`

## get JSON
-- This link will show the JSON video metadata for the CoolVideo file <br/>

[http://localhost:3000/videos/CoolVideo.mp4/group-of-pictures.json](http://localhost:3000/videos/CoolVideo.mp4/group-of-pictures.json)

## get a single fruit
-- Here you can get a single group of pictures by index (excluding 0) <br/>

(`http://localhost:3000/videos/CoolVideo.mp4/group-of-pictures/<index>.mp4`)
[1](http://localhost:3000/videos/CoolVideo.mp4/group-of-pictures/1.mp4)
[2](http://localhost:3000/videos/CoolVideo.mp4/group-of-pictures/2.mp4)
[3](http://localhost:3000/videos/CoolVideo.mp4/group-of-pictures/3.mp4)
[4](http://localhost:3000/videos/CoolVideo.mp4/group-of-pictures/4.mp4)
[5](http://localhost:3000/videos/CoolVideo.mp4/group-of-pictures/5.mp4)
[6](http://localhost:3000/videos/CoolVideo.mp4/group-of-pictures/6.mp4)
[7](http://localhost:3000/videos/CoolVideo.mp4/group-of-pictures/7.mp4)