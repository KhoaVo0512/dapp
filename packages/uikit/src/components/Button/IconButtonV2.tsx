import styled from "styled-components";
import { PolymorphicComponent } from "../../util/polymorphic";
import Button from "./Button";
import { BaseButtonProps } from "./types";

const IconButtonV2: PolymorphicComponent<BaseButtonProps, "button"> = styled(Button)<BaseButtonProps>`
  padding: 0;
  border-radius:12px;
  width: ${({ scale }) => (scale === "sm" ? "32px" : "48px")};
  background: ${({ theme }) => theme.colors.primaryBright};
`;

export default IconButtonV2;
