import React, { useMemo, useState } from 'react';
import Page from '../../components/Page';
import InfoCard from '../../components/InfoCard';
import LPInfoCard from '../../components/LPInfoCard';
import { createGlobalStyle } from 'styled-components';
import CountUp from 'react-countup';
import useGrapeStats from '../../hooks/useGrapeStats';
import useLpStats from '../../hooks/useLpStats';
import useLpStatsBTC from '../../hooks/useLpStatsBTC';
import useBondStats from '../../hooks/useBondStats';
import useWineStats from '../../hooks/useWineStats';
import useSoftStats from '../../hooks/useSoftStats';
import useGrapeTotalNode from '../../hooks/useGrapeTotalNodes';
import useWineTotalNode from '../../hooks/useWineTotalNodes';
import useGrapeMimSWTotalNode from '../../hooks/useGrapeMimSWTotalNode';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import useNodeRewardPoolStats from '../../hooks/useNodesRewardBalance';
import { roundAndFormatNumber } from '../../0x';
import { Button, Card, CardContent, Grid, Paper, CircularProgress, Typography } from '@material-ui/core';
import kyc from '../../assets/img/kyc.png';
import heroImg from '../../assets/img/hero.png';
import audit from '../../assets/img/audit1.png';
import HomeImage from '../../assets/img/background.jpg';
import grapeGold from '../../assets/img/golden-grape.png';
import pressImg from '../../assets/img/barrel.png';
import danceImg from '../../assets/img/dance-removebg-preview.png';
import farmImg from '../../assets/img/farm-removebg-preview.png';
import playImg from '../../assets/img/play-removebg-preview.png';
import upImg from '../../assets/img/up-removebg-preview.png';
import tvlImg from '../../assets/img/tvl-removebg-preview.png';
import newsImg from '../../assets/img/news.png';
import strategy1 from '../../assets/img/strategy1.jpg';
import strategy2 from '../../assets/img/strategy2.jpg';
import strategy3 from '../../assets/img/strategy3.jpg';
import { ReactComponent as IconTelegram } from '../../assets/img/telegram.svg';
import { ReactComponent as IconDiscord } from '../../assets/img/discord.svg';
import { ReactComponent as IconTwitter } from '../../assets/img/twitter.svg';

import AirdropRewardModal from './AirdropRewardModal';
import GetStartedModal from './GetStartedModal';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import useGetBoardroomPrintRate from '../../hooks/useGetBoardroomPrintRate';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import Alert from '@mui/material/Alert';
import vintageImg from '../../assets/img/vintage-token.png';
import vintnersGif from '../../assets/img/vintners.gif';
import grapeMimImg from '../../assets/img/twap.png';

// import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';

const BackgroundImage = createGlobalStyle`
  body {
   //background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background: blue;
    ;
  }
`;

const Home = () => {
  const TVL = useTotalValueLocked();
  const grapemimLpStats = useLpStatsBTC('AKUSD-BUSD-LP');
  const bSharemimLpStats = useLpStats('AKSHARE-BUSD-LP');

  const newPair = useLpStats('SOFT-BUSD-LP');
  const grapeMimSWStats = useLpStats('AKUSD-BUSD-LP');

  const grapeStats = useGrapeStats();
  const bShareStats = useWineStats();
  const softStats = useSoftStats();
  const tBondStats = useBondStats();
  const nodeRewardPoolStats = useNodeRewardPoolStats();
  const useGrapeTotal = useGrapeTotalNode();
  const useWineTotal = useWineTotalNode();
  const useGrapeMimSWTotal = useGrapeMimSWTotalNode();
  const [rewardModelOpen, setModalOpen] = useState(false);
  const [getStartedModalOpen, setGetStartedModalOpen] = useState(false);
  const currentEpoch = useCurrentEpoch();

  const buyGrapeAddress =
    'https://app.bogged.finance/avax/swap?tokenIn=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&tokenOut=0xd25e8D31C43133Af6E5321228E19EC4CbA66718d';
  const buyWineAddress =
    'https://app.bogged.finance/avax/swap?tokenIn=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&tokenOut=0xEfB73202a463Ab78B674F64290fdaD6c75009Bf7';
  const buySoftAddress =
    'https://app.bogged.finance/avax/swap?tokenIn=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&tokenOut=0xEfB73202a463Ab78B674F64290fdaD6c75009Bf7';
  const wineChart = 'https://dexscreener.com/avalanche/0x00cb5b42684da62909665d8151ff80d1567722c3';
  const grapeChart = 'https://dexscreener.com/avalanche/0xb45740a83aed18d2334448ab02e28b77738ed5e7';

  const grapeLPStats = useMemo(() => (grapemimLpStats ? grapemimLpStats : null), [grapemimLpStats]);
  const wineLPStats = useMemo(() => (bSharemimLpStats ? bSharemimLpStats : null), [bSharemimLpStats]);
  const newPairLPStats = useMemo(() => (newPair ? newPair : null), [newPair]);
  const grapePriceInDollars = useMemo(
    () => (grapeStats ? Number(grapeStats.priceInDollars).toFixed(2) : null),
    [grapeStats],
  );
  const grapePriceInAVAX = useMemo(() => (grapeStats ? Number(grapeStats.tokenInFtm).toFixed(4) : null), [grapeStats]);
  const grapeCirculatingSupply = useMemo(
    () => (grapeStats ? Number(grapeStats.circulatingSupply) : null),
    [grapeStats],
  );
  const grapeTotalSupply = useMemo(() => (grapeStats ? Number(grapeStats.totalSupply) : null), [grapeStats]);

  const winePriceInDollars = useMemo(
    () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
    [bShareStats],
  );
  const softPriceInDollars = useMemo(
    () => (softStats ? Number(softStats.priceInDollars).toFixed(2) : null),
    [softStats],
  );

  const softCirculatingSupply = useMemo(() => (softStats ? String(softStats.circulatingSupply) : null), [softStats]);
  const softTotalSupply = useMemo(() => (softStats ? String(softStats.totalSupply) : null), [softStats]);

  const grapeMimSWPriceInDollars = useMemo(
    () => (grapeMimSWStats ? Number(grapeMimSWStats.priceOfOne).toFixed(2) : null),
    [grapeMimSWStats],
  );

  const bShareCirculatingSupply = useMemo(
    () => (bShareStats ? String(bShareStats.circulatingSupply) : null),
    [bShareStats],
  );
  const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );

  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  // const cashStat = useCashPriceInEstimatedTWAP();
  // const twap = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);

  const handleCloseModal = () => {
    setModalOpen(false);
    setGetStartedModalOpen(false);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const openGetStarted = () => {
    setGetStartedModalOpen(true);
  };

  const printRate = useGetBoardroomPrintRate();
  // const lastSnapshot = useBoardroomLastSnapshot();
  // const lastPrintAmount = useBoardroomLastPrintAmount();

  return (
    <Page>
      <GetStartedModal open={getStartedModalOpen} handleClose={handleCloseModal} />
      <AirdropRewardModal
        open={rewardModelOpen}
        handleClose={handleCloseModal}
        grapes={useGrapeTotal[0]}
        grapePrice={grapePriceInDollars}
        wines={useWineTotal[0]}
        winePrice={winePriceInDollars}
        grapeMimSW={useGrapeMimSWTotal[0]}
        grapeMimSWPrice={grapeMimSWPriceInDollars}
        totalGrapes={nodeRewardPoolStats?.grapes}
        totalWine={nodeRewardPoolStats?.wines}
        totalGrapeMimSW={nodeRewardPoolStats?.grapeMimSWs}
      />
      <BackgroundImage />
      <Grid container spacing={3}>
        {/* <Grid item xs={12} style={{color: 'white'}}>
          <Grid container justifyContent="space-between">
            <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
              <div>EPOCH</div>
              <div>
                {currentEpoch ? <CountUp end={currentEpoch} /> : <CircularProgress size={15} color="inherit" />}
              </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
              <div>ABOVE PEG</div>
              <div>
                {' '}
                {printRate ? <span>{printRate.toFixed(2)}%</span> : <CircularProgress size={15} color="inherit" />}
              </div>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
              <div>SUPPLY</div>
              <div>{grapeTotalSupply ? grapeTotalSupply : '--'}</div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
              <div>LAST EPOCH PRINTED</div>
              <div>616</div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
              <div>LAST EPOCH EXPANSION AMOUNT</div>
              <div>{13793195024491149517051 / 1e18}</div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
              <div>EXPANSION RATE</div>
              <div>800</div>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
              <div>CONTRACTION RATE</div>
              <div>800</div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
              <div>CONTRACTION AMOUNT</div>
              <div>800</div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
              <div>BUYS 24h</div>
              <div>800</div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
              <div>SELLS 24h</div>
              <div>800</div>
            </div>
          </Grid>
        </Grid> */}
        <Grid item xs={12} style={{ textAlign: 'left' }}>
          <p style={{ color: 'rgb(33 38 82)' }}>Dashboard</p>
          <p style={{ color: 'rgb(33 38 82)' }}>
            ADEY'S  KINGDOM is a decentralized organization providing an ecosystem of sustainable investment vehicles.
            Our protocols are designed to empower users by simplifying the advanced trading strategies employed by
            experienced investors while promoting growth through low-risk algorithmic trading models.
          </p>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={4}>
          <InfoCard
            name="AKUSD"
            color="#EAFF45"
            buyAddress={buyGrapeAddress}
            chartAddress={grapeChart}
            price={grapePriceInAVAX}
            circulatingSupply={grapeCirculatingSupply}
            totalSupply={grapeTotalSupply}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <InfoCard
            name="AKSHARE"
            color="#FF7134"
            buyAddress={buyWineAddress}
            chartAddress={wineChart}
            price={winePriceInDollars}
            circulatingSupply={bShareCirculatingSupply}
            totalSupply={bShareTotalSupply}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <InfoCard
            name="SOFT"
            color="#58A0FF"
            buyAddress={buySoftAddress}
            internalLink={true}
            price={softPriceInDollars}
            circulatingSupply={softCirculatingSupply}
            totalSupply={softTotalSupply}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <img alt="Dance" style={{ width: '100%' }} src={danceImg} />
            </Grid>
            <Grid item xs={9}>
              <Grid
                container
                spacing={3}
                style={{ backgroundColor: '#212652', borderRadius: '20px', padding: '20px', gap: '20px' }}
              >
                <Grid
                  item
                  style={{
                    flex: 1,
                    backgroundColor: '#EAFF45',
                    borderRadius: '15px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <img
                    alt="farm"
                    style={{
                      position: 'relative',
                      width: '120px',
                      height: '100px',
                      marginBottom: '-40px',
                      marginLeft: '-40px',
                    }}
                    src={farmImg}
                  />
                  <Typography
                    variant="h6"
                    style={{ color: '#263547', fontWeight: 700, diplay: 'flex', alignItems: 'center' }}
                    gutterBottom
                  >
                    FARMERS VILLAGE
                  </Typography>
                </Grid>
                <Grid
                  item
                  style={{
                    flex: 1,
                    backgroundColor: '#EAFF45',
                    borderRadius: '15px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <img
                    alt="play"
                    style={{
                      position: 'relative',
                      width: '110px',
                      height: '100px',
                      marginBottom: '-40px',
                      marginLeft: '-40px',
                    }}
                    src={playImg}
                  />
                  <Typography
                    variant="h6"
                    style={{ color: '#263547', fontWeight: 700, diplay: 'flex', alignItems: 'center' }}
                    gutterBottom
                  >
                    HOW TO PLAY
                  </Typography>
                </Grid>
                <Grid
                  item
                  style={{
                    flex: 1,
                    backgroundColor: '#EAFF45',
                    borderRadius: '15px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <img
                    alt="up"
                    style={{
                      position: 'relative',
                      width: '100px',
                      height: '100px',
                      marginBottom: '-40px',
                      marginLeft: '-40px',
                    }}
                    src={upImg}
                  />
                  <Typography
                    variant="h6"
                    style={{ color: '#263547', fontWeight: 700, diplay: 'flex', alignItems: 'center' }}
                    gutterBottom
                  >
                    HIGH YIELD MARKET
                  </Typography>
                </Grid>
                <Grid
                  item
                  style={{
                    flex: 1,
                    backgroundColor: '#EAFF45',
                    borderRadius: '15px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <img
                    alt="tvl"
                    style={{
                      position: 'relative',
                      width: '100px',
                      height: '100px',
                      marginBottom: '-40px',
                      marginLeft: '-40px',
                    }}
                    src={tvlImg}
                  />
                  <Typography variant="h6" style={{ color: '#263547', fontWeight: 700 }} gutterBottom>
                    tvl:
                    {TVL ? (
                      <CountUp end={TVL} separator="," prefix="$" />
                    ) : (
                      <CircularProgress style={{ marginTop: '20px' }} size={38} color="inherit" />
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{ color: 'white' }}>
                  ADEY'S ADVANTAGE is an algorithmic protocol with yield generating strategies and ETF rewards. WE RUN
                  OUR PLATFORM WITH THREE corresponding tokens – $AKUSD, AKSHARE AND SOFT. Our unique protocol offers a
                  single regulatory pool which controls the price of the USDEX.
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* <Grid item xs={12} sm={12} md={5}>
          <Grid container xs={12}>
            <Grid item xs={12} style={{ color: 'white' }}>
              <Card style={{ minHeight: '200px' }}>
                <CardContent>
                  <Typography color="textPrimary" variant="h4">
                    TOTAL VALUE LOCKED
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} style={{ marginTop: '20px' }}>
              <Card>
                <CardContent>
                  <Typography className="reward-pool-text" color="textPrimary" variant="h4" gutterBottom>
                    NFT REWARD POOL
                  </Typography>

                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <Grid container justifyContent="space-between">
                        <Grid item>
                          <Typography color="textPrimary" align="center" variant="h5">
                            {nodeRewardPoolStats?.grapes} Grape
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography color="textSecondary" align="center" variant="h5" style={{ fontWeight: 700 }}>
                            {nodeRewardPoolStats != null ? (
                              `≈$${roundAndFormatNumber(nodeRewardPoolStats?.grapes * grapePriceInDollars, 0)}`
                            ) : (
                              <CircularProgress size={22} color="inherit" />
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container justifyContent="space-between">
                        <Grid item>
                          <Typography color="textPrimary" align="center" variant="h5">
                            {nodeRewardPoolStats?.wines} Wine
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography color="textSecondary" align="center" variant="h5" style={{ fontWeight: 700 }}>
                            {nodeRewardPoolStats != null ? (
                              `≈$${roundAndFormatNumber(nodeRewardPoolStats?.wines * winePriceInDollars, 0)}`
                            ) : (
                              <CircularProgress size={22} color="inherit" />
                            )}{' '}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Button
                    onClick={handleOpenModal}
                    className="shinyButton"
                    style={{ width: '100%', marginTop: '10px' }}
                  >
                    Estimate my Rewards
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={12} md={12} lg={12} style={{ marginTop: '10px' }}>
          <Grid container spacing={3}>
            <Grid item xs={6} md={4} lg={2} style={{ color: 'white', textAlign: 'center' }}>
              <Typography color="textPrimary" variant="h6">
                EPOCH
              </Typography>{' '}
              {currentEpoch ? (
                <CountUp style={{ fontSize: '30px' }} end={currentEpoch} />
              ) : (
                <CircularProgress size={28} color="inherit" />
              )}
            </Grid>
            <Grid item xs={6} md={4} lg={2} style={{ color: 'white', textAlign: 'center' }}>
              <Typography color="textPrimary" variant="h6">
                Above Peg
              </Typography>
              {printRate ? (
                <span style={{ fontSize: '30px' }}>{printRate.toFixed(2)}%</span>
              ) : (
                <CircularProgress size={28} color="inherit" />
              )}
            </Grid>
            <Grid item xs={12} md={4} lg={3} style={{ color: 'white', textAlign: 'center' }}>
              <Typography color="textPrimary" variant="h6">
                Started On
              </Typography>
              <span style={{ fontSize: '30px' }}>Jan 16, 2022</span>
            </Grid>
            <Grid item xs={6} md={6} lg={2} style={{ color: 'white', textAlign: 'center' }}>
              <Typography color="textPrimary" variant="h6">
                KYC
              </Typography>
              <a
                href="https://twitter.com/0xGuard/status/1480457336082907137"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img alt="0xGuard KYC" style={{ height: '70px' }} src={kyc} />
              </a>
            </Grid>
            <Grid item xs={6} md={6} lg={2} style={{ color: 'white', textAlign: 'center' }}>
              <Typography color="textPrimary" variant="h6">
                Audit
              </Typography>
              <a href="https://grapefinance.app/audit.pdf" rel="noopener noreferrer" target="_blank">
                <img alt="0xGuard Audit" style={{ height: '50px' }} src={audit} />
              </a>
            </Grid>
          </Grid>
        </Grid>

        <Grid item lg={12} md={12} xs={12} sm={12}>
          <Paper style={{ height: '5px' }}></Paper>
        </Grid> */}

        {/* GRAPE */}
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <LPInfoCard
              name="AKUSD-BUSD-LP"
              color="#EAFF45"
              token1Name="AKUSD"
              token1Value={grapeLPStats?.tokenAmount}
              token2Name="BUSD"
              token2Value={grapeLPStats?.mimAmount}
              poolAddress="/vineyard/GrapeMimLPWineRewardPool"
              price={grapeLPStats?.priceOfOne}
              circulatingSupply={grapeLPStats?.totalLiquidity}
              totalSupply={grapeLPStats?.totalSupply}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <LPInfoCard
              name="AKSHARE-BUSD-LP"
              color="#FF7134"
              token1Name="AKSHARE"
              token1Value={wineLPStats?.tokenAmount}
              token2Name="BNB"
              token2Value={wineLPStats?.mimAmount}
              poolAddress="/vineyard/WineMimLPWineRewardPool"
              price={wineLPStats?.priceOfOne}
              circulatingSupply={wineLPStats?.totalLiquidity}
              totalSupply={wineLPStats?.totalSupply}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <LPInfoCard
              name="SOFT-BUSD-LP"
              color="#58A0FF"
              token1Name="SOFT"
              token1Value={newPairLPStats?.tokenAmount}
              token2Name="BUSD"
              token2Value={newPairLPStats?.mimAmount}
              poolAddress="/vineyard/GrapeWineLPWineRewardPool"
              price={newPairLPStats?.priceOfOne}
              circulatingSupply={newPairLPStats?.totalLiquidity}
              totalSupply={newPairLPStats?.totalSupply}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Typography
            variant="h2"
            style={{
              color: '#ffffff',
              fontWeight: 700,
              backgroundColor: '#212652',
              textAlign: 'center',
              marginTop: '40px',
              borderRadius: '20px',
            }}
            gutterBottom
          >
            STRATEGIES
          </Typography>{' '}
        </Grid>
      </Grid>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <img src={strategy1} width="100%" style={{ margin: '30px', borderRadius: '15px' }} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <img src={strategy2} width="100%" style={{ margin: '30px', borderRadius: '15px' }} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <img src={strategy3} width="100%" style={{ margin: '30px', borderRadius: '15px' }} />
        </Grid>
      </Grid>
    </Page>
  );
};

export default Home;
