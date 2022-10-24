import React, { useCallback, useMemo, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import { useWallet } from 'use-wallet';
import { Grid, Typography, Paper } from '@material-ui/core';

import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';

import useGrapeStats from '../../hooks/useGrapeStats';
import useWineStats from '../../hooks/useWineStats';
import useSoftStats from '../../hooks/useSoftStats';
import useBNBPrice from '../../hooks/useBNBPrice';

import akusdImg from '../../assets/img/grape.png';
import akshareImg from '../../assets/img/gshare.png';
import softImg from '../../assets/img/vintage-token.png';
import bnbImg from '../../assets/img/bnb.png';
import busdImg from '../../assets/img/busd.png';
import priceImg from '../../assets/img/price.svg';
import totalImg from '../../assets/img/total.svg';
import valueImg from '../../assets/img/value.svg';

const StyledPaper = styled.div`
  box-shadow: none;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 10px;
`;

const Dao = () => {
  const { account } = useWallet();

  const grapeStats = useGrapeStats();
  const wineStats = useWineStats();
  const softStats = useSoftStats();
  const bnbPrice = useBNBPrice();

  console.log(grapeStats);

  return (
    <Switch>
      <Page>
        {!!account ? (
          <>
            <Typography align="center" variant="h3" gutterBottom style={{ color: 'black', marginTop: '20px' }}>
              ADEY'S DAO
            </Typography>
            <Grid container>
              <Grid container item>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}>
                  <StyledPaper>
                    <img src={akusdImg} width="60%" />
                  </StyledPaper>
                </Grid>
                <Grid item xs={2}>
                  <StyledPaper>
                    <img src={akshareImg} width="60%" />
                  </StyledPaper>
                </Grid>
                <Grid item xs={2}>
                  <StyledPaper>
                    <img src={softImg} width="60%" />
                  </StyledPaper>
                </Grid>
                <Grid item xs={2}>
                  <StyledPaper>
                    <img src={bnbImg} width="60%" />
                  </StyledPaper>
                </Grid>
                <Grid item xs={2}>
                  <StyledPaper>
                    <img src={busdImg} width="60%" />
                  </StyledPaper>
                </Grid>
              </Grid>
              <Grid container item>
                <Grid item xs={2} style={{ textAlign: 'center', padding: '10px' }}>
                  <img src={priceImg} width="50%" />
                  <Typography>PRICE</Typography>
                </Grid>
                <Grid item xs={2}>
                  <StyledPaper>${grapeStats ? Number(grapeStats.priceInDollars).toFixed(2) : '0'}</StyledPaper>
                </Grid>
                <Grid item xs={2}>
                  <StyledPaper>${wineStats ? Number(wineStats.priceInDollars).toFixed(2) : '0'}</StyledPaper>
                </Grid>
                <Grid item xs={2}>
                  <StyledPaper>${softStats ? Number(softStats.priceInDollars).toFixed(2) : '0'}</StyledPaper>
                </Grid>
                <Grid item xs={2}>
                  <StyledPaper>${bnbPrice ? Number(bnbPrice).toFixed(2) : '0'}</StyledPaper>
                </Grid>
                <Grid item xs={2}>
                  <StyledPaper>$1</StyledPaper>
                </Grid>
              </Grid>
              <Grid container item>
                <Grid item xs={2} style={{ textAlign: 'center', padding: '10px' }}>
                  <img src={totalImg} width="50%" />
                  <Typography>TOTAL</Typography>
                </Grid>
                <Grid item xs={2}>
                  <StyledPaper>7,500,000</StyledPaper>
                </Grid>
                <Grid item xs={2}>
                  <StyledPaper>35,000</StyledPaper>
                </Grid>
                <Grid item xs={2}>
                  <StyledPaper>40,000</StyledPaper>
                </Grid>
                <Grid item xs={2}>
                  <StyledPaper>500</StyledPaper>
                </Grid>
                <Grid item xs={2}>
                  <StyledPaper>2,500,000.00</StyledPaper>
                </Grid>
              </Grid>
              <Grid container item>
                <Grid item xs={2} style={{ textAlign: 'center', padding: '10px' }}>
                  <img src={valueImg} width="50%" />
                  <Typography>VALUE</Typography>
                </Grid>
                <Grid item xs={2}>
                  <StyledPaper>$7,5000,000.00</StyledPaper>
                </Grid>
                <Grid item xs={2}>
                  <StyledPaper>$9,500,000.00</StyledPaper>
                </Grid>
                <Grid item xs={2}>
                  <StyledPaper>$5,500,000.00</StyledPaper>
                </Grid>
                <Grid item xs={2}>
                  <StyledPaper>$3,500,000.00</StyledPaper>
                </Grid>
                <Grid item xs={2}>
                  <StyledPaper>$2,500,000.00</StyledPaper>
                </Grid>
              </Grid>
            </Grid>
            <Grid style={{ backgroundColor: '#212652', padding: '15px', margin: '20px' }}>
              <Typography align="center" variant="h3" gutterBottom style={{ color: 'white', marginTop: '20px' }}>
                ASSET TOTAL VALUE: $9,231,000.00
              </Typography>
            </Grid>
          </>
        ) : (
          <UnlockWallet />
        )}
      </Page>
    </Switch>
  );
};
export default Dao;
