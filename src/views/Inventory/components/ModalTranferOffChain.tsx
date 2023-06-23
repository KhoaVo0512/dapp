import React, { useState, useMemo, useEffect } from 'react'
import styled from 'styled-components'
import { Modal, Button, Text, Flex, AutoRenewIcon } from '@pancakeswap/uikit'
import { GetBoxName } from 'hooks/useGetBoxName'
import { TRANSFER_FEE } from 'config'
import tokens from 'config/constants/tokens'
import { GetUser } from 'state/account'
import { useDispatch } from 'react-redux'
import { AppDispatch } from "state/index"
import { Decrypts } from 'config/api/decrypts'
import { fetchBalance } from "state/marketplace/actions"
import { renderBGCard, renderImgBox } from 'utils/renderBGCard'
import { useTranslation } from '@pancakeswap/localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { renderNftRunBoxByChain, renderTokenRunByChain } from 'hooks/useRenderTokenByChain'
import { FetchApproveContractTransfer, FetchApproveFee, FetchBalanceFee } from 'state/inventory/hook/fetchData'
import { useApproveContractTransfer } from 'state/inventory/hook/useApproveTransfer'
import { useApproveFee } from 'state/inventory/hook/useApproveFee'
import { useTransfertoOffChain } from 'state/inventory/hook/useWithdraw'
import { fetchBalanceNft } from 'state/marketplace/hook/fetchDataMarketPlace'

interface Props {
  onDismiss?: () => void
  nftId?: number
  boxType?: number
}

const ModalTransferToOffChain: React.FC<Props> = ({ onDismiss, nftId, boxType }) => {
    const { t } = useTranslation()
    const { account, chainId } = useActiveWeb3React()
    const tokenRunAddress = renderTokenRunByChain(chainId)
    const nftRunBoxAddress = renderNftRunBoxByChain(chainId);
    const { balanceFee } = FetchBalanceFee(tokenRunAddress, chainId)
    const token = Decrypts();
    const [ user ] = GetUser(true)
    const isAddress = account?.toLowerCase() === user?.address?.toLowerCase()
    const { boxName } = GetBoxName(boxType.toString())
    const { handleApprovedTransfer, requestedApprovalForAll, pendingForAll } = useApproveContractTransfer(nftRunBoxAddress, chainId)
    const { handleApproveFee, requestedApproFee, pendingFee } = useApproveFee(tokenRunAddress, chainId)
    const { allowance } = FetchApproveContractTransfer(requestedApprovalForAll, nftRunBoxAddress, chainId)
    const { isApproveFee } = FetchApproveFee(requestedApproFee, tokenRunAddress, chainId)
    const [ refresh, setRefresh ] = useState(0)
    function onRefresh(newValue){
      setRefresh(newValue)
    }
    const { handleTransferToOffChain, requested, pendingTx, isClose } = useTransfertoOffChain(nftId, onRefresh, chainId)

    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getUpdate = async () => {
            try {
                const result = await fetchBalanceNft(nftRunBoxAddress, account, chainId)
                dispatch(fetchBalance(result))
            } catch (e) {
                console.log(e)
            }
        }
        getUpdate()
    }, [refresh, account, dispatch, chainId, nftRunBoxAddress])
  return (
    <CustomModal title="Transfer to Off-chain" onDismiss={onDismiss} maxWidth="550px" minWidth="370px">
      {isClose === false ? (
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
            <Flex width="100%" mt="10px">
                <Text>{t("Fee for transfer box OnChain to OffChain includes gas fee + 10 RUN")}</Text>
            </Flex>
            { isApproveFee === 0 ?
                <CustomButton
                    disabled={pendingFee || !isAddress}
                    endIcon={pendingFee ? <AutoRenewIcon spin color="textDisable" /> : null}
                    onClick={handleApproveFee}
                >
                    Approve Fee
                </CustomButton>
            :
                <>
                    { allowance === false ?
                        <CustomButton
                            disabled={pendingForAll}
                            endIcon={pendingForAll ? <AutoRenewIcon spin color="textDisable" /> : null}
                            onClick={handleApprovedTransfer}
                        >
                            Approve Transfer
                        </CustomButton>
                    :
                        <CustomButton
                            disabled={pendingTx || TRANSFER_FEE > balanceFee || !isAddress }
                            endIcon={pendingTx ? <AutoRenewIcon spin color="textDisable" /> : null}
                            onClick={handleTransferToOffChain}
                        >
                            { TRANSFER_FEE > balanceFee ?
                                t('Insufficient %symbol% balance', { symbol: tokens.Run.symbol })
                            :
                                t("Confirm")
                            }
                        </CustomButton>
                    }
                </>
            } 
            { (!isAddress && token) &&
                <Text color="failure" mt="1rem">
                    {t("The current user wallet address is not the same as the connect wallet address.")}
                </Text>
            }
            { !token &&
                <Text  mt="1rem" color="failure">{t("Please sign-in")}</Text>
            }       
        </WrapBodyNft>
      ) : (
        <WrapBody>
          <Flex width="100%" height="250px" justifyContent="center" alignItems="center" flexDirection="column">
            <Heading>{t("Complete")}</Heading>
            <Text width="100%" textAlign="center" mt="1.5rem">{t('You successfully tranfer boxes to off chain')}</Text>
            <CustomButton width="100%" mt="1.5rem" onClick={onDismiss}>
              Close
            </CustomButton>
          </Flex>
        </WrapBody>
      )}
    </CustomModal>
  )
}

export default ModalTransferToOffChain

const CustomModal = styled(Modal)`
  padding: 20px 0px;
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

    & > div {
    }
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
const Image = styled.img`
  width: 80%;
  height: auto;
`