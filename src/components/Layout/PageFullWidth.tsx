import { useTranslation } from "@pancakeswap/localization";
import React from 'react';
import MetaTags from 'react-meta-tags';
import styled from 'styled-components';
// import { useLocation } from 'react-router'
import { DEFAULT_META, getCustomMeta } from 'config/constants/meta';
import { useRouter } from 'next/router';

const PageMeta = () => {                                                                                                                  
  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()
  const { pathname } = useRouter()
  const pageMeta = getCustomMeta(pathname, t, locale) || {}
  const { title, description, image } = { ...DEFAULT_META, ...pageMeta }
  const pageTitle = title
  
  return (
    <MetaTags>
      <title>{pageTitle}</title>
      <meta name="description" content={description}/>
      <meta property="og:title" content={title} />
      <meta property="og:image" content={image} />
    </MetaTags>
  )
}

const PageFullWidth: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
        <Wrapper>
            <PageMeta />
            {children}
        </Wrapper>
  )
}

export default PageFullWidth

const Wrapper = styled.div`
    width:100%;
    height: auto;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;
`