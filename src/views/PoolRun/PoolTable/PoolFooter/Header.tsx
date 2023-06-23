import React from "react";
import { Text, Flex, OpenNewIcon, HelpIcon, useTooltip } from "@pancakeswap/uikit";
import styled from "styled-components";
import { useTranslation } from "@pancakeswap/localization";
import { Address } from "config/constants/types";
import { getBlockExploreLink } from "utils";
import { getAddress } from "utils/addressHelpers";

interface HeaderFooterProps {
    depositFee: string
    depositDescription:any,
    poolContract:Address,
    chainId:number
}
const HeaderFooter: React.FC<HeaderFooterProps> = ({
    depositFee,
    depositDescription,
    poolContract,
    chainId
}) => {
    const { t } = useTranslation()
    function handleClick(){
        window.open(getBlockExploreLink(getAddress(poolContract, chainId), 'address', chainId))
    }
    const { targetRef, tooltip, tooltipVisible } = useTooltip(
        <Flex flexDirection="column">
            {depositDescription.map((item) => {
                return (
                    <Text>{item}</Text>
                )
            })}
        </Flex>,
        { placement: 'top-end', tooltipOffset: [20, 10] },
    )
    return (
        <ContainerHeaer>
            <Flex style={{gap:"20px"}}>
                <Text>{t("Withdraw Fee")}:</Text>
                <Flex alignItems="center">
                    <Text>{depositFee}</Text>
                    <ReferenceElement ref={targetRef}>
                        <HelpIcon color="text" />
                    </ReferenceElement> 
                    {tooltipVisible && tooltip}
                </Flex>
            </Flex>
            <CustomLinkExternal onClick={handleClick}>
                <Text>View Contract</Text>
                <OpenNewIcon/>
            </CustomLinkExternal>
        </ContainerHeaer>
    )
}
export default HeaderFooter

const ContainerHeaer = styled(Flex)`
    width: 30%;
    flex-direction:column;
    justify-content: center;
    align-items: start;
    height:100%;
    gap:20px;
    @media screen and (min-width: 600px) and (max-width: 1000px) {
        width:50%;
        height:100px;
    }
    @media screen and (max-width: 600px) {
        width:100%;
        height:100px;
    }
`
const CustomLinkExternal = styled.div`
    width: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap:10px;
    cursor: pointer;
    ${Text}{
            color:${({ theme }) => theme.colors.secondary};
            font-weight:bold;
        }
        > svg {
            fill:${({ theme }) => theme.colors.secondary};
        }
`
const ReferenceElement = styled.div`
  display: inline-block;
  align-items:baseline;
  margin-left:5px; 
  cursor: pointer;
`