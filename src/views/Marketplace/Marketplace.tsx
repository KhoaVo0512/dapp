import React, { useEffect, useState } from 'react'
import PageHeader from 'components/Layout/PageHeader'
import useTheme from 'hooks/useTheme'
import { useTranslation } from '@pancakeswap/localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { GetListItems, GetTotalSellItems } from 'state/marketplace'
import { Flex, Text } from '@pancakeswap/uikit'
import Select, { OptionProps } from 'components/Select/Select';
import { useDispatch, useSelector } from 'react-redux'
import { fetchValueSortPrice } from 'state/marketplace/actions'
import { AppDispatch } from 'state'
import { Container, ContainerMenu, ContainerTabButton, CustomButton, CustomPage, FlexPrice, Tags, TextCustom, Wrapper } from './styles'
import BOXESSTORE from './components/BOXESSTORE'

const Marketplace:React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const valSelector =  useSelector((state: any) => state.marketplace.listsortprice)
  const [sortprice, setSortprice] = useState("highest")
  const datamapoption = [{
    label: "Highest to lowest",
    value: 'highest',
  },
  {
    label: "Lowest to highest",
    value: 'lowest',
  }]
  const datamapoption2 =  [{
    label: "Lowest to highest",
    value: 'lowest',
  },
  {
    label: "Highest to lowest",
    value: 'highest',
  }]
  const [valuedatamap,setValueDataMap]= useState(datamapoption)
  const [defaultindex,setDefaultIndex] = useState(1)

  const [ activeIndex, setActiveIndex ] = useState(0)
  const itemsPerPage = 9
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const dispatch = useDispatch<AppDispatch>()
  const handleSortOptionPrice = (option: OptionProps): void => {
  const valuedispatch = {
      labelsort:option.label,
      valuesort:option.value
  }    
    dispatch(fetchValueSortPrice({listsortprice:valuedispatch}))
    setSortprice(option.value)
    if (option.value === "highest"){      
        setSortprice("highest")
        setValueDataMap(datamapoption)
        setDefaultIndex(1)
      }
    if (option.value === "lowest"){      
        setSortprice("lowest")
        setValueDataMap(datamapoption2)
        setDefaultIndex(2)
      }
  }
  useEffect(()=>{
      if (valSelector.valuesort === "highest"){      
        setSortprice("highest")
        setValueDataMap(datamapoption)
        setDefaultIndex(1)
      }
      if (valSelector.valuesort === "lowest"){       
        setSortprice("lowest")
        setValueDataMap(datamapoption2)
        setDefaultIndex(2)
      }
  },[valSelector, dispatch])
  // console.log('valSelector',valueselector)
  const { chainId } = useActiveWeb3React()
  const [ totalSell ] = GetTotalSellItems(chainId)
  const [ listItems ] = GetListItems(totalSell, chainId)
  const [currentItems, setCurrentItems] = useState([...listItems])
  const [listNftItem, setListNftItem] = useState([...listItems])

    // sort
    useEffect(() => {
      const object = [...listItems]
      function SortPrice() {
        if (sortprice === 'highest') {
          return setListNftItem(
            object.sort((obj1, obj2) => Number(obj2.priceListing) - Number(obj1.priceListing)),
          )
        }
        if (sortprice === 'lowest') {
          return setListNftItem(
            object.sort((obj1, obj2) => Number(obj1.priceListing) - Number(obj2.priceListing)),
          )
        }
      }
      if (listItems.length !== 0) {
        SortPrice()
      }
    }, [sortprice, listItems])

    // getsum
    const getSumBoxType = (type: number) => {
      let sumType = 0;
      if(listItems?.length > 0) {
        if(type > 0) {
          sumType = listItems.filter(item => item.boxType === type)?.length;
        }
        else {
          sumType = listItems.length;
        }
      }
      return sumType;
    }
      

    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage
      setCurrentItems(listNftItem.slice(itemOffset, endOffset))
      setPageCount(Math.ceil(listNftItem.length / itemsPerPage))
    }, [itemOffset, itemsPerPage, listNftItem, sortprice])
    useEffect(() => {
      setItemOffset(0)
    }, [sortprice])


  return (
    <>
      <PageHeader
        nameTitle="RUN TOGETHER"
        namePlace="Marketplace"
        imgIcon="/images/runMarketplace/imgBanner.png"
        bgColor={theme.colors.pink}
      />
      <CustomPage>
        <ContainerMenu>
          <Wrapper>
            <ContainerTabButton>
              <CustomButton isActive={ activeIndex === 0 ? !false : false} onClick={()=>setActiveIndex(0)}>
                <TextCustom ml="5px" color='textDisabled' bold>
                  {t('All')} ({getSumBoxType(0)})
                </TextCustom>
              </CustomButton>
            </ContainerTabButton>
            <CustomButton isActive={ activeIndex === 1 ? !false : false} onClick={()=>setActiveIndex(1)}>
              <Tags src="/images/martketplace/11.png" alt="tag box" />
              <TextCustom ml="5px" color="textDisabled" bold>
                {t('MetaRush')} ({getSumBoxType(1)})
              </TextCustom>
            </CustomButton>
            <CustomButton isActive={ activeIndex === 2 ? !false : false} onClick={()=>setActiveIndex(2)} >
              <Tags src="/images/martketplace/22.png" alt="tag box" />
              <TextCustom ml="5px" color="textDisabled" bold>
                {t('MetaRun')} ({getSumBoxType(2)})
              </TextCustom>
            </CustomButton>
            <CustomButton isActive={ activeIndex === 3 ? !false : false} onClick={()=>setActiveIndex(3)}>
              <Tags src="/images/martketplace/33.png" alt="tag box" />
              <TextCustom ml="5px" color="textDisabled" bold>
                {t('MetaRace')} ({getSumBoxType(3)})
              </TextCustom>
            </CustomButton>
            <CustomButton isActive={ activeIndex === 4 ? !false : false} onClick={()=>setActiveIndex(4)}>
              <Tags src="/images/martketplace/44.png" alt="tag box" />
              <TextCustom ml="5px" color="textDisabled" bold>
                {t('MetaRich')} ({getSumBoxType(4)})
              </TextCustom>
            </CustomButton>
          </Wrapper>
          <FlexPrice alignItems="center">
            <Text textTransform="uppercase" color="textDisabled" mr="10px">
              {t('Price')}
            </Text>
            <Select
              options={datamapoption}
              onOptionChange={handleSortOptionPrice}        
              defaultOptionIndex={defaultindex}        
            />
          </FlexPrice>
        </ContainerMenu>
        <Container>
          <Flex
            width="100%"
            flexWrap="wrap"
            justifyContent="space-around"
            alignItems="center"
            minHeight="50vh"
            mt="1.25rem"
            mb="1.25rem"
          >
            <BOXESSTORE sortprice={sortprice} filterBoxType={activeIndex} />
          </Flex>
        </Container>
      </CustomPage>
    </>
  )
}

export default Marketplace;
