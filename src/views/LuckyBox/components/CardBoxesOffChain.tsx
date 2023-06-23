import { Button, Flex,  Text } from '@pancakeswap/uikit';
import React from 'react';
import styled from 'styled-components';
import { renderBGCard } from "utils/renderBGCard"

interface PropsCard{
    ID?: number;
    boxName?:string 
    boxImages?:string
    nftType?:string,
    efficiency:number
    luck:number
    comfy:number
    sturdence:number
}

const CardBoxesOffChain:React.FC<PropsCard> = ({
    ID,
    boxName,
    boxImages,
    nftType,
    efficiency,
    luck,
    comfy,
    sturdence
}) => {
    return (
        <Container>
            <Flex width="100%" flexDirection="column">
                <CustomCard background={renderBGCard(nftType)}>
                    <ImgShoes src={boxImages} alt='Image Box'/>
                </CustomCard>
                <Flex marginTop="10px" width="100%" justifyContent="space-between" alignItems="center" >
                    <ContainerTags background={renderBGCard(nftType)}>
                        <Text>{boxName}</Text>
                    </ContainerTags>
                </Flex>
            </Flex>

        </Container>
    );
};

export default CardBoxesOffChain;

const Container = styled.div<{isHaving?:boolean, background?:string}>`
    width: 348px;
    height: auto;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const CustomCard = styled.div<{background?:string}>`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 280px;
    background:${({ background }) => background};
    border-radius: 8px;
    position: relative;
`
const ImgShoes = styled.img`
    width: auto;
    height: auto;
`
const CustomButton = styled(Button)`
    margin-top: 1rem;
    border-radius:90px;
`
const DelistButton = styled(Button)<{isDisable:boolean}>`
  background: ${({ theme }) => theme.colors.primaryBright};
  margin-top:1rem;
  border-radius: 90px;
  color:#fff;
  > svg {
      stroke: #fff;
  }
`
const EditButton = styled(Button)<{isDisable:boolean}>`
    color:#fff;
    > svg {
        stroke: #fff;
    }
`
const CustomId = styled(Flex)`
    background: rgba(48, 179, 140, 0.25);
    border-radius: 6px;
    width: 61px;
    height: 32px;
    padding:0px 10px 0px 10px;
    justify-content: center;
    align-items: center;
`
const ContainerBoxName = styled(Flex)`
    width: 175px;
    height: 32px;
    border: 2px solid rgba(48, 179, 140, 0.25);
    border-radius: 8px;
    justify-content: center;
    align-items: center;
`
const Tags = styled.img`
    height: 40px;
    width: 40px;
    border-radius:50%;
    overflow:hidden;
    position: absolute;
    top:10px;
    right:10px;
`
const ButtonTransfer = styled(Button)`
    height: 48px;
    margin-top:1rem;
    border: 2px solid #E6E8EC;
    box-shadow:none;
    border-radius:90px;
    background:transparent;
    color: #000;
`
const ContainerTags = styled(Flex)<{background?:string}>`
    background: ${({ background }) => background};
    border-radius: 6px;
    width: 100%;
    height: auto;
    justify-content: start;
    padding:6px 0px 6px 10px;
    align-items: center;
    margin-bottom:10px;
    ${Text}{
        font-size:16px;
        font-weight:bold;
    }
`