import { useTranslation } from '@pancakeswap/localization'
import { Flex, Text } from '@pancakeswap/uikit'
import Container from 'components/Layout/Container'
import PageFullWidth from 'components/Layout/PageFullWidth'
import PageHeader from 'components/Layout/PageHeader'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useTheme from 'hooks/useTheme'
import styled from 'styled-components'
import { GetListReferal } from "state/mypartner";
import UserInfo from './components/UserInfo'
import Row from './components/Row'
import RowPartner from './components/RowPartner'
import { definePartner } from './helper'

const MyPartner = () => {
    const { t } = useTranslation()
    const { theme } = useTheme()
    const { chainId, account } = useActiveWeb3React()
    const [listreferal] = GetListReferal();
    return (
        <PageFullWidth>
            <PageHeader 
                    nameTitle="RUN TOGETHER"
                    namePlace="Partners"
                    imgIcon="/images/runMarketplace/imgBanner.png"
                    bgColor={theme.colors.secondary}
            />
            <CustomContainer>
                <UserInfo/>
                <Flex width="100%" mt="1rem" justifyContent="flex-start" flexDirection="column">
                <Flex width="100%" mt="1rem" justifyContent="center" flexDirection="column" alignItems="center">
                    <SubHeading>{t('Your Partners')}</SubHeading>
                </Flex>
                <Flex flexDirection="column" mt="1rem" mb="3rem">
                    <HeaderTablePartner>
                    <Col>
                        <Text color="white" bold>
                        {t('AVATAR')}
                        </Text>
                    </Col>
                    <Col>
                        <Text color="white" bold>
                        {t('EMAIL')}
                        </Text>
                    </Col>
                    <Col>
                        <Text color="white" bold>
                        {t('NAME')}
                        </Text>
                    </Col>
                    <Col>
                        <Text color="white" bold>
                        {t('LEVEL')}
                        </Text>
                    </Col>
                    </HeaderTablePartner>
                    { 
                        listreferal.length > 0 ? listreferal?.map((val,index)=>{            
                            return (
                            <RowPartner
                            idRow={index}
                            avatar={val?.avatar ? val?.avatar : "/images/account/avatarnull.png"}
                            name={val?.name ? val?.name : "No Data"}
                            level={val?.partner_role === Number(val?.partner_role) ? definePartner(val?.partner_role): "No Data"}
                            commision="10%"
                            manipulation="/images/runWorking.png"
                            email={val?.email ? val?.email : "No Data"}
                            />)

                        }) : 
                            <Flex width="100%" justifyContent="center" mt="1rem" height="100%">
                                <Text>{t("No Data")}</Text>
                            </Flex>
                    }

                </Flex>
                <Flex width="100%" mt="1rem" justifyContent="center" flexDirection="column" alignItems="center">
                    <CustomHeading>{t('Retailers advantages')}</CustomHeading>
                    <SubHeading>{t('Preferential policy')}</SubHeading>
                    </Flex>
                    <Flex flexDirection="column" mt="1rem" mb="5rem">
                    <HeaderTable>
                        <Col>
                        <Text color="white" bold>
                            {t('LEVEL')}
                        </Text>
                        </Col>
                        <Col>
                        <Text color="white" bold>
                            {t('COMMISSION PER NFT BOX')}
                        </Text>
                        </Col>
                        <Col>
                        <Text color="white" bold>
                            {t('CONDITION')}
                        </Text>
                        </Col>
                    </HeaderTable>
                    <Row idRow={0} level="Collaborators" commision="10%" coefficient="" />
                    <Row idRow={1} level="TEAM LEADER" commision="5%" coefficient="" />
                    <Row idRow={2} level="CLUB" commision="4%" coefficient="" />
                    <Row idRow={3} level="PREMIUM" commision="3%" coefficient="5 Collaborators" />
                    <Row idRow={4} level="REGION" commision="2%" coefficient="5 Collaborators" />
                    <Row idRow={5} level="COUNTRY" commision="5%" coefficient="5 Collaborators" />
                </Flex>
                </Flex>
            </CustomContainer>
        </PageFullWidth>
    )
}
export default MyPartner

const CustomContainer = styled(Container)`
  width: 100%;
  @media screen and (max-width: 500px) {
    padding-left: 15px;
    padding-right: 15px;
  }
`
const SubHeading = styled(Text)`
  font-weight: 700;
  font-size: 32px;
  line-height: 56px;
  @media screen and (max-width: 500px) {
    font-size: 26px;
  }
  @media screen and (max-width: 400px) {
    font-size: 22px;
  }
`
const HeaderTable = styled(Flex)`
  height: 45px;
  align-items: center;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.bglevelpartner};
  @media screen and (max-width: 500px) {
    display: none;
  }
`
const HeaderTablePartner = styled(HeaderTable)`
  background: ${({ theme }) => theme.colors.bgavatarpartner};
`
const Col = styled.div`
  width: 33.33%;
  display: flex;
  justify-content: center;
  justify-content: center;
  align-items: center;
`
const CustomHeading = styled(Text)`
  font-weight: 700;
  font-size: 48px;
  line-height: 56px;
  @media screen and (max-width: 500px) {
    font-size: 28px;
  } 
  @media screen and (max-width: 320px) {
    font-size: 24px;
  }
`