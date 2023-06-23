import styled from "styled-components";
import { variant as StyledSystemVariant } from "styled-system";
import { ImageProps, Variant, variants } from "./types";
import TokenImage from "./TokenImage";

interface StyledImageProps extends ImageProps {
  variant: Variant;
}

export const StyledPrimaryImage = styled(TokenImage)<StyledImageProps>`
  position: absolute;
  border-radius:50%;
  ${({ variant }) =>
    variant === variants.DEFAULT ? "width: 50%" : "width: 100%; height:83%"}; 
  @media screen and (max-width: 769px) {
    width: ${({ variant }) =>
      variant === variants.DEFAULT ? "50%" : "85%"}; 
    height: ${({ variant }) =>
        variant === variants.DEFAULT ? "50% !important" : "65% !important"}; 
    left: ${({ variant }) =>
        variant === variants.DEFAULT ? "46% !important" : "76% !important"}; 
   top:5px;
  }
  &:before{
    border:none !important;
  }
  ${StyledSystemVariant({
    variants: {
      [variants.DEFAULT]: {
        bottom: "auto",
        left: "45%",
        right: "auto",
        top: 0,
        zIndex: 7,
      },
      [variants.INVERTED]: {
        bottom: 0,
        left: "85%",
        right: 0,
        top: 0,
        zIndex: 6,
      },
    },
  })}
`;

export const StyledSecondaryImage = styled(TokenImage)<StyledImageProps>`
  position: absolute;
  border-radius:50%;
  border:none !important;
  width: ${({ variant }) =>
    variant === variants.DEFAULT ? "100% !important" : "100% !important"}; 
  @media screen and (max-width: 769px) {
    width: ${({ variant }) =>
    variant === variants.DEFAULT ? "50% !important" : "75% !important"}; 
    img{
      height: ${({ variant }) =>
      variant === variants.DEFAULT ? "100% !important" : "100% !important"}; 
    }
    top:5px !important;
  }
  ${StyledSystemVariant({
    variants: {
      [variants.DEFAULT]: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        zIndex: 6,
      },
      [variants.INVERTED]: {
        bottom: "auto",
        left: 0,
        right: "auto",
        top: 0,
        zIndex: 5,
      },
    },
  })}
`;
export const StyledThirdImage = styled(TokenImage)<StyledImageProps>`
  border-radius:50%;
  width: ${({ variant }) =>
    variant === variants.DEFAULT ? "30% !important" : "70% !important"}; 
  @media only screen and (max-width: 769px) and (min-width: 601px) {
    width: ${({ variant }) =>
    variant === variants.DEFAULT ? "30% !important" : "50% !important"}; 
    img{
      height: ${({ variant }) =>
      variant === variants.DEFAULT ? "100% !important" : "100% !important"}; 
    }
    top:30px !important;
    left: ${({ variant }) =>
    variant === variants.DEFAULT ? "85px" : "55px"}; 
  }
  @media screen and (max-width: 600px) {
    width: ${({ variant }) =>
    variant === variants.DEFAULT ? "30% !important" : "60% !important"}; 
    img{
      height: ${({ variant }) =>
      variant === variants.DEFAULT ? "100% !important" : "100% !important"}; 
    }
    top:30px !important;
    left: ${({ variant }) =>
    variant === variants.DEFAULT ? "85px" : "55px"}; 
  }
  border:none !important;
  ${StyledSystemVariant({
    variants: {
      [variants.DEFAULT]: {
        bottom: 0,
        left: "80px",
        right: 0,
        top: "35px",
        zIndex: 10,
      },
      [variants.INVERTED]: {
        bottom: "auto",
        left: "60px",
        right: "auto",
        top: "30px",
        zIndex: 10,
      },
    },
  })}
`;
