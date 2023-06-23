import { useTranslation } from "@pancakeswap/localization";
import { Flex } from "@pancakeswap/uikit";
import React, { useEffect, useState } from "react";
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { ChainId } from '@pancakeswap/sdk'
import styled from "styled-components";
import Inwallet from "./Inwallet";
import MysteryBox from "./MysteryBox";
import OnSale from "./OnSale";
// import OnSale from "./OnSale"

interface Props {
    filter:number
    pathActive: string
    checkClick:any
    callbackActive: (newValue) => void
    query?: string
}

const InventoryOnChain:React.FC<Props> = ({filter, checkClick, pathActive, callbackActive, query}) => {
    const ChainShowMystery = [ChainId.BSC_TESTNET, ChainId.ONUS_TESTNET, ChainId.ETHW_MAINNET, ChainId.ONUS] 
    const ChainShowOnsale = [ChainId.BSC_TESTNET, ChainId.BSC]
    const { t } = useTranslation()
    const { chainId } = useActiveWeb3React()
    const [ activeIndex, setActiveIndex ] = useState(0)
    useEffect(() => {
        if(pathActive === 'mystery') {
            setActiveIndex(2);
        }
    }, [pathActive]);
    
    useEffect(() => {
        callbackActive(activeIndex)
    }, [activeIndex]);
    
    return(
        <Flex width="100%" flexDirection="column">
            <Flex width="100%" justifyContent="center" alignItems="center" mt="1rem">
                <Flex width="100%">
                    <CustomButton onClick={()=>{setActiveIndex(0);checkClick('items')}} isActive={activeIndex === 0 ? !false : false}>{t("ITEMS")}</CustomButton>
                    {ChainShowOnsale.find(e => e === chainId) ?
                        <CustomButton onClick={()=>{setActiveIndex(1);checkClick('onsale')}} isActive={activeIndex === 1 ? !false : false}>{t("ON SALE")}</CustomButton>
                        : 
                        <></>}
                    {
                        ChainShowMystery.find(e => e === chainId) ?
                        <CustomButton onClick={()=>{setActiveIndex(2);checkClick('mystery')}} isActive={activeIndex === 2 ? !false : false}>{t("MYSTERY BOX")}</CustomButton>
                        :
                        <></>
                    }                    
                </Flex>
            </Flex>
            { activeIndex === 0 &&
                <Inwallet filterBoxType={filter} query={query}/>
            }
            { activeIndex === 1 &&
                <OnSale filterBoxType={filter} query={query}/>
            }
            { activeIndex === 2 &&
                <MysteryBox query={query}/>
            }
        </Flex>
    )
}
export default InventoryOnChain

const CustomButton = styled.div<{isActive:boolean}>`
  height:60px;
  width: 50%;
  padding:0px 10px 0px 10px;
  border-bottom: ${({ isActive }) => isActive ? "3px solid #E5C63F" : "none"};
  font-weight:bold;
  color:${({ isActive }) => isActive ? "#E5C63F" : "#B1B5C3"};
  padding-bottom:10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 24px;
  @media screen and (max-width: 600px){
    text-align: center;
    font-size: 16px;
}
`