import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Text, Flex, Button, AutoRenewIcon } from '@pancakeswap/uikit'
import tokens from 'config/constants/tokens'
import { renderBGCard, renderImgBox } from 'utils/renderBGCard'
import { GetBoxName } from 'hooks/useGetBoxName'
import { useTranslation } from '@pancakeswap/localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useDelist } from 'state/inventory/hook/useDelist'

interface Props {
  nftId?: number
  saleId?: number
  price?: number
  boxType?: any
  onDismiss?: () => void
  onRefresh?: (newValue) => void
}
const Delist: React.FC<Props> = ({ nftId, saleId, price, boxType, onDismiss, onRefresh }) => {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  const { boxName } = GetBoxName(boxType.toString())
  const { handleDelist, requestedDelist, pendingDelist, isClose } = useDelist(saleId, onRefresh, chainId)
  return (
    <WrapBody>
      <Flex width="100%" mb="10px" justifyContent="center">
          <Text fontSize='42px' lineHeight="56px" fontWeight={700}>{t("Delist")}</Text>
      </Flex>
      <ContainerBox background={renderBGCard(boxType)}>
        <img src={renderImgBox(boxType)} alt="images-box" />
      </ContainerBox>
      <Flex marginTop="10px" width="100%" justifyContent="space-between" alignItems="center">
        <Text bold fontSize="18px">
          {t('Running Shoes Box NFT')}
        </Text>
      </Flex>
      <Flex marginTop="10px" width="100%" justifyContent="space-between" alignItems="center">
        <CustomId>
          <Text bold>#{nftId}</Text>
        </CustomId>
        <ContainerBoxName>
          <Text color="#30B38C" bold>
            {boxName}
          </Text>
        </ContainerBoxName>
      </Flex>
      <Flex marginTop="10px" width="100%" justifyContent="space-between" alignItems="center">
        <Text bold fontSize="20px">
          {t('Price')}
        </Text>
        <Flex>
          <img
            src="/images/coins/0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7.png"
            style={{ width: '30px', height: '30px' }}
            alt="logo"
          />
          <Text color="text" fontSize="22px" bold ml="5px">
            {price.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {tokens.Run.symbol}
          </Text>
        </Flex>
      </Flex>
      {isClose === true ? (
        <Button mt="1rem" width="100%" onClick={onDismiss}>
          {t('Close')}
        </Button>
      ) : (
        <Button
          mt="1rem"
          width="100%"
          style={{borderRadius:"90px"}}
          onClick={handleDelist}
          disabled={pendingDelist}
          endIcon={pendingDelist ? <AutoRenewIcon spin color="textDisable" /> : null}
        >
          {t('Delist')}
        </Button>
      )}
    </WrapBody>
  )
}
export default Delist

const ContainerBox = styled.div<{ background: string }>`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 280px;
  background: ${({ background }) => background};
  border-radius: 20px;
  position: relative;
`
const CustomId = styled(Flex)`
  background: rgba(48, 179, 140, 0.25);
  border-radius: 6px;
  width: 61px;
  height: 32px;
  padding: 0px 10px 0px 10px;
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
const Tags = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  top: 10px;
  right: 10px;
`

const WrapBody = styled(Flex)`
  width: 370px; 
  padding: 0px;
  flex-direction: column;

  @media screen and (max-width: 600px) {
    width: 300px;
  }

  @media screen and (max-width: 320px) {
    width: 260px;
  }
`