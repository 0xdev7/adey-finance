import { Configuration } from './grape-finance/config';
import { BankInfo } from './grape-finance';
import { ExtinctionPoolInfo } from './grape-finance/types';
const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: 56,
    networkName: 'BSC',
    ftmscanUrl: 'https://bscscan.com/',
    defaultProvider: 'https://bsc-dataseed.binance.org/',
    deployments: require('./grape-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      WBNB: ['0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18],
      BUSD: ['0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 18],
      AKUSD: ['0xd25e8D31C43133Af6E5321228E19EC4CbA66718d', 18],
      AKSHARE: ['0xEfB73202a463Ab78B674F64290fdaD6c75009Bf7', 18],
      SOFT: ['0x4fF64c5141153fc9310815aF7d4d860DAcbCf64d', 18],
      'AKUSD-BUSD-LP': ['0xb45740a83aed18d2334448ab02e28b77738ed5e7', 18],
      'AKSHARE-WBNB-LP': ['0xbaf747fdfdec6d2a2060c6a326357b3045802084', 18],
      'AKSHARE-BUSD-LP': ['0x2630b228e5a5f0153edb318914bf8e7e96e75c77', 18],
      'SOFT-BUSD-LP': ['0x691C657d4F03468b46D5074c6661517F05659299', 18],
      'SOFT-AKSHARE-LP': ['0x00cB5b42684DA62909665d8151fF80D1567722c3', 18],
      'WBNB-BUSD-LP': ['0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16', 18],
    },
    baseLaunchDate: new Date('2022-1-13 17:00:00Z'),
    bondLaunchesAt: new Date('2020-01-03T15:00:00Z'),
    boardroomLaunchesAt: new Date('2022-1-18T00:00:00Z'),
    refreshInterval: 10000,
  },
  production: {
    chainId: 56,
    networkName: 'BSC',
    ftmscanUrl: 'https://bscscan.com/',
    defaultProvider: 'https://bsc-dataseed.binance.org/',
    deployments: require('./grape-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      WBNB: ['0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18],
      BUSD: ['0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 18],
      AKUSD: ['0xd25e8D31C43133Af6E5321228E19EC4CbA66718d', 18],
      AKSHARE: ['0xEfB73202a463Ab78B674F64290fdaD6c75009Bf7', 18],
      SOFT: ['0x4fF64c5141153fc9310815aF7d4d860DAcbCf64d', 18],
      'AKUSD-BUSD-LP': ['0xb45740a83aed18d2334448ab02e28b77738ed5e7', 18],
      'AKSHARE-WBNB-LP': ['0xbaf747fdfdec6d2a2060c6a326357b3045802084', 18],
      'AKSHARE-BUSD-LP': ['0x2630b228e5a5f0153edb318914bf8e7e96e75c77', 18],
      'SOFT-BUSD-LP': ['0x691C657d4F03468b46D5074c6661517F05659299', 18],
      'SOFT-AKSHARE-LP': ['0x9E8abB3A78cF9Ae9D6eA3282566e36B91C92db5b', 18],
      'WBNB-BUSD-LP': ['0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16', 18],
    },
    baseLaunchDate: new Date('2021-12-30 1:00:00Z'),
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    boardroomLaunchesAt: new Date('2021-12-30T00:00:00Z'),
    refreshInterval: 10000,
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  /*
  Explanation:
  name: description of the card
  poolId: the poolId assigned in the contract
  sectionInUI: way to distinguish in which of the 3 pool groups it should be listed
        - 0 = Single asset stake pools
        - 1 = LP asset staking rewarding AKUSD
        - 2 = LP asset staking rewarding AKSHARE
  contract: the contract name which will be loaded from the deployment.environmnet.json
  depositTokenName : the name of the token to be deposited
  firstDepositTokenName : name of the first token to be deposited
  secondDepositTokenName : name of the second token to be deposited
  earnTokenName: the rewarded token
  finished: will disable the pool on the UI if set to true
  sort: the order of the pool
  */
  GrapeMimLPWineRewardPool: {
    name: 'Earn AKSHARE with AKUSD-BUSD LP',
    poolId: 2,
    sectionInUI: 2,
    contract: 'GrapeMimLPWineRewardPool',
    depositTokenName: 'AKUSD-BUSD-LP',
    firstDepositTokenName: 'BUSD',
    secondDepositTokenName: 'AKUSD',
    earnTokenName: 'AKSHARE',
    finished: false,
    sort: 0,
    closedForStaking: false,
    multi: '48.64',
    buyLink:
      'https://traderjoexyz.com/trade?inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&outputCurrency=0xd25e8D31C43133Af6E5321228E19EC4CbA66718d#/',
  },
  WineMimLPWineRewardPool: {
    name: 'Earn AKSHARE with AKSHARE-WBNB LP',
    poolId: 1,
    sectionInUI: 2,
    contract: 'WineMimLPWineRewardPool',
    depositTokenName: 'AKSHARE-WBNB-LP',
    firstDepositTokenName: 'WBNB',
    secondDepositTokenName: 'AKSHARE',
    earnTokenName: 'AKSHARE',
    finished: false,
    sort: 1,
    closedForStaking: false,
    multi: '10.81',
    buyLink:
      'https://traderjoexyz.com/trade?inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&outputCurrency=0xEfB73202a463Ab78B674F64290fdaD6c75009Bf7#/',
  },
  GrapeWineLPWineRewardPool: {
    name: 'Earn AKSHARE with SOFT-BUSD LP',
    poolId: 3,
    sectionInUI: 2,
    contract: 'GrapeWineLPWineRewardPool',
    depositTokenName: 'SOFT-BUSD-LP',
    firstDepositTokenName: 'BUSD',
    secondDepositTokenName: 'SOFT',
    earnTokenName: 'AKSHARE',
    finished: false,
    sort: 2,
    closedForStaking: false,
    multi: '3.70',
    buyLink:
      'https://traderjoexyz.com/trade?inputCurrency=0xEfB73202a463Ab78B674F64290fdaD6c75009Bf7&outputCurrency=0xd25e8D31C43133Af6E5321228E19EC4CbA66718d#/',
  },
};
export const extinctionPoolDefinitions: { [contractName: string]: ExtinctionPoolInfo } = {
  AmesExtinction: {
    name: 'AMES Peg Pool 1',
    contract: 'AmesExtinction',
    depositTokenName: 'AMES',
  },
};

export default configurations[process.env.NODE_ENV || 'production'];
