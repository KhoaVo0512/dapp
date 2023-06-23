import React, { useEffect, useState } from "react";
import { usePopper } from "react-popper";
import styled from "styled-components";
import { Box, Flex } from "../../../../components/Box";
import { ChevronDownIcon } from "../../../../components/Svg";
import { UserMenuProps, variants } from "./types";
import MenuIcon from "./MenuIcon";
import { UserMenuItem } from "./styles";

export const StyledUserMenu = styled(Flex)<{isShow?:boolean}>`
  align-items: center;
  background-color:transparent;
  border-radius: 90px;
  cursor: pointer;
  display: inline-flex;
  height: 46px;
  padding-left: ${({ isShow }) => isShow ? "32px" : "8px"};
  padding-right: 4px;
  position: relative;
  border:2px solid ${({ theme }) => theme.colors.cardBorder};
  &:hover {
    opacity: 0.65;
  }
`;

export const LabelText = styled.div<{isShowText?:boolean}>`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  display: ${({ isShowText }) => !isShowText ? "block" : "none" };
  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
    margin-left: 8px;
    margin-right: 4px;
  }
`;

const Menu = styled.div<{ isOpen: boolean }>`
  background-color: ${({ theme }) => theme.card.background};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 16px;
  padding-bottom: 4px;
  padding-top: 4px;
  pointer-events: auto;
  width: 280px;
  padding:12px;
  visibility: visible;
  z-index: 1001;

  ${({ isOpen }) =>
    !isOpen &&
    `
    pointer-events: none;
    visibility: hidden;
  `}
  ${UserMenuItem}{
    border-radius:8px;
  }
`;

const UserMenu: React.FC<UserMenuProps> = ({
  account,
  text,
  avatarSrc,
  variant = variants.DEFAULT,
  children,
  disabled,
  placement = "bottom-end",
  isShowIcon=!false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [targetRef, setTargetRef] = useState<HTMLDivElement | null>(null);
  const [tooltipRef, setTooltipRef] = useState<HTMLDivElement | null>(null);
  const [accountEllipsis, setAccountEllipsis] = useState<string | null>(null);
  useEffect(()=>{
    if(window.screen.width < 321){
      const accountEllipsis = account ? `${account.substring(0, 2)}...${account.substring(account.length - 2)}` : null;
      setAccountEllipsis(accountEllipsis)
    }
    if(window.screen.width > 322){
      const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;
      setAccountEllipsis(accountEllipsis)
    }
  },[window.screen.width, account])
  const { styles, attributes } = usePopper(targetRef, tooltipRef, {
    strategy: "fixed",
    placement,
    modifiers: [{ name: "offset", options: { offset: [0, 0] } }],
  });

  useEffect(() => {
    const showDropdownMenu = () => {
      setIsOpen(true);
    };

    const hideDropdownMenu = (evt: MouseEvent | TouchEvent) => {
      const target = evt.target as Node;
      if (target && !tooltipRef?.contains(target)) {
        setIsOpen(false);
        evt.stopPropagation();
      }
    };

    targetRef?.addEventListener("mouseenter", showDropdownMenu);
    targetRef?.addEventListener("mouseleave", hideDropdownMenu);

    return () => {
      targetRef?.removeEventListener("mouseenter", showDropdownMenu);
      targetRef?.removeEventListener("mouseleave", hideDropdownMenu);
    };
  }, [targetRef, tooltipRef, setIsOpen]);

  return (
    <Flex alignItems="center" height="100%" ref={setTargetRef} {...props}>
      <StyledUserMenu
        onTouchStart={() => {
          setIsOpen((s) => !s);
        }}
        isShow={isShowIcon}
      >
        { isShowIcon && 
          <MenuIcon avatarSrc={avatarSrc} variant={variant} />
        }
        <LabelText isShowText={isShowIcon} title={typeof text === "string" ? text || account : account}>{text || accountEllipsis}</LabelText>
        {!disabled && <ChevronDownIcon color="text" width="24px" />}
      </StyledUserMenu>
      {!disabled && (
        <Menu style={styles.popper} ref={setTooltipRef} {...attributes.popper} isOpen={isOpen}>
          <Box onClick={() => setIsOpen(false)}>{children?.({ isOpen })}</Box>
        </Menu>
      )}
    </Flex>
  );
};

export default UserMenu;
