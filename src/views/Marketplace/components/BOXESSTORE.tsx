import React, { useEffect, useState } from "react";
import { Flex } from "@pancakeswap/uikit";
import { GetListItems, GetTotalSellItems } from "state/marketplace";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import ContainerCard from "./ContainerCardAll";
import ContainerCardMetaRush from "./ContainerMetaRush";
import ContainerCardMetaRun from "./ContainerMetaRun";
import ContainerCardMetaRace from "./ContainerMetaRace";
import ContainerCardMetaRich from "./ContainerCardMetaRich";

const dataAdmin = [
    {
        id: 1,
        name: 'MetaRush'
    },
    {
        id: 2,
        name: 'MetaRun'
    },
    {
        id: 3,
        name: 'MetaRace'
    },
    {
        id: 4,
        name: 'MetaRich'
    },
]

interface Props {
    sortprice:string
    filterBoxType:number
}
const BOXESSTORE:React.FC<Props> = ({sortprice, filterBoxType}) => {

    const { chainId } = useActiveWeb3React()
    
    const [ totalSell ] = GetTotalSellItems(chainId)
    const [ listItems ] = GetListItems(totalSell, chainId)
    const [listNftItem, setListNftItem] = useState([])

    
    useEffect(() => {
        const object = [...listItems]
        if (sortprice==="highest"){
            if ( filterBoxType !== 0 ) {
                return setListNftItem(
                    object.sort((obj1, obj2) => Number(obj2.priceListing) - Number(obj1.priceListing)).filter((data) => data.boxType === filterBoxType),
                )
            } 
            return setListNftItem(
                object.sort((obj1, obj2) => Number(obj2.priceListing) - Number(obj1.priceListing)),
            )
        } if (sortprice === 'lowest') {
            if ( filterBoxType !== 0 ) {
                return setListNftItem(
                    object.sort((obj1, obj2) => Number(obj1.priceListing) - Number(obj2.priceListing)).filter((data) => data.boxType === filterBoxType),
                )
            }
            return setListNftItem(
              object.sort((obj1, obj2) => Number(obj1.priceListing) - Number(obj2.priceListing)),
            )
        }
        return setListNftItem([...listItems])
    }, [sortprice, filterBoxType, listItems])
    
    
    return (
        <Flex width="100%" flexDirection="column" mt="1rem" height="auto" minHeight="50vh">
            { filterBoxType === 0 &&
                <ContainerCard listItems={listNftItem}/>
            }
            { filterBoxType === 1 &&
                <ContainerCardMetaRush listItems={listNftItem}/>
            }
            { filterBoxType === 2 &&
                <ContainerCardMetaRun listItems={listNftItem}/>
            }
            { filterBoxType === 3 &&
                <ContainerCardMetaRace listItems={listNftItem}/>
            }
            { filterBoxType === 4 &&
                <ContainerCardMetaRich listItems={listNftItem}/>
            }
            
        </Flex>
    )
}
export default BOXESSTORE


