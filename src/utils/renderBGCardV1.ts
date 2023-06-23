

export const renderBGCard = (boxType) => {
    if(boxType === 1){
     return "#FFF9DE"
    }  if(boxType === 2){
     return "#D6EFFF"
    } if(boxType === 3){
     return "#FFE8D4"
    } if(boxType === 4){
     return "#FEE0FF"
    }
     return "transparent"
 }
 export const renderImgBox = (boxType) => {
     if(parseInt(boxType) === 1){
      return "https://run-image.s3.ap-southeast-1.amazonaws.com/run_newshoes/box/1_common2+852.png"
     }  if(parseInt(boxType) === 2){
      return "https://run-image.s3.ap-southeast-1.amazonaws.com/run_newshoes/box/2_uncommon+852.png"
     } if(parseInt(boxType) === 3){
      return "https://run-image.s3.ap-southeast-1.amazonaws.com/run_newshoes/box/3_rare+852.png"
     } if(parseInt(boxType) === 4){
      return "https://run-image.s3.ap-southeast-1.amazonaws.com/run_newshoes/box/4_epic+852.png"
     }
      return "https://run-image.s3.ap-southeast-1.amazonaws.com/run_newshoes/box/4_epic+852.png"
 }
 export const renderBGShoes = (boxType) => {
     if(boxType === 1){
      return " #D1E2DB"
     }  if(boxType === 2){
      return "#FDE59C"
     } if(boxType === 3){
      return "#FFC28D"
     } if(boxType === 4){
      return "#A0D7E7"
     }
      return "transparent"
  }
  export const renderBoxName = (boxType) => {
     if(boxType === 1){
      return "MetaRush"
     }  if(boxType === 2){
      return "MetaRun"
     } if(boxType === 3){
      return "MetaRace"
     } if(boxType === 4){
      return "MetaRich"
     }
      return ""
  }
  
 export const renderBGCardMystery = (boxType) => {
     if(boxType === 1){
      return "/images/mysterybox/boxtype1.png"
     }  if(boxType === 2){
      return "/images/mysterybox/boxtype2.png"
     } if(boxType === 3){
      return "/images/mysterybox/boxtype3.png"
     } if(boxType === 4){
      return "/images/mysterybox/boxtype4.png"
     }
      return "transparent"
  }
  export const renderImgUnboxGif = (boxType) => {
     if(parseInt(boxType) === 1){
      return "/images/mysterybox/unboxtype1.gif"
     }  if(parseInt(boxType) === 2){
      return "/images/mysterybox/unboxtype2.gif"
     } if(parseInt(boxType) === 3){
      return "/images/mysterybox/unboxtype3.gif"
     } if(parseInt(boxType) === 4){
      return "/images/mysterybox/unboxtype4.gif"
     }
      return ""
 }