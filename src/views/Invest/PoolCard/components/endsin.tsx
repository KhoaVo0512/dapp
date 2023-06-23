import React from "react";
// import { Text, Flex, Button } from "@phamphu19498/runtogether-uikit";
import styled from "styled-components";
// import { CalculateIcon, HelpIcon, useTooltip } from "components/Pancake-uikit";
// import { useTranslation } from "contexts/Localization";
import Countdown, { zeroPad } from 'react-countdown'
import { useTranslation } from "@pancakeswap/localization";
import { Flex, Text } from "@pancakeswap/uikit";

// import { TextCard } from "../styles";

interface EndsInProps {
    endTime?: number
    startTime:number
}
const EndsInRow: React.FC<EndsInProps> = ({endTime, startTime}) => {
    const { t } = useTranslation()
    const renderCountdown = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) return (
           <>---</>
        )
        return (
            <Flex>
                <Text >{zeroPad(days)} days,</Text>
                <Text ml="5px">{zeroPad(hours)}:</Text>
                <Text >{zeroPad(minutes)}</Text>
            </Flex>
        )
    }
    const currentTime = Date.now()

    return (
        <Flex width="100%" justifyContent="space-between" mt="10px">
            { startTime > currentTime ?
                <Flex width="100%" justifyContent="space-between" mt="10px" alignItems="center">
                    <CsText>{t("Starts in")}</CsText>
                    <Flex alignItems="center">
                        <Countdown zeroPadTime={2} date={startTime}  renderer={renderCountdown}/>
                    </Flex>
                </Flex>
            :
                <Flex width="100%" justifyContent="space-between" mt="10px" alignItems="center">
                    <CsText>{t("Ends in")}</CsText>
                    <Flex alignItems="center">
                        <Countdown zeroPadTime={2} date={endTime}  renderer={renderCountdown}/>
                    </Flex>
                </Flex>
            }
        </Flex>
    )
}
export default EndsInRow

export const CsText = styled(Text)`
  @media screen and (max-width: 600px) {
    font-size: 16px;
  }
`