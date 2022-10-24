import React, { useCallback, useMemo, useState } from 'react';
import Page from '../../components/Page';
import { createGlobalStyle } from 'styled-components';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import UnlockWallet from '../../components/UnlockWallet';
import ExchangeCard from './components/ExchangeCard';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';
import useBondStats from '../../hooks/useBondStats';
import useGrapeFinance from '../../hooks/useGrapeFinance';
import useCashPriceInLastTWAP from '../../hooks/useCashPriceInLastTWAP';
import { useTransactionAdder } from '../../state/transactions/hooks';
import ExchangeStat from './components/ExchangeStat';
import useTokenBalance from '../../hooks/useTokenBalance';
import useBondsPurchasable from '../../hooks/useBondsPurchasable';
import { getDisplayBalance } from '../../utils/formatBalance';
import { BOND_REDEEM_PRICE, BOND_REDEEM_PRICE_BN } from '../../grape-finance/constants';
import { Alert } from '@material-ui/lab';
import { roundAndFormatNumber } from '../../0x';
import BondEstimatorModal from './BondEstimatorModal';
import SwapVerticalCircleIcon from '@material-ui/icons/SwapVerticalCircle';

import HomeImage from '../../assets/img/background.jpg';
import { Grid, Typography, Box } from '@material-ui/core';
import { Box as MetarialBox } from '@mui/material';

const BackgroundImage = createGlobalStyle`
  body {
    //background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background: #545454
  }
`;

const Bond: React.FC = () => {
  const { account } = useWallet();
  const grapeFinance = useGrapeFinance();
  const addTransaction = useTransactionAdder();
  const bondStat = useBondStats();
  const cashPrice = useCashPriceInLastTWAP();

  const bondsPurchasable = useBondsPurchasable();

  const bondBalance = useTokenBalance(grapeFinance?.GBOND);
  const memoizedBondBalance = useMemo(() => {
    return bondBalance != null && Number(bondBalance) > 0 ? bondBalance : null;
  }, [bondBalance]);

  const handleBuyBonds = useCallback(
    async (amount: string) => {
      const tx = await grapeFinance.buyBonds(amount);
      addTransaction(tx, {
        summary: `Buy ${Number(amount).toFixed(2)} AKBOND with ${amount} AKUSD`,
      });
    },
    [grapeFinance, addTransaction],
  );

  const handleRedeemBonds = useCallback(
    async (amount: string) => {
      const tx = await grapeFinance.redeemBonds(amount);
      addTransaction(tx, { summary: `Redeem ${amount} AKBOND` });
    },
    [grapeFinance, addTransaction],
  );

  const isBondRedeemable = useMemo(() => cashPrice.gt(BOND_REDEEM_PRICE_BN), [cashPrice]);
  const isBondPurchasable = useMemo(() => Number(bondStat?.tokenInFtm) < 1.01, [bondStat]);
  const grapeReserves = useMemo(() => (Number(bondStat?.treasuryGrapes) / 1e18).toFixed(0), [bondStat]);
  const bondSupply = useMemo(() => bondStat?.circulatingSupply, [bondStat]);
  const bondScale = (Number(cashPrice) / 1e18).toFixed(2);

  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  return (
    <Switch>
      <Page>
        <BackgroundImage />{' '}
        {!!account ? (
          <>
            {memoizedBondBalance && (
              <BondEstimatorModal
                open={modalOpen}
                walletBondAmount={Number(memoizedBondBalance) / Math.pow(10, 18)}
                handleClose={handleCloseModal}
              />
            )}
            <Typography color="textPrimary" align="center" variant="h3" gutterBottom>
              ADEY'S BOND
            </Typography>
            <MetarialBox mt={2}>
              <Grid item xs={12} sm={12} style={{ margin: '18px', display: 'flex', textAlign: 'center' }}>
                <Alert variant="filled" severity="error">
                  <b>Bonds are emitted & premiums redeemable based on last epoch TWAP prices not the current TWAP!</b>
                </Alert>
              </Grid>
            </MetarialBox>
            {/* <MetarialBox
              onClick={handleOpenModal}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '2px',
                cursor: 'pointer',
              }}
            >
              <Typography style={{ fontSize: '15px', color: 'white' }}>
                <u>Estimate your GBonds redeem bonus</u>
              </Typography>
              <SwapVerticalCircleIcon style={{ color: 'white' }} />
            </MetarialBox> */}
            <StyledBond>
              <StyledCardWrapper>
                <ExchangeCard
                  action="Purchase"
                  fromToken={grapeFinance.GRAPE}
                  fromTokenName="AKUSD"
                  toToken={grapeFinance.GBOND}
                  toTokenName="AKBOND"
                  priceDesc={
                    !isBondPurchasable
                      ? 'AKUSD is over peg'
                      : getDisplayBalance(bondsPurchasable, 18, 4) + ' AKUSD available for purchase'
                  }
                  onExchange={handleBuyBonds}
                />
              </StyledCardWrapper>
              <StyledStatsWrapper style={{ marginTop: '50px' }}>
                <Grid style={{ backgroundColor: '#212652' }}>
                  <ExchangeStat
                    tokenName="1 AKUSD"
                    description="Last-Hour TWAP Price"
                    //price={Number(grapeStat?.tokenInFtm).toFixed(4) || '-'}
                    price={bondScale || '-'}
                  />
                  <hr style={{ margin: '0px 10px' }}></hr>
                  <ExchangeStat
                    tokenName="1 AKUSD"
                    description="Bond Price"
                    price={Number(bondStat?.tokenInFtm).toFixed(2) || '-'}
                  />
                </Grid>

                <MetarialBox mt={3}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    style={{
                      textAlign: 'center',
                      color: '#ECCD0A',
                      backgroundColor: '#212652',
                      fontSize: '12px',
                      padding: '10px',
                    }}
                  >
                    <b>AKUSD Reserves:</b>{' '}
                    {bondStat?.treasuryGrapes ? roundAndFormatNumber(Number(grapeReserves), 0) : '-'}
                    <br></br>
                    <b>Bond supply:</b>{' '}
                    {bondStat?.circulatingSupply ? roundAndFormatNumber(Number(bondSupply), 0) : '-'} <br></br>
                    <b>When reserves are {'>'} bond supply debt phase has finished</b>
                  </Grid>
                </MetarialBox>
              </StyledStatsWrapper>
              <StyledCardWrapper>
                <ExchangeCard
                  action="Redeem"
                  fromToken={grapeFinance.GBOND}
                  fromTokenName="AKBOND"
                  toToken={grapeFinance.GRAPE}
                  toTokenName="AKUSD"
                  priceDesc={`${getDisplayBalance(bondBalance)} AKUSD Available in wallet`}
                  onExchange={handleRedeemBonds}
                  disabledDescription={!isBondRedeemable ? `Enabled when 1 AKUSD > $${BOND_REDEEM_PRICE}` : null}
                />
              </StyledCardWrapper>
            </StyledBond>
          </>
        ) : (
          <UnlockWallet />
        )}
      </Page>
    </Switch>
  );
};

const StyledBond = styled.div`
  display: flex;
  align-items: center;

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

const StyledStatsWrapper = styled.div`
  display: flex;
  flex: 0.8;
  margin: 0 20px;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 80%;
    margin: 16px 0;
  }
`;

export default Bond;
