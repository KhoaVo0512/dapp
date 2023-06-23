import { Button, Flex, useModal } from '@pancakeswap/uikit'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'
import { GetTokenUser } from 'state/auth'
import { fecthTokenByUser } from 'state/auth/actions'
import { fetchBoxes, fetchShoes } from 'state/inventory/actions'
import styled from 'styled-components'
import { fetchIsDifferent } from 'state/account/actions'
import LoginModal from './LoginModal'



const Auth = () => {
  const [onPresentLoginModal] = useModal(<LoginModal />)
  const [ tokenByUser ] = GetTokenUser()
  const dispatch = useDispatch<AppDispatch>()
  const handleSignout = async ()=>{
      localStorage.removeItem('serviceToken');
      localStorage.removeItem('user_info');
      localStorage.removeItem('userAddress');
      dispatch(fetchShoes({
        listShoes:[]
      }))
      dispatch(fetchBoxes({
        listBoxes:[]
      }))
      dispatch(fecthTokenByUser({tokenByUser:""}))
      dispatch(fetchIsDifferent({isDifferent:"false"}))
  }
  return (
    <Flex alignItems="center">
      { tokenByUser ? 
          <CustomButton onClick={handleSignout}>
            Sign out
          </CustomButton>
        : 
          <CustomButton onClick={onPresentLoginModal}>
              Sign in
          </CustomButton>
      }
    </Flex>
  )
}

export default Auth

const CustomButton = styled(Button)`
    border: 2px solid ${({ theme }) => theme.colors.cardBorder};
    border-radius: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 46px;
    color:black;
    width: 100px;
    background-color: transparent;
    cursor: pointer;
    margin-left:8px!important;
    white-space:nowrap;
    margin:0;
    padding:5px;
    @media screen and (min-width: 321px) and (max-width: 380px){
      width: 90px;
      padding: 5px 0px;
      margin-left:8px!important;
    }
    @media screen and (max-width: 320px) {
      width: 80px;
      padding: 5px 0px;
      margin-left:4px!important;
    }
`