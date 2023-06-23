import React from "react";
import styled from "styled-components";
import { ModalBodyV2, ModalCloseButtonUnbox, ModalContainer, ModalHeader } from "./styles";
import { ModalProps } from "./types";

const ModalUnbox: React.FC<ModalProps> = ({
  title,
  onDismiss,
  onBack,
  children,
  hideCloseButton = false,
  bodyPadding = "0px",
  headerBackground = "transparent",
  // minWidth = "320px",
  ...props
}) => {
  return (
    <CsModalContainer minWidth="320px">
      <ModalHeaderCus>
        {!hideCloseButton && <ModalCloseButtonUnbox onDismiss={onDismiss} />}
      </ModalHeaderCus>
      <ModalBodyV2 p={bodyPadding}>{children}</ModalBodyV2>
    </CsModalContainer>
  );
};

export default ModalUnbox;

const CsModalContainer = styled(ModalContainer)`
  padding: 0px !important;
  margin: 0px !important;
  border-radius: 16px;
`

const ModalHeaderCus = styled(ModalHeader)`
  position: absolute;
  top: 10px;
  right: 10px;
  height: 100px;
  width: 100%;
`


