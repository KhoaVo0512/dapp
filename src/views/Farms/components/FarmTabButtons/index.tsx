import { useTranslation } from '@pancakeswap/localization'
import Select, { OptionProps } from 'components/Select/SelectV2'
import { useRouter } from 'next/router'
import styled from 'styled-components'


interface FarmTabButtonsProps {
  hasStakeInFinishedFarms: boolean
}

const FarmTabButtons: React.FC<React.PropsWithChildren<FarmTabButtonsProps>> = ({ hasStakeInFinishedFarms }) => {
  const router = useRouter()
  const { t } = useTranslation()

  const handleStakeInFinishedOptionChange = (option: OptionProps): void => {
    if(option.value === false){
      router.push('/farms')
    }
    if(option.value){
      router.push('/farms/history')
    }
  }

  let activeIndex
  switch (router.pathname) {
    case '/farms':
      activeIndex = 0
      break
    case '/farms/history':
      activeIndex = 1
      break
    case '/_mp/farms/history':
      activeIndex = 1
      break
    case '/farms/archived':
      activeIndex = 2
      break
    default:
      activeIndex = 0
      break
  }

  return (
    <Wrapper>
      <Select
          options={[
              {
                  label: t('Live'),
                  value: false,
              },
              {
                  label: t('Finished'),
                  value: true,
              }
          ]}
          onChange={handleStakeInFinishedOptionChange}
            />
    </Wrapper>
  )
}

export default FarmTabButtons

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    padding-left: 12px;
    padding-right: 12px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 16px;
  }
  @media only screen and (max-width: 600px){
      width:100%;
  }
`