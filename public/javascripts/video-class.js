
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
            command, 
            {maxBuffer: 10240 * 50000}, 
            (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                }
            });
            // parse the output buffer and select the frames property
            const json = JSON.parse(process.toString('utf8'))['frames'];
          // only return the data for the iFrames  
          return this.filterIFrames(json);
    }

    /**
     * @param {number} index, index of the requested GOP
     * @param {Response} writeStream
     */
    getSingleGop = async (index, writeStream) => { 
        try {
            const { start, end } = this.getStartEndGop(index);
            // create a readable stream of the video file to pass to the command
            const readStream = await fs.createReadStream(this.path + '.mp4');