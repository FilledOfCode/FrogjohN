
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
            // keep the connection alive to account for longer response times
            writeStream.setHeader('Connection', 'Keep-Alive');
            // set the correct mime type so the client knows what to do with the response object
            writeStream.contentType('mp4');
            ffmpeg(readStream)
              .setStartTime(start)
              .duration(end)
              // move the metadata to the front of the file so that it is streamable
              .addOutputOptions('-movflags +frag_keyframe+separate_moof+omit_tfhd_offset+empty_moov')
              .format('mp4')
              .on('end', (data) => {
                console.log('file written successfully');
              })
              .on('stderr', (e) => {
                  console.log('STDERR SINGLE CLIP', e);
              })
              .on('error', (e) => {
                console.log('ERROR GETTING SINGLE CLIP', e);
              })
              // pipe the output data directly on the write stream and send the response
              .pipe(writeStream, {end: true});
        } catch (e) {
            console.log('get single gop process failed ', e);
        }
    }

    getInspectorData = () => {
        // use the iframe json to get the inspector view data and build the GOP urls for the playable clips
        return this.json.map((_, i) => {
            const { start, end } = this.getStartEndGop(i);
            const url = `http://localhost:3000/videos/${this.name}.mp4/group-of-pictures/${i}.mp4`;
            return { start, end: +start+end, url };
        });
    }    

    /**
     * @param {JSON} data
     */
    filterIFrames = (data) => {
        const iFrames = [];
        for(let j in data) {
            if(data[j].pict_type == 'I') {
                iFrames.push(data[j]);
            }
        };
        return iFrames;
    }
        
    /**
     * @param {number} frameIndex
     */
    getStartEndGop = (frameIndex) => {
        let isLastFrame = false;