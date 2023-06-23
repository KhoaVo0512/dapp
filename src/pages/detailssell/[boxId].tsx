import { ChainId } from '@pancakeswap/sdk'
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import SellPageRun from 'views/Inventory/components/SellPage'


const DetailsSellPage = () => {
    const router = useRouter()
    const { boxId } = router.query
    return <SellPageRun boxId={boxId}/>
}
  
DetailsSellPage.chains = [ChainId.BSC, ChainId.BSC_TESTNET]
  
export default DetailsSellPage

// export const getStaticPaths: GetStaticPaths = () => {
//     return {
//         paths: [{ params: { boxId: '' } }],
//         fallback: true,
//     }
// }

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const { boxId } = params
  
//   return {
//     redirect: {
//       statusCode: 301,
//       destination: `/detailssell/${boxId}`,
//     },
//   }

// }