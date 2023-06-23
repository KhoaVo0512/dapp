import { useTranslation } from '@pancakeswap/localization';
import { AutoRenewIcon, Button, CopyIcon, Flex, LinkExternal, Text } from '@pancakeswap/uikit';
import BigNumber from 'bignumber.js';
import ConnectWalletButton from 'components/ConnectWalletButton';
import contracts from 'config/constants/contracts';
import tokens from 'config/constants/tokens';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { GetBoxName } from 'hooks/useGetBoxName';
import { renderTokenRunByChain } from 'hooks/useRenderTokenByChain';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { bscTokens } from '@pancakeswap/tokens';
import { usePriceRunBusd } from 'state/farms/hooks';
import styled from 'styled-components';
import { getExploreLinkWithAddress } from 'utils';
import { renderBGCard, renderImgBox } from "utils/renderBGCard";
import useRefresh from 'hooks/useRefresh';
import Header from './components/Header';
import { FetchDataUser, GetSimpleSellItem } from './hook/fetchData';
import { useApprove } from './hook/useApprove';
import { useBuy } from './hook/useBuy';
import { CustomPage } from './styles';
 
interface Props {
    saleIdItems: string | string[]
}

const BuyPage: React.FC<Props> = ({saleIdItems}) => {
    const { t } = useTranslation()
    const { slowRefresh } = useRefresh()
    const { account, chainId } = useActiveWeb3React()
    const tokenAddress = renderTokenRunByChain(chainId)
    const [ refresh, setRefresh ] = useState(0)
    function onRefresh(newValue:number){
        setRefresh(newValue)
    }
    const { handleBuy, requestedBuy, pendingBuy, isClose } = useBuy(saleIdItems, chainId, onRefresh)
    const { sellItems } = GetSimpleSellItem(chainId, saleIdItems, refresh)
    const { handleApprove, requestedApproval, pendingTx } = useApprove(chainId, tokenAddress)
    const converPrice = sellItems.length !== 0 ? new BigNumber(sellItems[0].priceListing.toString()).dividedBy(1e18).toString() : "0"
    const converNftId = sellItems.length !== 0 ? sellItems[0].nftId.toString() : "0"
    const nftAddress = sellItems.length !== 0 ? sellItems[0].nft : ""
    const checkIsSold = sellItems.length !== 0 ? sellItems[0].isSold : true
    const { dataBalance } = FetchDataUser(requestedApproval, chainId, tokenAddress, account)
    const linkBscScan = getExploreLinkWithAddress(chainId)
    const runBusdPrice = usePriceRunBusd().toNumber()

    const getSeller = sellItems.length !== 0 ? sellItems[0].seller : ""
    const getBoxType = sellItems.length !== 0 ?  sellItems[0].boxType.toString() : "0"

    const { boxName } = GetBoxName(getBoxType.toString())

    const [isOpenTooltipSeller, setOpenTooltipSeller] = useState(false);
    const [isOpenTooltipContract, setOpenTooltipContract ] = useState(false);
    const handleCopy = (value, type) => {
        navigator.clipboard.writeText(value);
            if ( type === "account"){
                setOpenTooltipSeller(!false);
                setTimeout(() => {
                    setOpenTooltipSeller(false);
                }, 3000);
            } if ( type === "contract") {
                setOpenTooltipContract(!false);
                setTimeout(() => {
                    setOpenTooltipContract(false);
                }, 3000);
            }
    }
    function sAccount (dataAddress) {
        if ( dataAddress ) {
            return `${dataAddress.substring(0, 4)}...${dataAddress.substring(dataAddress.length - 4)}`
        }
        return ""
    }
    const totalPriceBUSD = Number((new BigNumber(converPrice).multipliedBy(new BigNumber(runBusdPrice))).toString()) 
    const sellerLinkBsc = `${linkBscScan}${getSeller}`
    const contractLinkBsc = `${linkBscScan}${nftAddress}`
    const checkInsufficient = new BigNumber(converPrice).isGreaterThan(new BigNumber(dataBalance.balanceOf))    
    return (
        <CustomPage>
            <Container>
                <Header/>
                <Wrapper>
                    <PageBox>
                        <TableBox background={renderBGCard(parseInt(getBoxType.toString()))}>
                            { Number(getBoxType) !== 0 &&
                                <ImgShoes src={renderImgBox(getBoxType.toString())} alt='Image Box'/>
                            }
                        </TableBox>
                    </PageBox>
                    <PageInformation>
                        <TableInformation>
                            <Flex flexDirection="column">
                                <Text bold color="text" fontSize='30px'>{t("Run Together Box NFT")}</Text>
                                { boxName && 
                                    <Text fontWeight={700} color="text" fontSize='26px'>{boxName} - #{converNftId}</Text>
                                }
                            </Flex>
                            <Flex marginTop="1rem">
                                <Text mr="10px" bold fontSize="20px">{Number(converPrice).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                                <img src="/images/coins/0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7.png" alt="logo runtogether" style={{width:"30px", height:"30px"}}/>
                                <TextCustom  ml="6px">~${
                                    totalPriceBUSD.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                                }</TextCustom> 
                            </Flex>
                            <Flex width="100%" marginTop="1rem" alignItems="center" justifyContent="space-between">
                                <Text bold fontSize="18px">{t("Seller")}</Text>
                                <Flex style={{position:"relative"}}>
                                    <Text ml="1rem" mr="10px" bold fontSize="18px">{sAccount(getSeller)}</Text>
                                    <CopyIcon style={{cursor:"pointer", fill: "#6C5DD3"}} onClick={()=>handleCopy(getSeller, "account")}/>
                                    <StyledLinkExternal href={sellerLinkBsc} external />
                                    <Tooltip isTooltipDisplayed={isOpenTooltipSeller}>Copied</Tooltip>
                                </Flex>
                            </Flex>    
                            <Flex width="100%" marginTop="1rem" alignItems="center" justifyContent="space-between">
                                <Text bold fontSize="18px">{t("Contract")}</Text>
                                <Flex style={{position:"relative"}}>
                                    <Text ml="1rem" mr="10px" bold fontSize="18px">{sAccount(nftAddress)}</Text>
                                    <CopyIcon style={{cursor:"pointer", fill: "#6C5DD3"}} onClick={()=>handleCopy(nftAddress, "contract")}/>
                                    <StyledLinkExternal href={contractLinkBsc} external />
                                    <Tooltip isTooltipDisplayed={isOpenTooltipContract}>Copied</Tooltip>
                                </Flex>
                            </Flex>
                            <Flex width="100%" marginTop="1rem" alignItems="center" justifyContent="space-between">
                                <Text bold fontSize="18px">{t("Token ID")}</Text>
                                { Number(converNftId) !== 0 &&
                                    <CustomId>
                                        <Text bold>#{converNftId}</Text>
                                    </CustomId>
                                }
                            </Flex>     
                            { isClose === false ?
                                <Flex mt="1rem">
                                    { sellItems[0]?.isSold === false ?
                                        <>
                                            { account ? 
                                                <>
                                                    { dataBalance.isApprove !== 0 ?
                                                        <>
                                                            { checkInsufficient ?
                                                                <CustomButtonBuy disabled  width="300px">
                                                                    {t("Insufficient %symbol% balance", { symbol:tokens.Run.symbol})}
                                                                </CustomButtonBuy>
                                                            :
                                                                <CustomButtonBuy
                                                                    width="300px"
                                                                    onClick={handleBuy}
                                                                    disabled={pendingBuy}
                                                                    endIcon={pendingBuy ? <AutoRenewIcon spin color="textDisable" /> : null}
                                                                >
                                                                    {t("Buy Now")}
                                                                </CustomButtonBuy>
                                                            }
                                                        </>
                                                        
                                                    :
                                                        <CustomButtonBuy
                                                            onClick={handleApprove}
                                                            disabled={pendingTx}
                                                            endIcon={pendingTx ? <AutoRenewIcon spin color="textDisable" /> : null}
                                                            width="300px"
                                                        >
                                                            {t("Approve")}
                                                        </CustomButtonBuy>
                                                    }
                                                </>
                                            :
                                                <CustonButtonConnect/>
                                            }
                                        </>
                                    :
                                        <CustomButtonBuy
                                            disabled
                                            mt="1rem"
                                        >
                                            {t("Sold")}
                                        </CustomButtonBuy>
                                    }
                                </Flex>
                            :
                                <CustomButtonBuy
                                    disabled
                                    mt="1rem"
                                >
                                    {t("Sold")}
                                </CustomButtonBuy>
                            }
                        </TableInformation>
                    </PageInformation>
                </Wrapper>
                
            </Container>
        </CustomPage>
        
    );
};

export default BuyPage;


const TextCustom = styled(Text)`
  font-size:13px;
  margin-top:7px;
  @media only screen and (max-width: 500px) {
    font-size:13px;
  }
`

const Wrapper = styled(Flex)`
    width:100%;
    flex-direction: row;
    @media screen and (max-width: 768px) {
        flex-direction:column-reverse;
    }
`
const Container = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    max-width: 1320px;
    flex-direction:column;
    padding-top:2rem;
    @media screen and (max-width: 600px) {
    flex-direction: column;
    width: 100%;
    padding:0!important;
}
    @media screen and (min-width: 601px) and (max-width: 768px) {
    flex-direction: column;

}
`
const PageBox = styled.div`
    width: 50%;
    height: auto;
    padding: 0 3rem;
    @media screen and (max-width: 600px) {
    width: 100%;
    margin-left: 0;
    padding: 15px;
    }
    @media screen and (min-width: 601px) and (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    margin-top:1rem;
    }
    @media screen and (min-width: 769px) and (max-width: 1080px) {
        width: 50%;
        margin-left: 0;
        padding-top: 0rem;
        margin-top:0rem;
    }
`
const PageInformation = styled.div`
    width: 50%;
    height: auto;
    padding: 0 3rem;
    @media screen and (max-width: 600px) {
        width: 100%;
        padding: 15px;
    }
    @media screen and (min-width: 601px) and (max-width: 768px) {
        width: 100%;
    }
`
const TableBox = styled.div<{background:string}>`
    background:${({ background }) => background};
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border-radius: 10px;
    @media screen and (max-width: 600px) {
        width: 100%;
        margin-top:1rem;
    }
    @media screen and (min-width: 601px) and (max-width: 768px) {
        width: 100%;
    }
`
const ImgShoes = styled.img`
    width: 80%;
    height: auto;
    @media screen and (max-width: 600px) {
   
}
    @media screen and (min-width: 601px) and (max-width: 768px) {

}
`
const TableInformation = styled.div`
    height: 100%;
    display: flex;
    flex-direction:column;
    justify-content: center;
    @media screen and (max-width: 600px) {
        width: 100%;
    }
    @media screen and (min-width: 601px) and (max-width: 768px) {
        width: 100%;
    }
`
const CustomButtonBuy = styled(Button)`
  text-transform:uppercase;
  font-weight:bold;
  border-radius:90px;
  width:100%;
  box-shadow:none;
`
const CustonButtonConnect = styled(ConnectWalletButton)`
    text-transform:uppercase;
    font-weight:bold;
    border-radius:90px;
    width:100%;
    height: 54px;
    background: #FF592C;
    box-shadow:none;
    color:#fff;
`
const Tooltip = styled.div<{ isTooltipDisplayed: boolean }>`
  display: ${({ isTooltipDisplayed }) => (isTooltipDisplayed ? 'inline-block' : 'none')};
  position: absolute;
  padding: 8px;
  top: -35px;
  right: -15px;
  text-align: center;
  background-color: #fff;
  color: #000;
  border-radius: 16px;
  width: 100px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
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

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 600;
  justify-content: center;
  color: #6C5DD3;
  > svg{
    fill: #6C5DD3;
  }
  :hover{
    color: #9127ee !important;
    font-weight: 800;
    > svg {
    color: #9127ee !important;
      fill: #9127ee ;
    }
  }

`