import React, {useState} from "react";
import { Text, Flex, useModal } from "@pancakeswap/uikit";
import styled from "styled-components";
import Countdown, { zeroPad } from 'react-countdown'


interface EndsInProps {
    endDate: number
}
const EndsInRow: React.FC<EndsInProps> = ({endDate}) => {
    const renderCountdown = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) return (
            <></>
        )
        return (
            <Flex>
               <Text bold>{zeroPad(days)} days,</Text>
               <Text ml="5px" bold>{zeroPad(hours)}:</Text>
               <Text bold>{zeroPad(minutes)}:</Text>
               <Text bold>{zeroPad(seconds)}</Text>
            </Flex>
        )
    }
    return (
        <ContainerEndsIn>
            <Text>ENDS IN</Text>
            { endDate !== 0 &&
                <Countdown zeroPadTime={2} date={endDate}  renderer={renderCountdown}/>
            }
        </ContainerEndsIn>
    )
}
export default EndsInRow

const ContainerEndsIn = styled(Flex)`
    width:17.5%;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    height:70px;
    @media screen and (min-width: 601px) and (max-width: 1000px) {
        width:50%;
    }
    @media screen and (max-width: 600px) {
        width:50%;
    }
`