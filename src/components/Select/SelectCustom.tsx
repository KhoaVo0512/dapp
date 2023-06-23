import React, { useState, useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'
import useTheme from 'hooks/useTheme'
import { ArrowDropDownIcon, Text, IconSort,Button } from '@pancakeswap/uikit'

const DropDownHeader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 16px;
  transition: border-radius 0.15s;
  color: #fdb533;
  > svg {
    fill: #fff !important;
  }

  @media screen and (max-width: 600px) {
    padding: 0 10px;
  }
`

const DropDownListContainer = styled.div`
  width: 179px;
  height: 100%;
  max-height:250px;
  padding: 12px;
  position: absolute;
  overflow-y: auto;
  overflow-x:hidden;
  z-index: ${({ theme }) => theme.zIndices.dropdown};
  transition: transform 0.15s, opacity 0.15s;
  transform: scaleY(0);
  transform-origin: top;
  opacity: 0;
  box-sizing: border-box;
  box-shadow: inset 0px -2px 4px rgba(255, 255, 255, 0.16), inset 4px 3px 3px rgba(0, 0, 0, 0.28);
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => (theme.isDark ? '#fdb533' : '#fff')} !important;
  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 50px;
  }
`

const DropDownContainer = styled.div<{ isOpen: boolean; width: number; height: number }>`
  cursor: pointer;
  width: ${({ width }) => width}px;
  position: relative;
  width: 280px;
  height: 48px;
  box-sizing: border-box;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    // border-right: 0.15px solid rgba(151, 151, 151, 0.69);
  }

  border: 2px solid #e6e8ec;
  border-radius: 12px;

  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 100px;
  }

  ${(props) =>
    props.isOpen &&
    css`
      ${DropDownHeader} {
        /* box-shadow: ${({ theme }) => theme.tooltip.boxShadow}; */
      }

      ${DropDownListContainer} {
        height: auto;
        transform: scaleY(1);
        opacity: 1;
        border-top-width: 0;
        box-shadow: ${({ theme }) => theme.tooltip.boxShadow};
        width: 100%;
        background: #ffffff;
        top: 49px;
        border-radius: 8px;
      }
    `}

  svg {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    fill: #fdb533 !important;
  }
  @media only screen and (max-width: 600px) {
    width: 100%;
    margin-top: 1rem;
  }
`

const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  z-index: ${({ theme }) => theme.zIndices.dropdown};
`

const ListItem = styled.li`
  list-style: none;
  padding: 8px 16px;
  border-radius:6px;
  &:hover {
    background: #ff592c;
    > div {
      color: #fff !important;
    }
  }
`

export interface SelectProps {
  options: OptionProps[]
  onChange?: (option: OptionProps) => void
}

export interface OptionProps {
  label: string
  value: any
}

const SelectCustom: React.FunctionComponent<SelectProps> = ({ options, onChange }) => {
  const containerRef = useRef(null)
  const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  const toggling = (event: React.MouseEvent<HTMLDivElement>) => {
    if ( options.length > 1 ){
      setIsOpen(!isOpen)
    }
    event.stopPropagation()
  }

  const onOptionClicked = (selectedIndex: number) => () => {
    setSelectedOptionIndex(selectedIndex)
    setIsOpen(false)

    if (onChange) {
      onChange(options[selectedIndex])
    }
  }
  const { theme } = useTheme()
  useEffect(() => {
    setContainerSize({
      width: dropdownRef.current.offsetWidth, // Consider border
      height: dropdownRef.current.offsetHeight,
    })

    const handleClickOutside = () => {
      setIsOpen(false)
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <DropDownContainer isOpen={isOpen} ref={containerRef} {...containerSize}>
      {containerSize.width !== 0 && (
        <DropDownHeader onClick={toggling}>
          <Text fontSize="16px" textTransform="uppercase" color="text">
            {options[selectedOptionIndex].label}
          </Text>
        </DropDownHeader>
      )}
        <IconSort color={theme.isDark ? '#fff' : '#000'} onClick={toggling} />
      <DropDownListContainer>
        <DropDownList ref={dropdownRef}>
          {options.map((option, index) =>
            index !== selectedOptionIndex ? (
              <CustomListItem onClick={onOptionClicked(index)} key={option.label}>
                <Text textTransform='uppercase'>{option.label}</Text>
              </CustomListItem>
            ) : null,
          )}
        </DropDownList>
      </DropDownListContainer>
    </DropDownContainer>
  )
}

export default SelectCustom

const CustomListItem = styled(ListItem)`
  @media screen and (max-width: 320px) {
    padding: 0px
  }
`
