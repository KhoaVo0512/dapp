import React from 'react';
import ConnectWalletButton from "components/ConnectWalletButton";
import styled from 'styled-components';
import { useTranslation } from '@pancakeswap/localization';
import { Button, Flex, Text, useModal } from '@pancakeswap/uikit';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import ModalUnBox from './ModalUnBox';

interface PropsCard{
    ID?: number;
}

const CardMystery:React.FC<PropsCard> = ({
    ID,
}) => {
    const {t} = useTranslation()
    const { account } = useActiveWeb3React()
    const [ OpenModalUnBox ] = useModal(
        <ModalUnBox 
            nftId={ID[0].toString()}
        />
    )
    
    return (
        <Container>
            <Flex width="100%" flexDirection="column">
                <CustomCard>
                    <ImgShoes src='/images/mysterybox/MysteryBox.png' alt='Image Box'/>
                </CustomCard>
                <Flex marginTop="10px" width="100%" justifyContent="space-between" alignItems="center" >
                    <Text>{t('Mystery Box')}</Text>
                    <CustomId>
                        <Text bold>#{ID[0].toString()}</Text>
                    </CustomId>
                </Flex>
            </Flex>
            {account ? 
                <Flex>
                    <CustomButton width="100%" onClick={OpenModalUnBox}>
                        {t(`Unbox`)}
                    </CustomButton>
                </Flex>
            :
                <CustomButtonConnectWallet mt="1rem" width="100%"/>
            }
        </Container>
    );
};

export default CardMystery;

const Container = styled.div`
    width: 368px;
    height: auto;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media screen and (max-width: 600px){
        padding: 15px 0px 15px 0px;
    }
`
const CustomCard = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 320px;
    background:${({ theme }) => theme.colors.backgroundMysteryBox};
    border-radius: 8px;
    position: relative;
    justify-content: center;
    align-items: center;
`
const ImgShoes = styled.img`
    width: 50%;
    height: auto;
`
const CustomButton = styled(Button)`
    margin-top: 1rem;
    border-radius:90px;
    box-shadow:none;
`
const CustomButtonConnectWallet = styled(ConnectWalletButton)`
    width: 100% !important; 
`
const CustomId = styled(Flex)`
    background: rgba(48, 179, 140, 0.25);
    border-radius: 6px;
    width: 61px;
    height: 32px;
    padding:0px 10px 0px 10px;
    justify-content: center;
    align-items: center;
`