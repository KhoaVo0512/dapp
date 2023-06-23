import React, { useState } from "react";
import { Text, Flex, Button, useModal } from "@pancakeswap/uikit";
import styled from "styled-components";
import { useTranslation } from "@pancakeswap/localization";
import { GetTokenUser } from 'state/auth';
import { GetParentPartner, GetReferralCode, GetUser } from "state/mypartner";
import { definePartner } from "../helper";

const UserInfo = () =>{
    const { t } = useTranslation()
    const [ user ] = GetUser()
    const [ tokenByUser ] = GetTokenUser()
    const [isOpenTooltip, setOpenTooltip] = useState(false);
    const [isOpenTooltipLink, setOpenTooltipLink] = useState(false);
    const [ referralCode ] = GetReferralCode() 
    const referralLink = user ? `${user?.referral_code.substring(0, 16)}...${user?.referral_code.substring(user?.referral_code.length - 6)}` : null;
    const [partnerparent] = GetParentPartner()
   
     
    const copyLinkReferralCode = () => {
        if (navigator.clipboard && navigator.permissions) {
            navigator.clipboard.writeText(referralCode).then(() => displayTooltipCode())
        } else if (document.queryCommandSupported('copy')) {
          const ele = document.createElement('textarea')
          ele.value = referralCode
          document.body.appendChild(ele)
          ele.select()
          document.execCommand('copy')
          document.body.removeChild(ele)
          displayTooltipCode()
        }
      }
    
      function displayTooltipCode() {
        setOpenTooltip(true)
        setTimeout(() => {
            setOpenTooltip(false)
        }, 3000)
      }

    const copyLinkReferralLink = () => {
        if (navigator.clipboard && navigator.permissions) {
            navigator.clipboard.writeText(user?.referral_code).then(() => displayTooltipLink())
        } else if (document.queryCommandSupported('copy')) {
            const ele = document.createElement('textarea')
            ele.value = user?.referral_code
            document.body.appendChild(ele)
            ele.select()
            document.execCommand('copy')
            document.body.removeChild(ele)
            displayTooltipLink()
        }
      }
    
      function displayTooltipLink() {
        setOpenTooltipLink(true)
        setTimeout(() => {
            setOpenTooltipLink(false)
        }, 3000)
      }

    return(
        <Container>
            <CustomCol>
                {  partnerparent?.name ? ( 
                        <>
                            <Flex flexWrap="wrap" alignItems="flex-end" justifyContent="space-between">
                            <CustomFlex flexDirection="column">
                                    <Text bold>Your superior</Text>
                            </CustomFlex>
                            <CustomFlex flexDirection="column" alignItems="flex-end">
                                    <Text bold>{partnerparent.name}</Text>
                                    <Text style={{width:"100%"}} color="textSubtle" fontSize="12px">{partnerparent.partner_role.en}</Text>
                            </CustomFlex>
                            </Flex> 
                            <Flex>
                                <BorderHr/>
                            </Flex>
                        </>
                    )
                    :  
                    (
                        <>   
                            <Flex>
                                <Text mb="20px"> </Text>
                            </Flex>                              
                        </>
                    ) 
                }            
                <Flex flexWrap="wrap" mt="1rem" justifyContent="space-between">
                    <CustomFlex flexDirection="column">
                        <Text fontSize="24px" bold>{user?.name.length !== 0 ? user?.name : 'Your name'}</Text>
                        <Text color="textSubtle">{user ? user?.email : ''}</Text>
                    </CustomFlex>
                    <CustomFlex justifyContent="flex-end" mt="5px">
                        <BorderLeader>
                            <Text fontSize="16px" bold>{user?.id ? definePartner(user?.partner_role): 'No Data'}</Text>     
                        </BorderLeader>
                    </CustomFlex>
                </Flex> 
            </CustomCol>
            <Col>
                <BgReferal>
                    <CsWidthReferal height="86px" style={{paddingRight: "10px"}} >
                        <Flex width="100%" flexDirection="column" >
                            <Text textTransform="uppercase" color="textreferalpartner" bold>{t("Referral link")}</Text>
                            <InputReferal>
                                {user?.referral_code.length !== 0 ?
                                    <>
                                        <TextReferralLink>{referralLink}</TextReferralLink>
                                        <ButtonCoppy onClick={copyLinkReferralLink}>
                                            Copy
                                        </ButtonCoppy>
                                        <Tooltip isTooltipDisplayed={isOpenTooltipLink}>Copied</Tooltip>
                                    </>
                                    :
                                    <TextReferralLink bold>No Data</TextReferralLink>

                                }
                            </InputReferal>
                        </Flex>
                    </CsWidthReferal>
                    <CsWidthReferal height="86px">
                        <Flex width="100%" flexDirection="column">
                            <Text textTransform="uppercase" color="textreferalpartner" bold>{t("Referral Code")}</Text>
                            <InputReferal>
                                {user?.referral_code_invite.length !== 0 ?
                                    <>
                                        <Text bold fontSize="14px">{user ? user?.referral_code_invite : ''}</Text>
                                        <ButtonCoppy onClick={copyLinkReferralCode}>
                                            Copy
                                        </ButtonCoppy>
                                        <Tooltip isTooltipDisplayed={isOpenTooltip}>Copied</Tooltip>
                                    </>
                                    :
                                    <Text bold>No Data</Text>
                                }
                            </InputReferal>
                        </Flex>
                    </CsWidthReferal>
                </BgReferal> 
            </Col>
        </Container>
    )
}
export default UserInfo

const Container = styled(Flex)`
    width:100%;
    flex-wrap:wrap;
    height: auto;
`
const Col = styled(Flex)`
    flex-direction:column;
    padding-left:1rem;
    width:50%;
    @media screen and (max-width: 1080px) {
        width: 100%;
        padding:0;
    }
`
const CustomCol = styled(Col)`
    padding-right:.5rem;
    padding-left:.5rem;
    @media screen and (max-width: 600px) {
        padding-left:5px;
    } 
`
const BorderLeader = styled.div`
    border: 2px solid ${({ theme }) => theme.colors.cardBorder};
    border-radius: 90px;
    padding: 1px 15px;
    gap: 12px;
    height:30px;
    @media screen and (max-width: 1080px) {
        margin-top:1rem;
    }
`
const BorderHr = styled.hr`
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  width:100%;
  /* height:1px;  */
`

const BgReferal = styled.div`
    background: ${({ theme }) => theme.colors.bgreferalpartner};
    border-radius: 16px;
    height: 100%;
    width: 100%;
    padding:15px;
    display:flex;
    flex-wrap: wrap;
    align-items: center;
    @media screen and (max-width: 1080px) {
        margin-top:1.5rem;
    }
    @media screen and (max-width: 600px) {
        height: 230px;
        justify-content: space-between;
    }
`

const CustomFlex = styled(Flex)`
    //  width:50%;
    justify-content:space-between;
    @media screen and (max-width: 1249px) {
        width:100%;
        margin-bottom: 10px;
        padding-right: 0px !important;
    }
    @media screen and (max-width: 600px) {
        width:100%;
        display:flex;
        justify-content:flex-start;
        align-items:flex-start;
    }
`
const InputReferal = styled.div`
    width: 100%;
    height: 60px;
    background: ${({ theme }) => theme.colors.backgroundFCVote};
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left:10px;
    padding-right:10px;
    position: relative;
    margin-top: 10px;
    border: 2px solid transparent;
    @media screen and (max-width: 600px) {
        width: 100%;      
    }
    &:hover{
        border:2px solid ${({theme})=>theme.colors.secondary};
        transition:border .2s ease-out:
    }
`
const ButtonCoppy = styled.button`
    background: #23262F;
    border-radius: 4px;
    width: 61px;
    height: 26px;
    display: flex;
    font-size: 12px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color:${({ theme }) => theme.colors.white};
    text-transform: uppercase;
`
const Tooltip = styled.div<{ isTooltipDisplayed?: boolean }>`
  display: ${({ isTooltipDisplayed }) => (isTooltipDisplayed ? 'inline-block' : 'none')};
  position: absolute;
  padding: 8px;
  top: -35px;
  right: -15px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 16px;
  width: 100px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
`

const TextReferralLink = styled(Text)` 
  font-size:14px;
  @media screen and (max-width: 320px) {
    font-size: 12px;
  }
`
const CsWidthReferal = styled(CustomFlex)`
  width:50%;
 @media (max-width:600px){
    width:100%!important;
}
`