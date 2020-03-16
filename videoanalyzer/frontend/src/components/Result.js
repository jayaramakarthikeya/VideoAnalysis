import React from 'react'
import axios from 'axios';

export const Result=({properties,check})=> {
  handleSubmit = (e)=>{
    let fd = new FormData();
    fd.append('video_vid',properties.file);
    axios.post('/api/video/',fd)
    .then((res)=>{
      console.log(res);
    })
    .catch((err)=>{
      console.log(err)
    });
  }
    return (
        <div>
        <div className="container cont white">
            <table className='highlight'>
        <thead>
          <tr>
              <th>Property</th>
              <th>Value</th>
              <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Type</td>
            <td>{(check.typevid)?check.typevid:properties.typevid}</td>
            <td>{(properties.typevid)?'accepted':'not accepted'}</td>
          </tr>
          <tr>
          <td>VideoCodec</td>
            <td>{(check.videocodec)?check.videocodec:properties.videocodec}</td>
            <td>{(properties.videocodec)?'accepted':'not accepted'}</td>
          </tr>
          <tr>
          <td>AudioCodec</td>
            <td>{(check.audiocodec)?check.audiocodec:properties.audiocodec}</td>
            <td>{(properties.audiocodec)?'accepted':'not accepted'}</td>
          </tr>
          <tr>
          <td>Size/min</td>
            <td>{(check.sizepermin)?check.sizepermin:properties.sizepermin}</td>
            <td>{(properties.sizepermin)?'accepted':'not accepted'}</td>
          </tr>
          <tr>
          <td>FrameSize</td>
            <td>{(check.framesize)?check.framesize:properties.framesize}</td>
            <td>{(properties.framesize)?'accepted':'not accepted'}</td>
          </tr>
          <tr>
          <td>SampleRate</td>
            <td>{(check.samplerate)?check.samplerate:properties.samplerate}</td>
            <td>{(properties.samplerate)?'accepted':'not accepted'}</td>
          </tr>
          <tr>
          <td>Channel-Count</td>
            <td>{(check.channelcount)?check.channelcount:properties.channelcount}</td>
            <td>{(properties.channelcount)?'accepted':'not accepted'}</td>
          </tr>
          <tr>
          <td>FPS</td>
            <td>{(check.fps)?check.fps:properties.fps}</td>
            <td>{(properties.fps)?'accepted':'not accepted'}</td>
          </tr>
          <tr>
          <td>Bitrate</td>
            <td>{(check.bitrate)?check.bitrate:properties.bitrate}</td>
            <td>{(properties.bitrate)?'accepted':'not accepted'}</td>
          </tr>
        </tbody>
      </table>
      </div>
      {(properties.videocodec && properties.sizepermin && properties.framesize && properties.samplerate && properties.bitrate)?
      <button  className="btn waves-effect waves-light " onClick={this.handleSubmit} style={{marginTop:50,marginLeft:300,background:'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'}} name="action" >Upload
      <i className="material-icons right">send</i></button>:
      <p style={{paddingLeft:10,paddingTop:10}} className="name">File can't be uploaded.Please refresh and try with another file</p>}
        </div>
    )
}

