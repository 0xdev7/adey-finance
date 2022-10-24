export const GRAPE_TICKER = 'AKUSD';
export const WINE_TICKER = 'AKSHARE';
export const GBOND_TICKER = 'AKBOND';
export const MIM_TICKER = 'BUSD';

// Protip: this is TraderJoe Router. The reason why it's called SPOOKY_ROUTER_ADDR is because it was originally SpookySwap.
export const SPOOKY_ROUTER_ADDR = '0x10ED43C718714eb63d5aA57B78B54704E256024E';
export const SW_ROUTER_ADDR = '0xC7f372c62238f6a5b79136A9e5D16A2FD7A3f0F5';
// This is our zapper.
export const ZAPPER_ROUTER_ADDR = '0x201e4D3dc3a06E3a146B21676DE6132B7A707119';
// This is our zapper for swap sicle.
export const SW_ZAPPER_ROUTER_ADDR = '0xb766434e15B902159186DF2dD1891255bF391396';

// Literally no purpose but keep it in so
// like 500 files won't break.
export const TAX_OFFICE_ADDR = '0x2A637BEE0D76136d8ee44B96cf0A5f9198657AaF';

export const NFT_TICKET_COUNT = 9600;
export const GRAPE_NODE_MULTIPLIER = 1;
export const WINE_NODE_MULTIPLIER = 10;
export const GRAPEMIMSW_NODE_MULTIPLIER = 1;
export const GOON_MULTIPLIER = 1;
export const GLASS_MULTIPLIER = 3;
export const DECANTER_MULTIPLIER = 9;
export const GOBLET_MULTIPLIER = 30;

export const useGetMultiplierForNode = (tokenName: string) => {
  if (tokenName === 'AKSHARE') {
    return WINE_NODE_MULTIPLIER;
  } else if (tokenName === 'AKUSD') {
    return GRAPE_NODE_MULTIPLIER;
  } else if (tokenName === 'AKUSD-BUSD-LP') {
    return GRAPEMIMSW_NODE_MULTIPLIER;
  } else if (tokenName === 'AKUSD-WLRS-LP') {
    return 0;
  }
  return 0;
};
