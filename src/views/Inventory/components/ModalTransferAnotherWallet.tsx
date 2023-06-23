import { GetBoxName } from 'hooks/useGetBoxName'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
// import { Button, Flex, Input, Modal, Text } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { AutoRenewIcon, Button, Flex, Input, Modal, Text } from '@pancakeswap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTransferAnotherWallet } from 'state/inventory/hook/useSend'
import { renderBGCard, renderImgBox } from 'utils/renderBGCard'


interface Props {
  onDismiss?: () => void
  nftId?: number
  boxType?: number
}

const ModalTransferAnotherWallet: React.FC<Props> = ({ onDismiss, nftId, boxType }) => {

    const handleChangeAddress = (e) => {
      setTargetWallet(e.target.value);
    }

    const { t } = useTranslation()
    const { account, chainId } = useActiveWeb3React()
    const { boxName } = GetBoxName(boxType.toString())
    const [ refresh, setRefresh ] = useState(0)
    const [isValidWallet, setIsValidWallet] = useState(false);
    const [targetWallet, setTargetWallet] = useState('');

    function onRefresh(newValue){
      setRefresh(newValue)
    }
    const { handleTransferToAnotherWallet, requested, pendingTx, isClose } = useTransferAnotherWallet(account, targetWallet, nftId, onRefresh, onDismiss, chainId)
    useEffect(() => {
      if((targetWallet.match("^0x[a-fA-F0-9]{40}$") != null)) {        
        setIsValidWallet(true);
      }
      else {
        setIsValidWallet(false);
      }
    }, [targetWallet]);

  return (
    <CustomModal title="Transfer to another wallet" onDismiss={onDismiss} maxWidth="550px" minWidth="370px">
      {isClose === false ? 
          <WrapBodyNft>
              <ContainerBox background={renderBGCard(boxType)}>
                  <Image src={renderImgBox(boxType)} alt="images-box" />
              </ContainerBox>
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
              <Flex width="100%" flexDirection="column" mt="1rem">
                <Text>Target wallet address</Text>
                <CsInput
                    type="text"
                    placeholder='0xAdaBc...'
                    value={targetWallet}
                    onChange={handleChangeAddress}
                />
                {
                  (!isValidWallet) && (targetWallet !== '') && 
                  <div style={{color:'red',fontSize:'16px',paddingTop: '10px'}} >
                    Invalid address
                  </div>
                }
                {
                  (targetWallet === '') && 
                  <div style={{color:'red',fontSize:'16px',paddingTop: '10px'}} >
                    Address is not empty
                  </div>
                }
              </Flex>
              <Flex width="100%" mt="10px">
                  <Text bold>{t("You won't be able to take back the NFT after the transaction!")}</Text>
              </Flex>           
                <CustomButton
                    disabled={pendingTx || (targetWallet === '') || (!isValidWallet)}
                    endIcon={pendingTx ? <AutoRenewIcon spin color="textDisable" /> : null}
                    onClick={handleTransferToAnotherWallet}
                >
                    {    
                      t("Send")
                    }
                </CustomButton>
          </WrapBodyNft>
        : 
          <WrapBody>
            <Flex width="100%" height="250px" justifyContent="center" alignItems="center" flexDirection="column">
              <Heading>{t("Complete")}</Heading>
              <Text width="100%" textAlign="center" mt="1.5rem">{t('You successfully tranfer boxes to another wallet')}</Text>
              <CustomButton width="100%" mt="1.5rem" onClick={onDismiss}>
                Close
              </CustomButton>
            </Flex>
          </WrapBody>
        }
    </CustomModal>
  )
}

export default ModalTransferAnotherWallet

const CustomModal = styled(Modal)`
  padding: 20px 0px 20px 0px;
  /* width: 475px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1024px) {
  }
  @media only screen and (max-width: 600px) {
    width: 360px;
  }

  @media only screen and (max-width: 375px) {
    padding: 10px;
    width: 320px;
    min-width: 320px !important;
  }

  & > div {
    overflow-y: auto;
    /* padding: 24px 0px; */
    max-height: 90vh;
    &:-webkit-scrollbar {
      width: 6px;
      background-color: #f5f5f5;
    }
    &:-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #ef0c0c;
    }
  }
`


const CustomButton = styled(Button)`
  height: 48px;
  background: #ff592c;
  border-radius: 90px;
  box-shadow:none;
  margin-top:1rem;
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
const Heading = styled(Text)`
  font-weight: 700;
  font-size: 48px;
  line-height: 56px;
`
const WrapBodyNft = styled(Flex)`
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
const ContainerBox = styled.div<{ background: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  padding: 0;
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

const CsInput = styled(Input)`
  border: 2px solid #E7E7E1;
  border-radius: 15px;
  padding: 15px;
  font-size: 15px;
  background: none !important;
  height: 52px;
`
const Image = styled.img`
  width: 80%;
  height: auto;
`