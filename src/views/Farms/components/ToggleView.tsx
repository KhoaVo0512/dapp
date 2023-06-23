import React from 'react'
import { Flex, ListViewIcon, CardViewIcon, Button } from '@pancakeswap/uikit'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'

export enum ViewMode {
  'TABLE' = 'TABLE',
  'CARD' = 'CARD',
}



interface ToggleViewProps {
  viewMode: ViewMode
  onToggle: (mode: ViewMode) => void
}

const Container = styled(Flex)`
    width:120px;
    justify-content: space-between;
    align-items: center;
`
const ToggleView: React.FunctionComponent<ToggleViewProps> = ({ viewMode, onToggle }) => {
  const { theme } = useTheme()
  const handleToggle = (mode: ViewMode) => {
    if (viewMode !== mode) {
      onToggle(mode)
    }
  }
  return (
    <Container>
      <IconButton isActive={viewMode === 'TABLE' ? !false : false } scale="sm" onClick={() => handleToggle(ViewMode.TABLE)}>
        <ListViewIcon color={viewMode === 'TABLE' ? theme.colors.white: theme.colors.textDisabled }/>
      </IconButton>
      <IconButton isActive={viewMode === 'CARD' ? !false : false } scale="sm" onClick={() => handleToggle(ViewMode.CARD)}>
        <CardViewIcon color={viewMode === 'CARD' ? theme.colors.white: theme.colors.textDisabled }/>
      </IconButton>
    </Container>
  )
}

export default ToggleView

const IconButton = styled(Button)<{isActive?:boolean}>`
    height: 50px;
    width: 50px;
    border-radius: 10px;
    background: ${({ isActive, theme }) => isActive ? theme.colors.primaryBright : "transparent" };
    box-shadow:none;
    border:2px solid ${({ isActive, theme }) => isActive ? "none" : theme.colors.cardBorder };
`
