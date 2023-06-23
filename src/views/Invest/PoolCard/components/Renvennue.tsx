import { useTranslation } from "@pancakeswap/localization";
import { Flex, Text} from "@pancakeswap/uikit";
import React from "react";

interface RenvennueProps {
    renvennue: string
}

const Renvennue: React.FC<RenvennueProps> = ({renvennue}) => {
    const { t } = useTranslation()
    return (
        <Flex width="100%" justifyContent="space-between" mt="1rem">
            <Text>{t('Revenue sharing rate')}</Text>
            <Flex alignItems="center" style={{gap:"15px"}} >
                <Text>{renvennue}</Text>
            </Flex>
        </Flex>
    )
}
export default Renvennue