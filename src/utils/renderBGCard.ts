

export const renderBGCard = (boxType) => {
    if (boxType === 0) {
        return '#dfdedd';
    } if (boxType === 1) {
        return '#fdba57';
    } if (boxType === 2) {
        return '#E0115F';
    } if (boxType === 3) {
        return '#FEE0FF';
    }
    return "transparent"
}
export const renderImgBox = (boxType) => {
    if (parseInt(boxType) === 1) {
        return "https://run-image.s3.ap-southeast-1.amazonaws.com/run_newshoes/box/1_common2+852.png"
    } if (parseInt(boxType) === 2) {
        return "https://run-image.s3.ap-southeast-1.amazonaws.com/run_newshoes/box/2_uncommon+852.png"
    } if (parseInt(boxType) === 3) {
        return "https://run-image.s3.ap-southeast-1.amazonaws.com/run_newshoes/box/3_rare+852.png"
    } if (parseInt(boxType) === 4) {
        return "https://run-image.s3.ap-southeast-1.amazonaws.com/run_newshoes/box/4_epic+852.png"
    }
    return ""
}
export const renderBGShoes = (boxType) => {
    if (boxType === 1) {
        return " #D1E2DB"
    } if (boxType === 2) {
        return "#FDE59C"
    } if (boxType === 3) {
        return "#FFC28D"
    } if (boxType === 4) {
        return "#A0D7E7"
    }
    return "transparent"
}
export const renderBoxName = (boxType) => {
    if (boxType === 1) {
        return "Training Shoes Box"
    } if (boxType === 2) {
        return "Running Shoes Box"
    } if (boxType === 3) {
        return "Competitor Shoes Box"
    } if (boxType === 4) {
        return "Athele Shoes Box"
    }
    return ""
}