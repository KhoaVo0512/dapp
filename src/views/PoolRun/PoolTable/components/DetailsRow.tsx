import React from "react";
import { Text,Flex, ChevronUpIcon, ChevronDownIcon } from "@pancakeswap/uikit";
import styled from "styled-components";
import { useTranslation } from "@pancakeswap/localization";

interface DetalisPorps {
    expanded: boolean
    onExpanded:(newValue) => void
}

const DetailsRow: React.FC<DetalisPorps> = ({onExpanded, expanded}) => {
    const { t } = useTranslation()
    return (
        <ContainerEndsIn>
            <Flex width="100%" justifyContent="center">
                <CustomButton onClick={() => onExpanded(!expanded)}>
                    {expanded ? <CsText>{t('Hide')}</CsText> : <CsText>{t('Details')}</CsText>}
                    {expanded ? <ChevronUpIcon/> : <ChevronDownIcon/>}
                </CustomButton>
            </Flex>
        </ContainerEndsIn>
    )
}

export default DetailsRow

const ContainerEndsIn = styled(Flex)`
    width:15%;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    height:70px;
    @media screen and (min-width: 601px) and (max-width: 1000px) {
        width:50%;
    }
    @media screen and (max-width: 600px) {
        width:100%;
    }
`
const CustomButton = styled.div`
    width:auto;
    gap:15px;
    color:${({ theme }) => theme.colors.text};
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    font-weight:600;
`
const CsText = styled(Text)`
    color: black;
    font-weight: bold;
`