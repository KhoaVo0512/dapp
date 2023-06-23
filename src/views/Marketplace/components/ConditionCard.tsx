import React from 'react';
import styled from 'styled-components';
import { useTranslation } from '@pancakeswap/localization' 
import { Flex, Text } from '@pancakeswap/uikit';
import Link from 'next/link';
import { renderBGCard, renderImgBox } from 'utils/renderBGCard';
import { useRouter } from 'next/router'
import { GetBoxName } from 'hooks/useGetBoxName';


interface PropsCard{
    nftId?:number, 
    saleId?:number,
    nftType?:number,
    price?:number,
    seller?:string,
    isStore:boolean,
    runBusdPrice?:number
}

const ConditionCard:React.FC<PropsCard> = ({
    nftId,
    saleId,
    nftType,
    price,
    seller,
    isStore,
    runBusdPrice
}) => {

    const router = useRouter()
    const { t } = useTranslation()
 
    const { boxName } = GetBoxName(nftType.toString())
    const sAccount = seller ? `${seller.substring(0, 4)}...${seller.substring(seller.length - 4)}` : '';
    
    function handleClick() {
        router.push(`/detailbuy/${saleId}`)
    }
    const link = `/detailbuy/${saleId}`
    return (
        <Container>
            <CustomCard backgroundColor={renderBGCard(nftType)}>
                <ImgShoes src={renderImgBox(nftType)} alt='Image Box'/>
            </CustomCard>
            <Flex width="100%" justifyContent="space-between" alignItems="center" >
                <Text>{t('Run Together Box NFT')}</Text>
            </Flex>
            <Flex width="100%" justifyContent="space-between" alignItems="center" >
                <CustomId>
                    <Text bold >#{nftId}</Text>
                </CustomId>
                <ContainerBoxName>
                    <Text bold color='#30B38C'>{boxName}</Text>
                </ContainerBoxName>
            </Flex>
            <Flex width="100%" justifyContent="space-between" mt="5px">
                <Text bold fontSize="18px">{t('Seller')}</Text>
                <Text bold mr="5px">{sAccount}</Text>
            </Flex>
            <Flex width="100%" justifyContent="space-between" mt="1px">
                <Text bold fontSize="18px">{t('Price')}</Text>
                <Row>
                    <Text bold mr="5px">{price.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                    <img src="/images/coins/0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7.png" alt="logo runtogether" style={{width:"30px", height:"30px"}}/>
                </Row>
            </Flex>
            <FlexCustom width="100%">
                <Row>
                    <TextCustom  mr="5px">~${
                        (price*runBusdPrice).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    }</TextCustom>                    
                </Row>
            </FlexCustom>
            <Link href={link} passHref>
                <CustomButton>
                   {t('Buy')}
                </CustomButton>
            </Link>
        </Container>
    );
};

export default ConditionCard;

const FlexCustom = styled(Flex)`
  width:100%;
  justify-content:flex-end;
`

const TextCustom = styled(Text)`
  font-size:13px;
  @media only screen and (max-width: 500px) {
    font-size:13px;
  }
`

const Container = styled.div`
    width: 348px;
    height: 550px;
    border-radius: 10px;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // cursor: pointer;
`
const CustomCard = styled.div<{backgroundColor:string}>`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 310px;
    background:${({ backgroundColor }) => backgroundColor};
    border-radius:8px;
    position: relative;
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
const ImgShoes = styled.img`
    width: auto;
    height: auto;
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
    width: 100px;
    height: 32px;
    border: 2px solid rgba(48, 179, 140, 0.25);
    border-radius: 8px;
    justify-content: center;
    align-items: center;
`
const Row = styled.div`
    display: flex;
    align-items: center;
`
const CustomButton = styled.button`
    width: 100%;
    height: 48px;
    border: 2px solid #E6E8EC;
    border-radius: 90px;
    font-weight:bold;
    font-size:18px;
    background-color: transparent;
    cursor: pointer;
    color: #000;
    &:hover{
        background-color: #FF592C;
        border: 2px solid #FF592C;
        transition-duration:0.5s;
        color:#fff;
    }
`