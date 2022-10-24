import React, { useMemo } from 'react';
import { useWallet } from 'use-wallet';
import moment from 'moment';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';
import Harvest from './components/Harvest';
import Stake from './components/Stake';
import { makeStyles } from '@material-ui/core/styles';

import { Box, Card, CardContent, Button, Typography, Grid } from '@material-ui/core';

import { Alert } from '@material-ui/lab';

import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';
import useGrapeFinance from '../../hooks/useGrapeFinance';
import useRedeemOnBoardroom from '../../hooks/useRedeemOnBoardroom';
import useStakedBalanceOnBoardroom from '../../hooks/useStakedBalanceOnBoardroom';
import { getDisplayBalance } from '../../utils/formatBalance';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import useFetchBoardroomAPR from '../../hooks/useFetchBoardroomAPR';
import useStakedTokenPriceInDollars from '../../hooks/useStakedTokenPriceInDollars';
import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import useTotalStakedOnBoardroom from '../../hooks/useTotalStakedOnBoardroom';
import useClaimRewardCheck from '../../hooks/boardroom/useClaimRewardCheck';
import useWithdrawCheck from '../../hooks/boardroom/useWithdrawCheck';
import ProgressCountdown from './components/ProgressCountdown';
import { createGlobalStyle } from 'styled-components';
import HomeImage from '../../assets/img/background.jpg';
import usebShareStats from '../../hooks/useWineStats';
import useBondStats from '../../hooks/useBondStats';
import { roundAndFormatNumber } from '../../0x';
import useGetBoardroomPrintRate from '../../hooks/useGetBoardroomPrintRate';

const BackgroundImage = createGlobalStyle`
  body {
    //background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background: #545454
  }
`;

const useStyles = makeStyles((theme) => ({
  gridItem: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      height: '90px',
    },
  },
}));

const Boardroom = () => {
  const grapeFinance = useGrapeFinance();
  const classes = useStyles();
  const { account } = useWallet();
  const { onRedeem } = useRedeemOnBoardroom();
  const stakedBalance = useStakedBalanceOnBoardroom();
  const currentEpoch = useCurrentEpoch();
  const printRate = useGetBoardroomPrintRate();
  const cashStat = useCashPriceInEstimatedTWAP();
  const totalStaked = useTotalStakedOnBoardroom();
  const boardroomAPR = useFetchBoardroomAPR();
  const canClaimReward = useClaimRewardCheck();
  const canWithdraw = useWithdrawCheck();
  const bShareStats = usebShareStats();
  const scalingFactor = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);
  const { to } = useTreasuryAllocationTimes();
  const bondStat = useBondStats();

  const stakedTokenPriceInDollars = useStakedTokenPriceInDollars('AKSHARE', grapeFinance.WINE);
  const tokenPriceInDollars = useMemo(
    () =>
      stakedTokenPriceInDollars
        ? (Number(stakedTokenPriceInDollars) * Number(getDisplayBalance(stakedBalance))).toFixed(2).toString()
        : null,
    [stakedTokenPriceInDollars, stakedBalance],
  );
  const rewards = (boardroomAPR.toFixed(2) / 365 / 100) * tokenPriceInDollars;

  const bShareCirculatingSupply = useMemo(() => (bShareStats ? bShareStats.circulatingSupply : null), [bShareStats]);
  const percentageStaked = (totalStaked / bShareCirculatingSupply / 1e16).toFixed(2);
  const stake = Number(getDisplayBalance(totalStaked)).toFixed(0);
  const tvl = stake * stakedTokenPriceInDollars;

  const grapeReserves = useMemo(() => (Number(bondStat?.treasuryGrapes) / 1e18).toFixed(0), [bondStat]);
  const bondSupply = useMemo(() => bondStat?.circulatingSupply, [bondStat]);

  return (
    <Page>
      <BackgroundImage />

      {!!account ? (
        <>
          <Typography color="textPrimary" align="center" variant="h3" gutterBottom>
            HIGH YIELD MARKET
          </Typography>
          {/* 
          {bondStat && bondSupply - grapeReserves > 0 && (
            <Box mt={2}>
              <Grid item justify="center">
                <Alert variant="outlined" severity="warning">
                  <div>
                    Winery APR is temporarly reduced during debt phase. Debt is paid by the Winery when an epoch ends
                    above 1.01 TWAP. Once Grape reserves are higher than bond supply, debt phase ends, and normal APR
                    resumes.
                  </div>
                  <b>Grape Reserves:</b>{' '}
                  {bondStat?.treasuryGrapes ? roundAndFormatNumber(Number(grapeReserves), 0) : '-'} {'  |  '}
                  <b>Bond supply:</b> {bondStat?.circulatingSupply ? roundAndFormatNumber(Number(bondSupply), 0) : '-'}{' '}
                  {'  |  '}
                  <b>Debt to be paid by Winery:</b>{' '}
                  {bondStat?.circulatingSupply
                    ? roundAndFormatNumber(Number(bondSupply) - Number(grapeReserves), 0)
                    : '-'}
                  <br />
                </Alert>
              </Grid>
            </Box>
          )} */}

          <Box mt={2}>
            <Grid
              container
              spacing={3}
              style={{ backgroundColor: '#212652', borderRadius: '30px', justifyContent: 'center' }}
            >
              <Grid
                item
                xs={6}
                md={4}
                lg={4}
                className={classes.gridItem}
                style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}
              >
                <Typography variant="h5" style={{ textTransform: 'uppercase', color: 'white' }}>
                  DAILY APR
                </Typography>
                <Typography variant="h6" style={{ color: 'white' }}>
                  {(boardroomAPR / 365).toFixed(2)}%
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                md={4}
                lg={4}
                className={classes.gridItem}
                style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}
              >
                <Typography variant="h5" style={{ textTransform: 'uppercase', color: 'white' }}>
                  TOTAL VALUE LOCKED
                </Typography>
                <Typography variant="h6" style={{ color: 'white' }}>
                  ${tvl ? Number(Number(tvl).toFixed(0)).toLocaleString('en-US') : '-.--'}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                md={4}
                lg={4}
                className={classes.gridItem}
                style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}
              >
                <Typography variant="h5" style={{ textTransform: 'uppercase', color: 'white' }}>
                  YEARLY APR
                </Typography>
                <Typography variant="h6" style={{ color: 'white' }}>
                  {boardroomAPR.toFixed(2)}%
                </Typography>
              </Grid>
            </Grid>

            <Box mt={6}>
              <StyledBoardroom>
                <StyledCardsWrapper>
                  <StyledCardWrapper>
                    <Harvest />
                  </StyledCardWrapper>
                  <Spacer />
                  <StyledCardWrapper>
                    <Stake />
                  </StyledCardWrapper>
                </StyledCardsWrapper>
              </StyledBoardroom>
            </Box>
          </Box>

          <Box mt={5}>
            <Grid container spacing={3} mt={10} style={{ justifyContent: 'center' }}>
              <Button
                disabled={stakedBalance.eq(0) || (!canWithdraw && !canClaimReward)}
                onClick={onRedeem}
                className={
                  stakedBalance.eq(0) || (!canWithdraw && !canClaimReward)
                    ? 'shinyButtonDisabledSecondary'
                    : 'shinyButton'
                }
              >
                Claim &amp; Withdraw
              </Button>
            </Grid>
          </Box>
          <Box mt={5}>
            <Grid
              container
              spacing={3}
              style={{ backgroundColor: '#212652', borderRadius: '30px', justifyContent: 'center' }}
            >
              <Grid
                item
                xs={12}
                className={classes.gridItem}
                style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}
              >
                <Typography variant="h5" style={{ textTransform: 'uppercase', color: '#EAFF45' }}>
                  WE CHOSE TO GIVE REWARDS IN BUSD IN ORDER TO GIVE STABILITY TO INVESTORS EARNINGS
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </>
      ) : (
        <UnlockWallet />
      )}
    </Page>
  );
};

const StyledBoardroom = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
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

export default Boardroom;
