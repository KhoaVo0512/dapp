import { Text, Flex, Button } from "@pancakeswap/uikit";
import styled from "styled-components";

export const Wrapper = styled(Flex)`
    width: 100%;
    height: 66vh; 
    display: flex;
    flex-wrap:wrap;
    overflow-y:scroll;
    @media screen and (max-width: 600px) {
        min-height: 10vh;
        height: fit-content; 
        overflow-y:auto;
    }
`
export const Row = styled(Flex)`
    width: 100%;
    height: 64px;
    cursor:pointer;
    justify-content: flex-start;
    align-items:center;
    overflow:hidden;
    border: 1px solid ${({ theme }) => theme.colors.cardBorder};
    border-radius:12px;
    margin-bottom:1rem;
    padding-left: 1rem;
    gap:1rem;
    &:hover{
        background:${({ theme }) => theme.colors.primaryBright};
        ${Text}{
            color:${({ theme }) => theme.colors.white};
        }
    }
`