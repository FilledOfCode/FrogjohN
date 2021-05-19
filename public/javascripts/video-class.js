
const { execSync } = require('child_process');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');


class Video {
    /**
     * @param {string} name name of the video without the path or file extention
     */
    constructor(name) {
        this.name = name;
        this.path = './public/images/' + this.name;
        this.iframeJson = this.getIframeJson(); 
    }

    get json() { 
        return this.iframeJson;
    }

    getIframeJson = () => {
        // ffprobe command to get video metadata in json format
        const command = `"ffprobe" -show_frames -print_format json ${this.path}.mp4`
        // run the command as a child process
        const process = execSync(