import React from "react";
import { Text, Flex, Modal, Button } from '@pancakeswap/uikit'
import styled from "styled-components";
import { renderImgBox } from "utils/renderBGCard";

interface Props{
    onDismiss?: () => void
    onSelectBoxType?:(newValue) => void
    activeIndex?:number
  }
const ModalSelctBoxType: React.FC<Props> = ({onDismiss, onSelectBoxType, activeIndex}) => {
    function handleSelectBoxType(boxtype){
        onSelectBoxType(boxtype)
        onDismiss()
    }
    return (
        <CustomModal title="Select Box Type" onDismiss={onDismiss}>
            <ContainerFlex>
                <CustomRow onClick={()=>handleSelectBoxType(1)} isActive={activeIndex === 1 ? !false : false}>
                    <img style={{width:"96px"}} src={renderImgBox(1)} alt="box iamges"/>
                    <WrapInfo>
                        <Text fontWeight="600" fontSize="18px">
                            Training Box
                        </Text>
                    </WrapInfo>
                </CustomRow>
                <CustomRow onClick={()=>handleSelectBoxType(2)} isActive={activeIndex === 2 ? !false : false}>
                    <img style={{width:"96px"}} src={renderImgBox(2)} alt="box iamges"/>
                    <WrapInfo>
                        <Text fontWeight="600" fontSize="18px">
                            Running Box
                        </Text>
                    </WrapInfo>
                </CustomRow>
                <CustomRow onClick={()=>handleSelectBoxType(3)} isActive={activeIndex === 3 ? !false : false}>
                    <img style={{width:"96px"}} src={renderImgBox(3)} alt="box iamges"/>
                    <WrapInfo>
                        <Text fontWeight="600" fontSize="18px">
                            Competitor Box
                        </Text>
                    </WrapInfo>
                </CustomRow>
                <CustomRow onClick={()=>handleSelectBoxType(4)} isActive={activeIndex === 4 ? !false : false}>
                    <img style={{width:"96px"}} src={renderImgBox(4)} alt="box iamges"/>
                    <WrapInfo>
                        <Text fontWeight="600" fontSize="18px">
                            Athele Box
                        </Text>
                    </WrapInfo>
                </CustomRow>
            </ContainerFlex>
        </CustomModal>
    )
}
export default ModalSelctBoxType

const ContainerFlex = styled(Flex)`
    width:100%;
    flex-direction:column;
    @media screen and (max-width: 600px) {
        padding:10px;
    }
`
const CustomModal = styled(Modal)`
    width: 450px;
    padding:12px 0px 12px 0px;
    @media screen and (max-width: 600px) {
        width: 350px;
    }
    @media screen and (max-width: 320px) {
        width: 300px;
    }
`
const WrapInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`
const CustomRow = styled(Flex)<{isActive?:boolean}>`
    gap:30px;
    width: 100%;
    margin-bottom:10px;
    border-radius: 8px;
    background:${({ isActive }) => isActive ? "#FF592C" : "transparent"};
    ${Text}{
        color:${({ isActive }) => isActive ? "#fff" : "#000"};
    }
    cursor: pointer;
    &:hover{
        background:#FF592C;
        ${Text}{
            color:#fff;
        }
    }
`