import React, { Component } from 'react'
import Popup from './layouts/Popup';
import {expobj,playType,getFrameSize,getSizePerMin,getSampleRate,getBitrate} from '../extraction/functionality'
import { Result } from './Result';


class Upload extends Component {
    state = {
        loading:false,
        submit:false,
        filename:"No file chosen,yet",
        type:null,
        srcvid:null,
        properties:{
        srcv:null,
        typevid:null,
        file:null,
        videocodec:null,
        audiocodec:null,
        sizepermin:null,
        framesize:null,
        samplerate:null,
        channelcount:null,
        fps:null,
        bitrate:null
        },
        check:{
            videocodec:null,
            audiocodec:null,
            sizepermin:null,
            framesize:null,
            samplerate:null,
            channelcount:null,
            fps:null,
            bitrate:null,
            typevid:null 
        }
    }

    handleClick = () =>{
        this.input.click();
    }

    handleChange = (e)=>{
        const file = e.target.files[0];
        const filename = file.name;
        console.log(file);
        this.setState({
            ...this.state,
            filename:filename,
            srcvid: URL.createObjectURL(file),
            
        });
        const sizemb = Math.round(file.size/(1024*1024));
        console.log(sizemb);
        console.log(file.type);
        const typevid = file.type;
        if (typevid=='') {
            this.setState({
                ...this.state,
                filename,
                type: ''
            })
            setTimeout(function(){
                location.reload();
            },4000);
        }
        else{
            this.vid.load();
            setTimeout(()=>{
                this.setState({
                    ...this.state,
                    loading:false,
                });
            },4000);
        if (playType(file)) {
            const videocodec = ['mpeg4', 'wmv2', 'theora/vorbis', 'theora/vorbis', 'wmv'];
            const audiocodec = ['mp3', 'mp3', 'ogv', 'ogv', 'wmv'];
            console.log(`Video-Codec: ${videocodec[expobj.id]}`);
            console.log(`Audio-codec: ${audiocodec[expobj.id]}`);
            this.setState({
                ...this.state,
                loading:true,
                filename,
                type:typevid,
                srcvid:URL.createObjectURL(file),
                properties:{
                videocodec: videocodec[expobj.id],
                audiocodec: audiocodec[expobj.id],
                srcv:URL.createObjectURL(file),
                typevid,
                file,
                },
                check:{
                    ...this.state.check,
                    videocodec: videocodec[expobj.id],
                audiocodec: audiocodec[expobj.id],
                typevid,
                }
            });
        } 
        setTimeout(()=>{
            const sec = this.vid.duration;
            const vwidth = this.vid.videoWidth;
            const vheight = this.vid.videoHeight;
            console.log(getSizePerMin(sizemb,sec));
            if(getSizePerMin(sizemb,sec)<=1){
                this.setState({
                    ...this.state,
                    properties:{
                    ...this.state.properties,
                    sizepermin:getSizePerMin(sizemb,sec),
                    }
                });
            }
            else{
                this.setState({
                    ...this.state,
                    check:{
                    ...this.state.check,
                    sizepermin:getSizePerMin(sizemb,sec),
                    }
                });
            }
            const framesize = getFrameSize(vwidth,vheight);
            console.log(framesize);
            if(vwidth>=800 && vheight>=600){
                
                console.log(framesize);
                this.setState({
                    ...this.state,
                    properties:{
                    ...this.state.properties,
                    framesize:framesize
                    }
                });
            }
            else{
                this.setState({
                    ...this.state,
                    check:{
                    ...this.state.check,
                    framesize,
                    }
                });
            }
            const samplerate = getSampleRate(); 
            if(getSampleRate()>22050){
                this.setState({
                    ...this.state,
                    properties:{
                        ...this.state.properties,
                        samplerate,
                    }
                });
            } 
            else{
                this.setState({
                    ...this.state,
                    check:{
                    ...this.state.check,
                    samplerate,
                    }
                });
            }
            const audioCtx = new AudioContext();
            const source = audioCtx.createMediaElementSource(this.audio);
            const channelCount = source.channelCount;
            if(channelCount==2){
                this.setState({
                    ...this.state,
                    properties:{
                        ...this.state.properties,
                        channelcount:channelCount
                    }
                });
            }
            else{
                this.setState({
                    ...this.state,
                    check:{
                    ...this.state.check,
                    channelCount,
                    }
                });
            }
            const times = [];
            var fps;
            const fpsarr = [];
            const refreshLoop=()=> {
                window.requestAnimationFrame(() => {
                    const now = performance.now();
                    while (times.length > 0 && times[0] <= now - 1000) { times.shift(); }
                    times.push(now);
                    fps = times.length;
                    fpsarr.push(fps);
                    if (Math.max(...fpsarr) > 3) {
                        fps = Math.max(...fpsarr);
                        console.log(fps);
                        this.setState({
                            ...this.state,
                            properties:{
                                ...this.state.properties,
                                fps:fps,
                            },
                            check:{
                                ...this.state.check,
                                fps,
                            }
                        });  
                    } else { refreshLoop(); }
                });
            }
            refreshLoop();
            console.log(fps);
                    
        console.log(getBitrate(sizemb,sec));
        if(getBitrate(sizemb,sec)>=120){
            this.setState({
                ...this.state,
                properties:{
                    ...this.state.properties,
                    bitrate:getBitrate(sizemb,sec),
                }
            });  
        }
        else{
            this.setState({
                ...this.state,
                check:{
                ...this.state.check,
                bitrate:getBitrate(sizemb,sec),
                }
            });
        }
        },3000);

    }
    }
    handleSubmit = () =>{
        this.setState({
            ...this.state,
            submit:true,
        });
    }

    render() {
        return (
            <div className="main">
                {(this.state.type==='')?<Popup/>:''}
                <h2 className="heading">Video Quality Analysis</h2>
                <video ref={el => this.vid = el} id="video_here" hidden="hidden" controls>
                    <source src={this.state.srcvid} type="video/mp4" />
                    <track src="" kind="captions" srcLang="en" label="english_captions" />
                </video>
                <audio src={this.state.srcvid} ref={el => this.audio = el} id="audio_here" hidden="hidden" controls>
                    <track src="" kind="captions" srcLang="en" label="english_captions" />
                </audio>
            <div className="container center cont">
                <img src={"/static/giphy.gif"} style={{borderRadius:40,marginTop:30}} height="200" alt="logo"/>
                <h2 className="addvideo">Add a Video File:</h2>
                <input ref={(el)=> this.input = el} type="file" hidden="hidden" onChange={this.handleChange}/>
                <button className="waves-effect waves-light btn btnnn" style={{marginTop:30,justifyContent:"center"}} onClick={this.handleClick}>Choose file</button>
                <p style={{paddingLeft:10,paddingTop:10}} className="name">File Name: {this.state.filename}</p>
                <br/>
                {(this.state.loading)?  <div className="preloader-wrapper active">
    <div className="spinner-layer spinner-red-only">
      <div className="circle-clipper left">
        <div className="circle"></div>
      </div><div className="gap-patch">
        <div className="circle"></div>
      </div><div className="circle-clipper right">
        <div className="circle"></div>
      </div>
        </div>
    </div>
                :<button  className="btn btnnn waves-effect waves-light" name="action" onClick={this.handleSubmit}>Check
                    <i className="material-icons right">send</i></button>
                }
            </div>
            {(this.state.submit)?<Result properties={this.state.properties} check={this.state.check}/>:''}
        </div>
        )
    }
}

export default Upload
