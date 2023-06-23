import { Text } from "@pancakeswap/uikit";
import React from "react";
import Countdown, { zeroPad } from 'react-countdown-now'

interface StartEndTimeProps {
    startEndDate: number
}
const StartEndTimeCol: React.FC<StartEndTimeProps> = ({startEndDate}) => {
    const renderCountdown = ({ days, hours, minutes, seconds }) => {
        return (
            <Text bold color="#FF592C">
                {zeroPad(days)} days {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
            </Text> 
        )
    }
    return (
        <Countdown zeroPadTime={2} date={new Date(startEndDate)}  renderer={renderCountdown}/>    
    )
}
export default StartEndTimeCol