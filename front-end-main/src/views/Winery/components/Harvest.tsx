import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Box, Button, Card, CardContent, Grid, Typography } from '@material-ui/core';

import TokenSymbol from '../../../components/TokenSymbol';
import Label from '../../../components/Label';
import Value from '../../../components/Value';
import CardIcon from '../../../components/CardIcon';
import useClaimRewardTimerBoardroom from '../../../hooks/boardroom/useClaimRewardTimerBoardroom';
import useClaimRewardCheck from '../../../hooks/boardroom/useClaimRewardCheck';
import ProgressCountdown from './ProgressCountdown';
import useHarvestFromBoardroom from '../../../hooks/useHarvestFromBoardroom';
import useEarningsOnBoardroom from '../../../hooks/useEarningsOnBoardroom';
import useGrapeStats from '../../../hooks/useGrapeStats';
import { getDisplayBalance } from '../../../utils/formatBalance';
import ReactTooltip from 'react-tooltip';
import rewards from '../../../assets/jsons/rewards.json';
import dogiImg from '../../../assets/img/dogi-removebg-preview.png';
import wideImg from '../../../assets/img/wide-removebg-preview.png';
import guyImg from '../../../assets/img/guy-removebg-preview.png';
import colorImg from '../../../assets/img/color-removebg-preview.png';
import babiImg from '../../../assets/img/babi-removebg-preview.png';

const Harvest: React.FC = () => {
  const grapeStats = useGrapeStats();
  const { onReward } = useHarvestFromBoardroom();
  const earnings = useEarningsOnBoardroom();
  const canClaimReward = useClaimRewardCheck();

  const tokenPriceInDollars = useMemo(
    () => (grapeStats ? Number(grapeStats.priceInDollars).toFixed(2) : null),
    [grapeStats],
  );

  const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);

  const { from, to } = useClaimRewardTimerBoardroom();

  return (
    <>
      <Grid style={{ textAlign: 'center', zIndex: 1000 }}>
        <TokenSymbol height={70} width={70} symbol="SOFT" />
      </Grid>
      <Grid
        style={{
          background: 'white',
          border: '1px solid black',
          borderRadius: '200px',
          textAlign: 'center',
          marginTop: '-20px',
          zIndex: 100,
        }}
      >
        <Typography variant="h4" style={{ color: '#225D14' }}>
          SOFT
        </Typography>
        <Grid container justifyContent="space-between" style={{ padding: '0px 20px', marginTop: '-10px' }}>
          <img src={dogiImg} width="15%" />
          <img src={wideImg} width="15%" />
          <img src={guyImg} width="15%" />
          <img src={colorImg} width="15%" />
          <img src={babiImg} width="15%" />
        </Grid>
      </Grid>
      <Box>
        <Card style={{ marginTop: '-30px', boxShadow: 'none' }}>
          <CardContent>
            <StyledCardContentInner style={{ boxShadow: '0px 0px 2px 0px black', margin: '-10px 20px' }}>
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderTop: '90px solid #212652',
                  borderBottom: '10px solid transparent',
                  borderLeft: '50px solid transparent',
                  borderRight: '50px solid transparent',
                  zIndex: 1,
                }}
              ></div>
              <StyledCardHeader>
                <Typography variant="h5" style={{ color: '#212652' }}>
                  SOFT EARNED
                </Typography>
                <Typography variant="h5" style={{ color: '#212652' }}>{`$${Number(earnedInDollars).toLocaleString(
                  'en-US',
                )}`}</Typography>
              </StyledCardHeader>
              <StyledCardActions>
                <Grid container spacing={1} justifyContent="center">
                  <Grid item xs={8}>
                    <Button
                      onClick={onReward}
                      style={{ width: '100%' }}
                      className={earnings.eq(0) || !canClaimReward ? 'shinyButtonDisabled' : 'shinyButton'}
                      disabled={earnings.eq(0) || !canClaimReward}
                    >
                      Claim Reward
                    </Button>
                  </Grid>
                </Grid>
              </StyledCardActions>
            </StyledCardContentInner>
          </CardContent>
        </Card>
        <Box mt={2} style={{ color: '#FFF' }}>
          {canClaimReward ? (
            ''
          ) : (
            <Card>
              <CardContent>
                <Typography style={{ textAlign: 'center' }}>Claim possible in</Typography>
                <ProgressCountdown hideBar={true} base={from} deadline={to} description="Claim available in" />
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>
    </>
  );
};

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[5]}px;
  width: 100%;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Harvest;
