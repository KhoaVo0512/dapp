import { Button, Flex, InputGroup, Text } from "@pancakeswap/uikit";
import styled from "styled-components";


export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -18px;
  flex-direction: column;
  max-width: 1200px;
  @media screen and (max-width: 1024px) {
    padding: 0 50px; 
  }
  @media screen and (max-width: 600px) {
    padding: 0 16px;    
  }
`
export const CustomContainer = styled.div`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  max-width: 1140px;
  @media (max-width: 600px) {
    width: 100%;
  }
`

export const Wrapper = styled.div`
  position: relative;
  padding: 0px 2rem 2rem 2rem;
  border-radius: 20px;
  box-shadow: 0px 10px 14px -48px rgb(31 47 70 / 12%);
  background: ${({ theme }) => theme.colors.background};

  @media screen and (max-width: 1024px) {
    padding: 2rem 30px;
  }

  @media screen and (max-width: 600px) {
    padding: 1rem 0px;    
  }
`
export const Row = styled.div`
  width: 100%;
  display: flex;
  @media (max-width: 600px) {
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
  }
`
export const CustomColBorder = styled.div`
  width: 100%;
  margin: 20px 0;
  @media (max-width: 600px) {
    display: none;
  }
`
export const Divider = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.cardBorder};
  height: 1px;
  @media (max-width: 600px) {
    margin: 0 !important;
  }
`

export const WrapAppBody = styled.div`
  position: relative;
  /* max-width: 600px; */
  width: 100%;
  z-index: 5;
  background: ${({ theme }) => theme.colors.background};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  margin-bottom: 30px;
  box-shadow: 0px 54px 54px -48px rgba(31, 47, 70, 0.12);
  @media only screen and (max-width: 600px) {
    margin-left: 16px;
    margin-right: 16px;
    width: 98%;
    /* padding: 0px; */
  }
`

export const ViewControls = styled(Flex)`
width: 50%;
height: 70px;
align-items: center;
justify-content: space-between;
flex-wrap:wrap;
@media screen and (min-width: 769px) and (max-width: 1080px) {
    height: auto;
    width: 55%;
}
@media screen and (min-width: 601px) and (max-width: 768px) {
    height: auto;
    width: 100%;
}
@media screen and (max-width: 768px) {
    height: auto;
}

@media screen and (max-width: 600px) {
    height: auto;
    flex-direction: column-reverse;
    width: 100%;
}
`

export const IconButton = styled(Button)<{isActive?:boolean}>`
    height: 50px;
    width: 50px;
    border-radius: 10px;
    background: ${({ isActive, theme }) => isActive ? theme.colors.primaryBright : "transparent" };
    box-shadow:none;
    border:2px solid ${({ isActive, theme }) => isActive ? "none" : theme.colors.cardBorder };
`

export const CustomInputGroup = styled(InputGroup)`
    width: 305px;
    height: 48px;
    border: 2px solid ${({ theme }) => theme.colors.cardBorder};
    border-radius:12px;
    background: transparent !important;
    > input {
        background: transparent !important;
        border: none;
        height: 48px;
    }
    @media screen and (max-width: 768px) {
        width: 100%;
    }
`

export const TextCard = styled(Text)`
  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`

export const ActionContent = styled(Flex)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

ActionContent.defaultProps = {
  mt: '8px',
}
