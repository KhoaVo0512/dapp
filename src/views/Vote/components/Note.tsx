import { Flex, LinkExternal, Progress, Radio, Skeleton, StatusClosedIcon, StatusOpenIcon, Text, useModal } from "@pancakeswap/uikit";
import styled from "styled-components";

const Note = () => {
    return (
        <Flex width="100%" mt="10px" flexDirection="column">
            <Text fontStyle="italic">**<CsSpan>Note</CsSpan>: Will cancel if total RUN voted is under <CsSpan>10,000.00</CsSpan></Text>
            <Text fontStyle="italic">Will agree if total RUN voted is greater than <CsSpan>10,000.00</CsSpan> and agree vote is greater than disagree vote</Text>
            <Text fontStyle="italic">Will disagree if total RUN voted is greater than <CsSpan>10,000.00</CsSpan> and disagree vote is greater than agree vote.</Text>
        </Flex>
    )
}

export default Note

const CsSpan = styled.span`
    font-weight:bold;
`