import styled from 'styled-components'
import { Text, Button, Input, InputProps, Flex, Link, Box } from '@pancakeswap/uikit'
import NumberFormat from 'react-number-format'
import { useTranslation } from '@pancakeswap/localization'
import { parseUnits } from '@ethersproject/units'
import { formatBigNumber } from 'utils/formatBalance'

interface ModalInputProps {
  max: string
  symbol: string
  onSelectMax?: () => void
  // onChange: (e: React.FormEvent<HTMLInputElement>) => void
  onChange?: (newValue?:string) => void
  placeholder?: string
  value: string
  addLiquidityUrl?: string
  inputTitle?: string
  decimals?: number
}

const StyledTokenInput = styled.div<InputProps>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.input};
  border-radius: 16px;
  box-shadow: ${({ theme, isWarning }) => (isWarning ? theme.colors.warning : theme.shadows.inset)};
  color: ${({ theme }) => theme.colors.text};
  padding: 12px 16px 12px 0;
  width: 100%;
`

const StyledInput = styled(Input)`
  box-shadow: none;
  width: 60px;
  margin: 0 8px;
  padding: 0 8px;
  border: none;

  ${({ theme }) => theme.mediaQueries.xs} {
    width: 80px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
  }
`

const StyledErrorMessage = styled(Text)`
  position: absolute;
  bottom: -22px;
  a {
    display: inline;
  }
`

const ModalInput: React.FC<React.PropsWithChildren<ModalInputProps>> = ({
  max,
  symbol,
  onChange,
  onSelectMax,
  value,
  addLiquidityUrl,
  inputTitle,
  decimals = 18,
}) => {
  const { t } = useTranslation()
  const isBalanceZero = max === '0' || !max

  const displayBalance = (balance: string) => {
    if (isBalanceZero) {
      return '0'
    }

    const balanceUnits = parseUnits(balance, decimals)
    return formatBigNumber(balanceUnits, decimals, decimals)
  }

  return (
    <div style={{ position: 'relative'}}>
      <StyledTokenInput isWarning={isBalanceZero}>
        <Flex justifyContent="space-between" pl="16px">
          <Text fontSize="14px">{inputTitle}</Text>
          <Text fontSize="14px">{t('Balance: %balance%', { balance: displayBalance(max) })}</Text>
        </Flex>
        <Flex alignItems="flex-end" justifyContent="space-around" mt="8px" flexWrap="wrap">
            <StyledBalanceInput>
                <CsBox>
                    <CsNumericFormat
                                value={value}
                                decimalScale={18}
                                thousandSeparator={!false}
                                placeholder="0.00"
                                // eslint-disable-next-line no-return-assign, no-param-reassign
                                onValueChange={(values) => {
                                  // eslint-disable-next-line @typescript-eslint/no-shadow
                                  const { value } = values;
                                  // eslint-disable-next-line @typescript-eslint/no-shadow
                                  onChange(value)    
                              }} 
                                maxLength={35}
                      />
                  </CsBox>
              </StyledBalanceInput>
          {/* <StyledInput
            pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
            inputMode="decimal"
            step="any"
            min="0"
            onChange={onChange}
            placeholder="0"
            value={value}
          /> */}
          <CsContainerButton>
              <CsButton scale="sm" onClick={onSelectMax} mr="8px">
                {t('Max')}
              </CsButton>
              <Text fontSize="16px">{symbol}</Text>
          </CsContainerButton>
          
        </Flex>
      </StyledTokenInput>
      {isBalanceZero && (
        <StyledErrorMessage fontSize="14px" color="failure">
          {t('No tokens to stake')}:{' '}
          <Link fontSize="14px" bold={false} href={addLiquidityUrl} external color="failure">
            {t('Get %symbol%', { symbol })}
          </Link>
        </StyledErrorMessage>
      )}
    </div>
  )
}

export default ModalInput


const StyledBalanceInput = styled(Box)`
    background-color: transparent;
    padding-left:12px;
    padding-right:8px;
    @media screen and (max-width:600px) {
      width: 100%;
    }
`;
const CsBox = styled(Box)`
     > input {
            background:transparent !important;
            border:none;
            box-shadow:none;
            color:${({ theme }) => theme.colors.text};
            font-size:16px;
            width: 100%;
            font-size:16px;
        }
`
const CsNumericFormat = styled(NumberFormat)`
    &:focus-visible {
        outline: none;
    }
    ::placeholder { 
        color:${({ theme }) => theme.colors.text};
        opacity: 1; 
    }
`
const CsContainerButton = styled(Flex)`
    align-items:center;
    @media screen and (max-width:600px) {
      width: 100%;
      flex-direction:row;
      padding-left: 12px;
      gap:10px;
      margin-top:6px;
    }

`
const CsButton = styled(Button)`
     @media screen and (max-width:600px) {
      width:100px;
     }

`