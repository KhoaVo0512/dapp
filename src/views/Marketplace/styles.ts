import { Flex, InputGroup, Text } from "@pancakeswap/uikit";
import Page from "components/Layout/Page";
import styled from "styled-components";


export const CustomPage = styled(Page)`
  @media only screen and (max-width: 1350px) {
    padding-left: 20px;
    padding-right: 20px;
  }
  @media only screen and (max-width: 600px) {
    padding-left: 12px;
    padding-right: 12px;
  }
`
export const Container = styled.div`
`
export const CustomInputGroup = styled(InputGroup)`
  width: 231px;
  border-radius: 5px;
  height: 100%;
  @media only screen and (max-width: 600px) {
    width: 200px;
  }
`
export const CustomFlex = styled(Flex)`
  .pagination {
    display: flex;
    flex-direction: row;
    width: 340px;
    justify-content: space-around;
    align-items: center;
    * {
      list-style-type: none;
    }
  }
  .page-link {
    background: ${({ theme }) => theme.colors.tertiary};
    padding: 12px;
    border-radius: 5px !important;
    border: none !important;
    color: ${({ theme }) => theme.colors.text};
    &:focus {
      box-shadow: none !important;
    }
    &:hover {
      background: ${({ theme }) => theme.colors.backgroundTab};
    }
  }
  .page-item.disabled .page-link {
    background: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed !important;
    opacity: 0.7;
    pointer-events: none;
  }
  .page-item.active .page-link {
    background: ${({ theme }) => theme.colors.primaryBright};
    color: #fff;
  }
`

export const TextCustom = styled(Text)`
  @media only screen and (max-width: 815px) {
    font-size:12px;
  }
`

export const CustomButton = styled.div<{isActive?:boolean}>`
  height:60px;
  width: auto;
  padding:0px 10px 0px 10px;
  border-bottom: ${({ isActive }) => isActive ? "3px solid #4B19F5" : "none"};
  font-weight:bold;
  color:#777E91;
  padding-bottom:10px;
  display: flex;
  align-items: center;
  cursor:pointer;
  @media only screen and (max-width: 600px) {
    width: 50%;
    justify-content: flex-start;
    margin-bottom:1rem;
    &:first-child {
      justify-content: center;
      
    }
  }
  @media screen and (max-width: 320px) {
    padding: 0px;
  }
`
export const Tags = styled.img`
    height: 35px;
    width: 35px;
    border-radius:50%;
    overflow:hidden;

`
export const Row = styled(Flex)`
  margin-top:1.25rem;
  width:100%;
  justify-content: space-between;
  flex-wrap:wrap-reverse;
  @media only screen and (max-width: 600px) {
    justify-content:flex-end;
    padding-right:10px;
    ${Flex}{
      width: 100%;
      justify-content: flex-start;
      margin-top:1rem;
    }
  }
`
export const CustomTab = styled.div<{isActive:boolean}>`
    width: 50%;
    height:50px;
    display:flex;
    font-weight:bold;
    cursor:pointer;
    justify-content: center;
    align-items: center;
    color:${({ isActive }) => isActive ? "#4B19F5" : "#B1B5C3"};
    border-bottom:${({ isActive }) => isActive ? "3px solid #4B19F5" : "none"}; 
`

export const FlexPrice = styled(Flex)`
  gap: 50px;
  @media only screen and (max-width: 1149px) {
    padding-left: 10px;
  }
  @media screen and (max-width: 600px) {
    gap: 14px;
  } 
`

export const ContainerMenu = styled(Row)` 
    margin-top:1.25rem;
    width:100%;
    justify-content: space-between;
    flex-wrap:wrap-reverse;
    @media only screen and (max-width: 600px) {
      justify-content:flex-end;
      padding-right:10px;
      ${Flex}{
        width: 100%;
        justify-content: flex-start;
        margin-top:1rem;
      }
    }
` 
export const ContainerTabButton = styled(Flex)`
    width: auto;
    @media only screen and (max-width: 600px) {
       width: 100%;
       justify-content: center !important;
       align-items: center !important;
    }
`
export const Wrapper = styled(Flex)`
    flex-wrap:wrap;
    @media only screen and (max-width: 1149px) {
      width: 100%;
      justify-content: space-between;
      margin-top: 20px;
    }
    @media only screen and (max-width: 815px) {
      flex-wrap: nowrap;
    }
    @media only screen and (max-width: 600px) {
      flex-wrap:wrap;
    }
    @media only screen and (min-width: 600px) and (max-width: 1080px) {
       width: 100%;
       margin-top:10px;
       justify-content:space-between;
    }
`