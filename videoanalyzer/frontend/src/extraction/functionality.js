
const type = ['video/mp4', 'video/avi', 'video/ogg', 'video/ogv', 'video/wmv'];


let j = 0;
let properties = {};
export const playType = (file) => {
    const type1 = file.type;
    for (let i = 0; i < type.length; i += 1) {
        if (type1 === type[i]) {
            j = i;
            return true;
        }
    }
    return false;
};

export const getSizePerMin = (size,sec) =>{
    const vmin = (sec)/60;
    return Math.round(size/vmin);
};

export const getFrameSize = (vWidth,vHeight) => {
    return `${vWidth}x${vHeight}`;
};

export const getSampleRate = () =>{
    const audioCtx = new AudioContext();
    return audioCtx.sampleRate;
}

export const getBitrate = (sizemb,sec) =>{
    return ((sizemb*1024)/(sec/60)*0.0075)*8;
}



export const expobj = {
    ...properties,
    id: j,
};

