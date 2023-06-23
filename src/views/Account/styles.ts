import styled from 'styled-components'
import { Button, Flex, Input, CopyIcon } from '@pancakeswap/uikit'

export const CustomContainer = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  max-width: 1140px;
  @media (max-width: 600px) {
    padding: 0 20px;
    width: 100%;
  }
`
export const CustomContainer1 = styled(CustomContainer)`
  margin-bottom: 0px;
`
export const CustomContainer3 = styled(CustomContainer)`
  margin-bottom: 40px;
  @media (max-width: 600px) {
    margin-bottom: 20px;
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
export const Col = styled.div`
  max-width: 50%;
  width: 50%;
  margin: 0 20px;
  @media (max-width: 600px) {
    width: 100%;
    margin: 0;
    padding-left: 10px;
    max-width: 100%;
  }
`
export const CustomFlex = styled(Flex)`
  @media (max-width: 600px) {
    flex-direction: column;
  }
`
export const CustomColBorder = styled.div`
  width: 100%;
  margin: 10px 20px 20px;
  @media (max-width: 600px) {
    display: none;
  }
`
export const CustomCol2 = styled(Col)`
  display: flex;
  align-items: center;
  @media (max-width: 600px) {
    justify-content: center;
    padding-left: 0;
  }
`
export const CustomInput = styled(Input)`
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  /* margin-bottom: 1rem; */
  font-weight: 600;
  border-radius: 8px;
  padding: 22px;
  color: #11142d !important;
  background-color: #E6E8EC; 
  border:none;
  &:focus {
    border:none;
    box-shadow:none!important;
  }
  @media (max-width: 600px) {
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-height: 24px; /* fallback */ 
    max-height: 72px; /* fallback */
    -webkit-line-clamp: 3; /* number of lines to show */
    -webkit-box-orient: vertical;
    font-size: 12px;
  }
`
export const CustomButton = styled(Button)`
  height: 40px;
  width: auto;
  padding: 1px 20px;
  font-weight: bold;
  background-color: ${(props) => props.bgcolor};
  cursor: pointer;
  border-radius: 16px;
  border: none;
  color: ${(props) => props.color};
  font-size: 14px;
  margin-bottom: 0.5rem;
  @media (max-width: 768px) {
    padding: 1px 10px;
    line-height: 16px;
  }
  @media (max-width: 600px) {
    padding: 0px 20px;
  }
`
export const CustomButtonUpdate = styled(CustomButton)`
  height: 50px;
  margin: 35px 0;
`
export const TextTitle = styled.h6`
  color: #b2b3bd;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 15px;
`
export const ImgUpload = styled.img`
  width: 64px;
  height: 64px;
  display: flex;
  flex-direction: column;
`
export const WrapButton = styled.div`
  display: flex;
  @media (max-width: 600px) {
    justify-content: center;
  }
`
export const TitteDescription = styled.div`
  font-size: 14px;
  line-height: 24px;
  color: #b2b3bd;
  padding-top: 20px;
`
export const ImgLogo = styled.img`
  width: 130px;
  height: 130px;
`
export const TextYou = styled.p`
  font-size: 16px;
  line-height: 20px;
  color: #b2b3bd;
  padding-left: 10px;
  font-weight: 600;
  text-transform: uppercase;
  @media (max-width: 600px) {
    padding-left: 15px;
  }
`
export const TextLevel = styled.h1`
  font-size: 28px;
  line-height: 20px;
  color: #11142d;
  font-weight: 600;
  text-transform: capitalize;
  padding-left: 32px;
  @media (max-width: 768px) {
    padding-left: 15px;
    padding-top: 15px;
  }
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    line-height: 40px;
  }
`
export const WrapBtnTitle = styled.div`
  display: flex;
  flex-direction: column;
`
export const FlexCustom1 = styled.div`
  display: flex;
  align-items: center;
`

export const CustomCol1 = styled.div`
  width: 35%;
`
export const CustomLabel = styled.label`
  display: inline-block;
  margin-bottom: 0.5rem;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #b2b3bd;
`
export const Divider = styled.div`
  width: 100%;
  background-color: #e4e4e4;
  height: 1px;
  @media (max-width: 600px) {
    margin: 0 !important;
    padding: 0 10px;
  }
`
export const CustomFlexText = styled.div`
  display: flex;
  align-items: baseline;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`
export const ContainerIcon = styled.label`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: flex-end;
  right: 20px;
  @media (max-width: 600px) {
    right: 5px;
  }
`
export const WrapInput = styled.div`
  position: relative;
  margin-bottom: 1rem;
`
export const Tooltip = styled.div<{ isTooltipDisplayed: boolean }>`
  display: ${({ isTooltipDisplayed }) => (isTooltipDisplayed ? 'inline-block' : 'none')};
  position: absolute;
  padding: 8px;
  top: -35px;
  right: -15px;
  text-align: center;
  background-color: #fff;
  color: #000;
  border-radius: 16px;
  width: 100px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
`
export const CustomIconCopy = styled(CopyIcon)`
  fill: #6c5dd3;
  width: 15px;
  height: 15px;
`

export const FormSubmit = styled.form``

export const Relative = styled.div`
  position: relative;
  margin-bottom: 10px;
`