import styled, { DefaultTheme } from "styled-components";
import { Colors } from "../../theme";
import { Text } from "../Text";
import { StyledDropdownMenuItemProps } from "./types";
import { LogoutIcon } from "../Svg";

const getTextColor = ({
  $isActive,
  disabled,
  theme,
}: StyledDropdownMenuItemProps & { theme: DefaultTheme; $isActive: boolean }) => {
  if (disabled) return theme.colors.textDisabled;
  if ($isActive) return theme.colors.primaryBright;

  return theme.colors.text;
};

export const DropdownMenuItem = styled.button<StyledDropdownMenuItemProps & { $isActive: boolean }>`
  align-items: center;
  border: 0;
  background: transparent;
  color: ${({ theme, disabled, $isActive }) => getTextColor({ theme, disabled, $isActive })};
  cursor: pointer;
  font-weight: ${({ $isActive = false }) => ($isActive ? "600" : "400")};
  display: flex;
  font-size: 16px;
  height: 48px;
  justify-content: space-between;
  outline: 0;
  padding-left: 16px;
  padding-right: 16px;
  width: 100%;

  &:is(button) {
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryBright};
    color:#fff;
    > div > svg {
      fill: #fff !important;
    }
  }

  &:active:not(:disabled) {
    opacity: 0.85;
    transform: translateY(1px);
  }
`;

export const StyledDropdownMenuItemContainer = styled.div`
  padding:5px;
  ${DropdownMenuItem} {
    border-radius:8px;
  }
`;

export const DropdownMenuDivider = styled.hr`
  border-color: ${({ theme }) => theme.colors.cardBorder};
  border-style: solid;
  border-width: 1px 0 0;
  margin: 4px 0;
`;

export const StyledDropdownMenu = styled.div<{ $isOpen: boolean; $isBottomNav: boolean }>`
  background-color: ${({ theme }) => theme.card.background};
  box-shadow: 0px 4px 24px rgba(133, 133, 133, 0.2);
  border-radius: 16px;
  padding: 8px;
  pointer-events: auto;
  margin-bottom: 0;
  width: ${({ $isBottomNav }) => ($isBottomNav ? "200px!important" : "200px!important")};
  visibility: visible;
  z-index: 1001;

  ${({ $isOpen }) =>
    !$isOpen &&
    `
    pointer-events: none;
    visibility: hidden;
  `}
`;

export const LinkStatus = styled(Text)<{ color: keyof Colors }>`
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 0 8px;
  border: 2px solid;
  border-color: ${({ theme, color }) => theme.colors[color]};
  box-shadow: none;
  color: ${({ theme, color }) => theme.colors[color]};
  margin-left: 8px;
`;
