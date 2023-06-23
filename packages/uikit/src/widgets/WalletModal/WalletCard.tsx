import React from "react";
import { isDesktop, isMobile } from "react-device-detect";
import styled from "styled-components";
import { ButtonProps } from "../../components/Button";
import Button from "../../components/Button/Button";
import { Link } from "../../components/Link";
import { ChevronDownIcon } from "../../components/Svg";
import Text from "../../components/Text/Text";
import { connectorLocalStorageKey, walletLocalStorageKey } from "./config";
import { TransferLink } from "./styles";
import { Login, WalletConfig } from "./types";

interface Props<T> {
  walletConfig: WalletConfig<T>;
  login: Login<T>;
  onDismiss: () => void;
}

const WalletButton = styled(Button).attrs({ width: "100%", variant: "text" })`
  align-items: center;
  display: flex;
  height: auto;
  justify-content: flex-start;
  margin-left: auto;
  margin-right: auto;
  gap: 20px;
  border: 1px solid #e7e7e1;
  border-radius: 12px;
  padding: 10px 17px;

  &:hover:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled):not(:active) {
    background: #E45F35;
    opacity: 1;
    color: #fff;

    div {
      color: #fff;
    }
  }
`;

const WalletButtonShowMore = styled(WalletButton)`
  border: none;
  padding: 0px 17px;
   
  &:hover:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled):not(:active) {
    background: transparent;
    opacity: 1;
  }
`;

interface MoreWalletCardProps extends ButtonProps {
  t: (key: string) => string;
}

export const MoreWalletCard: React.FC<React.PropsWithChildren<MoreWalletCardProps>> = ({ t, ...props }) => {
  return (
    <WalletButtonShowMore variant="tertiary" {...props}>
      <TransferLink>{t("More")}</TransferLink>
      <ChevronDownIcon color="#FF592C" width="24px" />
    </WalletButtonShowMore>
  );
};

const WalletCard: React.FC<React.PropsWithChildren<Props<any>>> = ({ login, walletConfig, onDismiss }) => {
  const { title, icon: Icon, installed, downloadLink } = walletConfig;

  let linkAction: any = {
    onClick: () => {
      login(walletConfig.connectorId);
      localStorage?.setItem(walletLocalStorageKey, walletConfig.title);
      localStorage?.setItem(connectorLocalStorageKey, walletConfig.connectorId);
      onDismiss();
    },
  };

  if (installed === false && isDesktop && downloadLink?.desktop) {
    linkAction = {
      as: Link,
      href: downloadLink.desktop,
      style: {
        textDecoration: "none",
      },
      target: "_blank",
      rel: "noopener noreferrer",
    };
  }
  if (typeof window !== "undefined" && !window.ethereum && walletConfig.href && isMobile) {
    linkAction = {
      style: {
        textDecoration: "none",
      },
      as: Link,
      href: walletConfig.href,
      target: "_blank",
      rel: "noopener noreferrer",
    };
  }

  return (
    <WalletButton variant="tertiary" {...linkAction} id={`wallet-connect-${title.toLowerCase()}`}>
      <Icon width="40px" mb="8px" />
      <Text fontSize="14px">{title}</Text>
    </WalletButton>
  );
};

export default WalletCard;
