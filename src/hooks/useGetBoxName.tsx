import React, { useEffect, useState} from "react";
import axios from 'axios'

const BoxInfo = [
    {
        boxType:"1",
        boxName:"MetaRush"
    },
    {
        boxType:"2",
        boxName:"MetaRun"
    },
    {
        boxType:"3",
        boxName:"MetaRace"
    },
    {
        boxType:"4",
        boxName:"MetaRich"
    }
  ]
export const GetBoxName = (boxID) => {
    const [ boxName, setBoxName ] = useState("")
    useEffect(() => {
        function getBoxName(){
            const getItem = BoxInfo.filter(d=>d.boxType === boxID )
            setBoxName(getItem[0].boxName)
        }
        if (Number(boxID) !== 0) {
            getBoxName()
        }
    }, [boxID])
    return { boxName }
}
