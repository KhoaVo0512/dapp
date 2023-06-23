import { useTranslation } from '@pancakeswap/localization'
import { Box, ExpandableLabel, Flex, Text } from '@pancakeswap/uikit'
import { useState } from 'react'
import styled from 'styled-components'

const Footer = styled(Flex)`
  width: 100%;
  background: ${({ theme }) => theme.colors.dropdown};
`

const BulletList = styled.ul`
  list-style-type: none;
  margin-top: 16px;
  padding: 0;
  li {
    margin: 0;
    padding: 0;
  }
  li::before {
    content: '•';
    margin-right: 4px;
    color: ${({ theme }) => theme.colors.text};
  }
  li::marker {
    font-size: 12px;
  }
`

interface RoiCalculatorFooterProps {
  isFarm: boolean
  apr?: number
  apy?: number
  displayApr: string
  autoCompoundFrequency: number
  multiplier: string
  linkLabel: string
  linkHref: string
  performanceFee: number
}

const RoiCalculatorFooter: React.FC<React.PropsWithChildren<RoiCalculatorFooterProps>> = ({
  isFarm,
  performanceFee,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { t } = useTranslation()
  return (
    <Footer p="16px" flexDirection="column">
      <ExpandableLabel expanded={isExpanded} onClick={() => setIsExpanded((prev) => !prev)}>
        <Text color="text" bold>
          {isExpanded ? t('Hide') : t('Details')}
        </Text>
      </ExpandableLabel>
      {isExpanded && (
        <Box px="8px">
          <BulletList>
            <li>
              <Text fontSize="12px" textAlign="center" color="text" display="inline" lineHeight={1.1}>
                {t('Calculated based on current rates.')}
              </Text>
            </li>
            {isFarm && (
              <li>
                <Text fontSize="12px" textAlign="center" color="text" display="inline">
                  {t('LP rewards: 0.17% trading fees, distributed proportionally among LP token holders.')}
                </Text>
              </li>
            )}
            <li>
              <Text fontSize="12px" textAlign="center" color="text" display="inline" lineHeight={1.1}>
                {t(
                  'All figures are estimates provided for your convenience only, and by no means represent guaranteed returns.',
                )}
              </Text>
            </li>
            {performanceFee > 0 && (
              <li>
                <Text mt="14px" fontSize="12px" textAlign="center" color="text" display="inline">
                  {t('All estimated rates take into account this pool’s %fee%% performance fee', {
                    fee: performanceFee,
                  })}
                </Text>
              </li>
            )}
          </BulletList>
        </Box>
      )}
    </Footer>
  )
}

export default RoiCalculatorFooter
