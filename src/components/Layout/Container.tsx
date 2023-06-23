import { Box, BoxProps } from '@pancakeswap/uikit'
import styled from 'styled-components'

const Container: React.FC<React.PropsWithChildren<BoxProps>> = ({ children, ...props }) => (
  <CsBox px={['16px', '10px']} paddingBottom="1.5rem" mx="auto" maxWidth="1150px"  {...props}>
    {children}
  </CsBox>
)

export default Container

const CsBox = styled(Box)`
  @media screen and (min-width: 821px) and (max-width: 1024px) {
    padding: 0px 20px 0px 20px !important;
  }
`