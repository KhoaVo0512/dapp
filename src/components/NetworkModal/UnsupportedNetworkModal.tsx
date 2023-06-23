import { Button, Grid, Message, MessageText, Modal, ModalTitle, Text, Heading } from '@pancakeswap/uikit'
import { useLocalNetworkChain, useActiveChainId } from 'hooks/useActiveChainId'
import { useTranslation } from '@pancakeswap/localization'
import { useSwitchNetwork, useSwitchNetworkLocal } from 'hooks/useSwitchNetwork'
import Image from 'next/image'
import useAuth from 'hooks/useAuth'
import { useMenuItems } from 'components/Menu/hooks/useMenuItems'
import { useRouter } from 'next/router'
import { getActiveMenuItem, getActiveSubMenuItem } from 'components/Menu/utils'
import { useAccount, useNetwork } from 'wagmi'
import { useMemo } from 'react'
import { ChainId } from '@pancakeswap/sdk'
import styled from 'styled-components'
import Dots from '../Loader/Dots'

const LIST_CHAINS = [
  {
    id: 1116,
    name: 'CORE Chain',
    testnet: false
  },
  {
    id: 56,
    name: 'BNB Smart Chain',
    testnet: false
  },
  {
    id: 10001,
    name: 'ETHW Chain',
    testnet: true
  },
  {
    id: 1975,
    name: 'ONUS Chain',
    testnet: true
  },
  {
    id: 1945,
    name: 'ONUS Testnet',
    testnet: true
  },
  {
    id: 97,
    name: 'BSC Testnet',
    testnet: true
  }
]

// Where chain is not supported or page not supported
export function UnsupportedNetworkModal({ pageSupportedChains }: { pageSupportedChains: number[] }) {
  const { switchNetworkAsync, isLoading, canSwitch, pendingChainId } = useSwitchNetwork()
  const switchNetworkLocal = useSwitchNetworkLocal()
  const { isWrongNetwork, chain } = useActiveChainId()

  const { chains } = useNetwork()
  // const chainId = useLocalNetworkChain() || ChainId.BSC
  const chainId = useLocalNetworkChain()

  const foundChain = useMemo(() => (
    chains.length > 0 ? chains.find((c) => c.id === (chainId ?? chain?.id)) : ({
        id: chainId,
        name: LIST_CHAINS.find(e => e.id === (chainId ?? ChainId.BSC))?.name
    })), [chainId]
  )

  const { isConnected } = useAccount()
  const { logout } = useAuth()
  const { t } = useTranslation()
  const menuItems = useMenuItems()
  const { pathname, push } = useRouter()
  const title = useMemo(() => {
    const activeMenuItem = getActiveMenuItem({ menuConfig: menuItems, pathname })
    const activeSubMenuItem = getActiveSubMenuItem({ menuItem: activeMenuItem, pathname })
    return activeSubMenuItem?.label || activeMenuItem?.label
  }, [menuItems, pathname])

  const supportedMainnetChains = useMemo(
    () => chains.length > 0 ? chains.filter((e) => !e.testnet && pageSupportedChains?.includes(e.id)) :
    LIST_CHAINS.filter((e) => !e.testnet && pageSupportedChains?.includes(e.id)),
    [chains, pageSupportedChains],
  )

  function handleClick(){
    logout().then(() => {
      // switchNetworkLocal(ChainId.BSC)
      if(pageSupportedChains.includes(ChainId.BSC))
      {
        switchNetworkLocal(ChainId.BSC)
      } else {
        switchNetworkLocal(ChainId.CORE)
      }
    })
  }

  function handlePush(){
    if ( chainId === ChainId.ONUS || chainId === ChainId.ETHW_MAINNET || chainId === ChainId.ONUS_TESTNET){
      // push('/mysterybox')
      push('/farms')
    } else {    
      push('/')
    }
  }

  function handleClickStayOn(){
    logout().then(() => {
      handlePush()
      switchNetworkLocal(foundChain?.id)
    })
  }

  return (
    <CsModal title={t('Check your network')} onDismiss={handleClick} headerBackground="gradientCardHeader">
      <Grid style={{ gap: '16px' }} maxWidth="336px">
        <Text>
          {t('Currently %feature% only supported in', { feature: typeof title === 'string' ? title : 'this page' })}{' '}
          {supportedMainnetChains?.map((c) => c.name).join(', ')}
        </Text>
        <Message variant="warning">
          <MessageText>{t('Please switch your network to continue.')}</MessageText>
        </Message>
        <Button
          variant='secondary'
           onClick={handleClickStayOn}
        >
          {t('Stay on %chain%' , { chain: foundChain?.name })}
        </Button>
        {canSwitch ? (
          <Button
            isLoading={isLoading}
            onClick={() => {
              if (supportedMainnetChains.map((c) => c.id).includes(chainId)) {
                  switchNetworkAsync(chainId)
              } else {
                // eslint-disable-next-line no-lonely-if
                if (!supportedMainnetChains.map((c) => c.id).includes(ChainId.CORE)) {
                  if(pendingChainId !== undefined && pendingChainId !== ChainId.CORE) {
                    switchNetworkAsync(ChainId.CORE)
                  }
                  else {
                    // eslint-disable-next-line no-lonely-if
                    if(isWrongNetwork) {
                      logout().then(() => {
                        switchNetworkLocal(pageSupportedChains.includes(chain?.id) ? chain?.id : ChainId.CORE)
                        // switchNetworkLocal(ChainId.ONUS)
                      })
                    }
                    else {
                      switchNetworkAsync(pageSupportedChains.includes(chain?.id) ? chain?.id : ChainId.CORE)
                      // switchNetworkAsync(ChainId.ONUS)
                    }                    
                  }
                } else {
                  // eslint-disable-next-line no-lonely-if
                  if(isWrongNetwork) {
                    logout().then(() => {
                      switchNetworkLocal(ChainId.CORE)
                    })
                  }
                  else {
                    switchNetworkAsync(ChainId.CORE)
                  }                   
                }
              }
            }}
          >
            {isLoading ? <Dots>{t('Switch network in wallet')}</Dots> : t('Switch network in wallet')}
          </Button>
        ) : (
          <Message variant="danger">
            <MessageText>{t('Unable to switch network. Please try it on your wallet')}</MessageText>
          </Message>
        )}
        {isConnected && (
          <Button
            variant="secondary"
            onClick={() =>
              logout().then(() => {
                switchNetworkLocal(ChainId.BSC)
              })
            }
          >
            {t('Disconnect Wallet')}
          </Button>
        )}
         {/* <Button
          variant='secondary'
           onClick={handleClickStayOn}
          >
            {t('Stay on %chain%' , { chain: foundChain?.name })}
          </Button> */}
      </Grid>
    </CsModal>
  )
}
const CsModal = styled(Modal)`
    ${ModalTitle}{
      @media screen and (max-width: 500px) {
        padding-top:30px;
      }
    }
    ${Heading}{
      font-weight:800;
      font-size:22px;
    }
    overflow-y:hidden;
`