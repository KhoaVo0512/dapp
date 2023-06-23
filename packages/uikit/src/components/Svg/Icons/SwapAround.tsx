
import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {

  return (
  //     <Svg viewBox="0 0 44 44" {...props} width="44px" style={{cursor:"pointer"}}>
  //       <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
  //       <rect width="44" height="44" rx="22" fill={theme.colors.primaryBright}/>
  //       <path d="M27 11L31 15L27 19" stroke={renderColorStroke()} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  //       <path d="M13 21V19C13 17.9391 13.4214 16.9217 14.1716 16.1716C14.9217 15.4214 15.9391 15 17 15H31" stroke={renderColorStroke()} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  //       <path d="M17 33L13 29L17 25" stroke={renderColorStroke()} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  //       <path d="M31 23V25C31 26.0609 30.5786 27.0783 29.8284 27.8284C29.0783 28.5786 28.0609 29 27 29H13" stroke={renderColorStroke()} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  //       </svg>
  //  </Svg>

    <Svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{cursor:"pointer"}} {...props}>
      <circle cx="30" cy="30" r="30" fill="#4B19F5"/>
      <path d="M38.4201 30.2215C38.0101 30.2215 37.6701 29.8815 37.6701 29.4715V26.1516C37.6701 24.9116 36.6601 23.9016 35.4201 23.9016H21.5801C21.1701 23.9016 20.8301 23.5616 20.8301 23.1516C20.8301 22.7416 21.1701 22.4016 21.5801 22.4016H35.4201C37.4901 22.4016 39.1701 24.0816 39.1701 26.1516V29.4715C39.1701 29.8915 38.8301 30.2215 38.4201 30.2215Z" fill="white"/>
      <path d="M24.7401 27.0691C24.5501 27.0691 24.3601 26.9991 24.2101 26.8491L21.0501 23.6891C20.9101 23.5491 20.8301 23.3591 20.8301 23.1591C20.8301 22.9591 20.9101 22.7691 21.0501 22.6291L24.2101 19.4691C24.5001 19.1791 24.9801 19.1791 25.2701 19.4691C25.5601 19.7591 25.5601 20.2391 25.2701 20.5291L22.6401 23.1591L25.2701 25.7891C25.5601 26.0791 25.5601 26.5591 25.2701 26.8491C25.1201 26.9891 24.9301 27.0691 24.7401 27.0691Z" fill="white"/>
      <path d="M38.4201 37.5903H24.5801C22.5101 37.5903 20.8301 35.9103 20.8301 33.8403V30.5203C20.8301 30.1103 21.1701 29.7703 21.5801 29.7703C21.9901 29.7703 22.3301 30.1103 22.3301 30.5203V33.8403C22.3301 35.0803 23.3401 36.0903 24.5801 36.0903H38.4201C38.8301 36.0903 39.1701 36.4303 39.1701 36.8403C39.1701 37.2503 38.8301 37.5903 38.4201 37.5903Z" fill="white"/>
      <path d="M35.2604 40.7495C35.0704 40.7495 34.8804 40.6795 34.7304 40.5295C34.4404 40.2395 34.4404 39.7595 34.7304 39.4695L37.3604 36.8395L34.7304 34.2095C34.4404 33.9195 34.4404 33.4395 34.7304 33.1495C35.0204 32.8595 35.5004 32.8595 35.7904 33.1495L38.9504 36.3095C39.0904 36.4495 39.1704 36.6395 39.1704 36.8395C39.1704 37.0395 39.0904 37.2295 38.9504 37.3695L35.7904 40.5295C35.6504 40.6795 35.4604 40.7495 35.2604 40.7495Z" fill="white"/>
    </Svg>
  );
};

export default Icon;





