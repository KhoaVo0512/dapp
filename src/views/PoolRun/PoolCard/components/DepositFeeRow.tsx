import React from "react";
import { Text, Flex, Button, HelpIcon, useTooltip } from "@pancakeswap/uikit";
import styled from "styled-components";
import { useTranslation } from "@pancakeswap/localization";

interface DepositFeeProps {
    depositFee: string
    depositDescription:any
}
const DepositFeeRow: React.FC<DepositFeeProps> = ({depositFee, depositDescription}) => {
    const { t } = useTranslation()
    const { targetRef, tooltip, tooltipVisible } = useTooltip(
        <Flex flexDirection="column">
            {depositDescription.map((item) => {
                return (
                    <Text>{item}</Text>
                )
            })}
        </Flex>,
        { placement: 'top-end', tooltipOffset: [20, 10] },
    )
    return (
        <Flex width="100%" justifyContent="space-between" mt="10px">
            <Text>{t("Withdraw Fee")}</Text>
            <Flex alignItems="center">
                <Text>{depositFee}</Text>
                <ReferenceElement ref={targetRef}>
                    <HelpIcon color="text" />
                </ReferenceElement> 
                {tooltipVisible && tooltip}
            </Flex>
        </Flex>
    )
}
export default DepositFeeRow

const ReferenceElement = styled.div`
  display: inline-block;
  align-items:baseline;
  margin-left:5px; 
  cursor: pointer;
`