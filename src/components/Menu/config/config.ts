import { ContextApi } from '@pancakeswap/localization'
import {
  EarnFillIcon,
  EarnIcon, MenuItemsType, ExChangeFillIcon, ExChangeIcon, MarketplaceIcon, MarketplaceFillIcon, AccountFilledIcon, AccountIcon, PartnerFillIcon, PartnerIcon

} from '@pancakeswap/uikit'
import { ChainId } from '@pancakeswap/sdk'
import { DropdownMenuItems } from '@pancakeswap/uikit/src/components/DropdownMenu/types'
import { SUPPORT_ONLY_BSC, SUPPORT_ZAP } from 'config/constants/supportChains'

export type ConfigMenuDropDownItemsType = DropdownMenuItems & { hideSubNav?: boolean }
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & { hideSubNav?: boolean; image?: string } & {
  items?: ConfigMenuDropDownItemsType[]
}

const addMenuItemSupported = (item, chainId) => {
  if (!chainId || !item.supportChainIds) {
    return item
  }
  if (item.supportChainIds?.includes(chainId)) {
    return item
  }
  return {
    ...item,
    disabled: true,
  }
}

const config: (
  t: ContextApi['t'],
  isDark: boolean,
  languageCode?: string,
  chainId?: number,
) => ConfigMenuItemsType[] = (t, isDark, languageCode, chainId) =>
    [
      {
        label: t('Game'),
        icon: MarketplaceIcon,
        fillIcon: MarketplaceFillIcon,
        href: '/flyingdoge',
        showItemsOnMobile: false,
        items:
          [

          ].map((item) => addMenuItemSupported(item, chainId))
      },
      {
        label: t('Pre-sale'),
        icon: EarnIcon,
        fillIcon: EarnFillIcon,
        href: '/launchpad',
        showItemsOnMobile: false,
        items: [

        ].map((item) => addMenuItemSupported(item, chainId)),
      },
      {
        label: t('Lucky Box'),
        icon: EarnIcon,
        fillIcon: EarnFillIcon,
        href: '/luckybox',
        showItemsOnMobile: false,
        items: [

        ].map((item) => addMenuItemSupported(item, chainId)),
      },
      {
        label: t('Account'),
        icon: AccountIcon,
        fillIcon: AccountFilledIcon,
        href: '/inventory',
        showItemsOnMobile: false,
        items: [

        ].map((item) => addMenuItemSupported(item, chainId)),
      },
    ].map((item) => addMenuItemSupported(item, chainId))

export default config
