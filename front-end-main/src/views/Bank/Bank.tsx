import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import { makeStyles } from '@material-ui/core/styles';

import { Box, Button, Card, CardContent, Typography, Grid } from '@material-ui/core';

import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import UnlockWallet from '../../components/UnlockWallet';
import Harvest from './components/Harvest';
import HarvestHermes from './components/HarvestHermes';
import Stake from './components/Stake';
import useBank from '../../hooks/useBank';
import useStatsForPool from '../../hooks/useStatsForPool';

import useRedeem from '../../hooks/useRedeem';
import { Bank as BankEntity } from '../../grape-finance';

import { Alert } from '@material-ui/lab';
import useModal from '../../hooks/useModal';
import StratModal from './components/StratModal';
import zone1 from '../../assets/img/1.jpg';
import zone2 from '../../assets/img/2.jpg';
import zone3 from '../../assets/img/3.jpg';
import wampStrat from '../../assets/img/wamp-strat.jpg';
import useCashPriceInLastTWAP from '../../hooks/useCashPriceInLastTWAP';
import usebShareStats from '../../hooks/useWineStats';
const useStyles = makeStyles((theme) => ({
  gridItem: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      height: '90px',
    },
  },
}));

const Bank: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0));

  const classes = useStyles();
  // @ts-ignore
  const { bankId } = useParams();
  const bank = useBank(bankId);

  const { account } = useWallet();
  const { onRedeem } = useRedeem(bank);
  const statsOnPool = useStatsForPool(bank);
  const bShareStats = usebShareStats();
  const cashPrice = useCashPriceInLastTWAP();

  const bondScale = (Number(cashPrice) / 1e18).toFixed(2);
  const bSharePriceInDollars = useMemo(
    () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
    [bShareStats],
  );

  let curStrat: string;
  if (Number(bondScale) >= 2) {
    curStrat = zone1;
  } else if (Number(bondScale) < 2 && Number(bondScale) >= 1) {
    curStrat = zone2;
  } else {
    curStrat = zone3;
  }
  console.log(bank.depositTokenName);
  let name: string;
  let vaultUrl: string;
  let strat: string;
  let stratText: string;

  if (bank.depositTokenName.includes('AKUSD-BUSD')) {
    name = 'Autocompound your AKUSD-BUSD on Magik to buy back & burn AKUSD';
    vaultUrl = 'https://magik.farm/#/avax';
    strat = curStrat;
    stratText = 'Click here to see the optimal strategy for this vault';
  } else if (bank.depositTokenName.includes('WINE-BUSD')) {
    name = 'Autocompound your WINE-BUSD on Magik to buy back & burn AKUSD';
    vaultUrl = 'https://magik.farm/#/avax';
    strat = curStrat;
    stratText = 'Click here to see the optimal strategy for this vault';
  } else if (bank.depositTokenName.includes('AKUSD-WINE')) {
    name = 'Autocompound your AKUSD-WINE on Magik to buy back & burn AKUSD';
    vaultUrl = 'https://magik.farm/#/avax';
    strat = curStrat;
    stratText = 'Click here to see the optimal strategy for this vault';
  } else if (bank.depositTokenName === 'AKUSD') {
    name = 'Autocompound your AKUSD on Magik to buy back & burn AKUSD';
    vaultUrl = 'https://magik.farm/#/avax';
    strat = '';
    stratText = '';
  } else if (bank.depositTokenName === 'WINE-POPS-LP') {
    name = '';
    vaultUrl = '';
    strat = '';
    stratText = '';
  } else if (bank.depositTokenName === 'sVintage') {
    name = 'Get sVintage by staking Vintage in the Winemaker Cellar here';
    vaultUrl = 'https://winemaker.grapefinance.app/app/Cellar';
    strat = '';
    stratText = '';
  } else if (bank.depositTokenName === 'WAMP') {
    name = 'Get WAMP to stake for WINE here';
    vaultUrl = 'https://app.asgarddao.fi/#/pledge';
    strat = wampStrat;
    stratText = 'Click here to see the optimal strategy for this vault';
  }

  const [onPresentDeposit, onDismissDeposit] = useModal(<StratModal strat={strat} />);

  return account && bank ? (
    <>
      <Typography color="textPrimary" align="center" variant="h3" gutterBottom>
        {bank?.name}
      </Typography>

      {name !== '' ? (
        <Box mt={5}>
          <Grid container justify="center" spacing={3} style={{ marginBottom: '30px' }}>
            <Alert variant="filled">
              {' '}
              <a href={vaultUrl} target={'_blank'} rel="noopener noreferrer">
                <span style={{ color: '#fff' }}>{name}</span>
              </a>
            </Alert>
          </Grid>
        </Box>
      ) : null}

      {stratText !== '' ? (
        <Box mt={5}>
          <Grid container justify="center" spacing={3} style={{ marginBottom: '30px' }}>
            <Alert variant="filled">
              <a onClick={onPresentDeposit}>
                <span style={{ color: '#fff' }}>{stratText}</span>
              </a>
            </Alert>
          </Grid>
        </Box>
      ) : null}

      <Box>
        <Grid container justify="center" spacing={3} style={{ marginBottom: '50px' }}>
          <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
            <Card className={classes.gridItem}>
              <CardContent style={{ textAlign: 'center' }}>
                <Typography style={{ color: '#ccf' }}>Pool Wine p/day</Typography>
                <Typography>
                  {bank.closedForStaking ? '0.00' : bank.multi} | $
                  {Number((Number(bSharePriceInDollars) * Number(bank.multi)).toFixed(0)).toLocaleString('en-US')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
            <Card className={classes.gridItem}>
              <CardContent style={{ textAlign: 'center' }}>
                <Typography style={{ color: '#ccf' }}>APR | DAILY</Typography>
                <Typography>
                  {bank.closedForStaking ? '0.00' : statsOnPool?.yearlyAPR}% |{' '}
                  {bank.closedForStaking ? '0.00' : statsOnPool?.dailyAPR}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
            <Card className={classes.gridItem}>
              <CardContent style={{ textAlign: 'center' }}>
                <Typography style={{ color: '#ccf' }}>TVL</Typography>
                <Typography>
                  ${statsOnPool?.TVL ? Number(Number(statsOnPool?.TVL).toFixed(0)).toLocaleString('en-US') : '-.--'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box mt={5}>
        <StyledBank>
          <StyledCardsWrapper>
            <StyledCardWrapper>
              {bank.depositTokenName === 'HSHARE-WINE-LP' ? <HarvestHermes bank={bank} /> : <Harvest bank={bank} />}
            </StyledCardWrapper>
            <Spacer />
            <StyledCardWrapper>{<Stake bank={bank} />}</StyledCardWrapper>
          </StyledCardsWrapper>
          <Spacer size="lg" />
          {bank.depositTokenName.includes('LP') && <LPTokenHelpText bank={bank} />}
          {bank.depositTokenName.includes('SW') && <LPTokenHelpText bank={bank} />}
          <Spacer size="lg" />
          <div>
            <Button onClick={onRedeem} className="shinyButton">
              Claim &amp; Withdraw
            </Button>
          </div>
          <Spacer size="lg" />
        </StyledBank>
      </Box>
    </>
  ) : !bank ? (
    <BankNotFound />
  ) : (
    <UnlockWallet />
  );
};

const LPTokenHelpText: React.FC<{ bank: BankEntity }> = ({ bank }) => {
  let pairName: string;
  let uniswapUrl: string;
  let exchange: string;
  if (bank.depositTokenName == 'AKUSD-BUSD-LP') {
    pairName = 'AKUSD-BUSD pair';
    uniswapUrl =
      'https://traderjoexyz.com/pool/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56/0xd25e8D31C43133Af6E5321228E19EC4CbA66718d';
    exchange = 'joe';
  } else if (bank.depositTokenName == 'AKUSD-BUSD-LP') {
    pairName = 'AKUSD-BUSD-LP pair';
    uniswapUrl =
      'https://www.swapsicle.io/add/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56/0xd25e8D31C43133Af6E5321228E19EC4CbA66718d';
    exchange = 'Swapsicle';
  } else if (bank.depositTokenName.includes('WINE-BUSD')) {
    pairName = 'WINE-BUSD pair';
    uniswapUrl =
      'https://traderjoexyz.com/pool/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56/0xEfB73202a463Ab78B674F64290fdaD6c75009Bf7';
    exchange = 'joe';
  } else if (bank.depositTokenName.includes('GRAPE-WINE')) {
    pairName = 'GRAPE-WINE pair';
    uniswapUrl =
      'https://traderjoexyz.com/pool/0xd25e8D31C43133Af6E5321228E19EC4CbA66718d/0xEfB73202a463Ab78B674F64290fdaD6c75009Bf7';
    exchange = 'joe';
  } else if (bank.depositTokenName.includes('WINE-POPS')) {
    pairName = 'WINE-POPS pair';
    uniswapUrl =
      'https://www.swapsicle.io/add/0xEfB73202a463Ab78B674F64290fdaD6c75009Bf7/0x240248628B7B6850352764C5dFa50D1592A033A8';
    exchange = 'Swapsicle';
  }
  return (
    <Card>
      <CardContent>
        <StyledLink href={uniswapUrl} target="_blank" rel="noopener noreferrer">
          <span style={{ color: '#fff' }}>
            Provide liquidity for {pairName} on {exchange}
          </span>
        </StyledLink>
      </CardContent>
    </Card>
  );
};

const BankNotFound = () => {
  return (
    <Center>
      <PageHeader icon="🏚" title="Not Found" subtitle="You've hit a bank just robbed by unicorns." />
    </Center>
  );
};

const StyledBank = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledLink = styled.a`
  font-weight: 700;
  text-decoration: none;
  color: ${(props) => props.theme.color.primary.main};
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default Bank;
