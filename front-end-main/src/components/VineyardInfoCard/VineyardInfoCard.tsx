import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { getDisplayBalance } from '../../utils/formatBalance';
import useStatsForPool from '../../hooks/useStatsForPool';
import useEarnings from '../../hooks/useEarnings';
import useStakedBalance from '../../hooks/useStakedBalance';
import useStakedTokenPriceInDollars from '../../hooks/useStakedTokenPriceInDollars';
import useGrapeStats from '../../hooks/useGrapeStats';
import useShareStats from '../../hooks/useWineStats';
import Stake from './components/Stake';
import Harvest from './components/Harvest';
import { Bank } from '../../grape-finance';
import PoolCardHeader from '../PoolCardHeader';
import PoolCardContent from '../PoolCardContent';
import TokenSymbol from '../TokenSymbol';
import plantImg from '../../assets/img/plant-removebg-preview.png';

interface VineyardInfoCardProps {
  bank: Bank;
}

const VineyardInfoCard: React.FC<VineyardInfoCardProps> = ({ bank }) => {
  const statsOnPool = useStatsForPool(bank);
  const earnings = useEarnings(bank.contract, bank.earnTokenName, bank.poolId);
  const grapeStats = useGrapeStats();
  const tShareStats = useShareStats();
  const tokenStats = bank.earnTokenName === 'AKSHARE' ? tShareStats : grapeStats;

  const tokenPriceInDollars = useMemo(
    () => (tokenStats ? Number(tokenStats.priceInDollars).toFixed(2) : null),
    [tokenStats],
  );
  const earnedInToken = Number(getDisplayBalance(earnings));
  const earnedInDollars = (Number(tokenPriceInDollars) * earnedInToken).toFixed(2);

  const stakedBalance = useStakedBalance(bank.contract, bank.poolId);
  const stakedInToken = Number(getDisplayBalance(stakedBalance, bank.depositToken.decimal));
  const stakedTokenPriceInDollars = useStakedTokenPriceInDollars(bank.depositTokenName, bank.depositToken);
  const stakedInDollars = (Number(stakedTokenPriceInDollars) * stakedInToken).toFixed(2);

  const backColor = ['#EAFF45', '#FF7134', '#58A0FF'];

  return (
    <Grid item xs={12} sm={12} md={6} lg={4}>
      <Grid container justifyContent="space-between" style={{ zIndex: '1000', alignItems: 'end' }}>
        <TokenSymbol symbol={bank.firstDepositTokenName.toUpperCase()} height={70} width={70} />
        <img src={plantImg} width={'50%'} height={'auto'} style={{ marginBottom: '-10px' }} />
        <TokenSymbol symbol={bank.secondDepositTokenName.toUpperCase()} height={70} width={70} />
      </Grid>
      <Grid
        style={{
          background: backColor[bank.sort],
          border: '1px solid black',
          borderRadius: '200px',
          textAlign: 'center',
          marginTop: '-25px',
          zIndex: 100,
          width: '100%',
          position: 'relative',
        }}
      >
        <Typography variant="h4" style={{ color: '#225D14' }}>
          FARM
        </Typography>
        <Typography variant="h4" style={{ color: '#225D14' }}>
          {bank.firstDepositTokenName} - {bank.secondDepositTokenName}
        </Typography>
      </Grid>
      <Card style={{ marginTop: '-15px', boxShadow: 'none' }}>
        <CardContent style={{ boxShadow: '0px 0px 2px 0px black', margin: '-10px 20px' }}>
          <PoolCardHeader bank={bank} statsOnPool={statsOnPool} stakedInToken={stakedInToken} showAPRCalc />
          <PoolCardContent
            bank={bank}
            statsOnPool={statsOnPool}
            stakedInToken={stakedInToken}
            stakedInDollars={stakedInDollars}
            earnedInToken={earnedInToken}
            earnedInDollars={earnedInDollars}
          />
          <Grid item xs={12} md={12} lg={12}>
            <Stake bank={bank} />
          </Grid>
          <Grid container spacing={1} style={{ marginTop: '10px', alignItems: 'center', justifyContent: 'center' }}>
            <Grid item className="card-price-item" xs={9} md={9} lg={9} style={{ color: '#212652' }}>
              AKSHARE EARNED: ${earnedInToken}
            </Grid>
            <Grid item className="card-price-item" xs={3} md={3} lg={3}>
              <Harvest bank={bank} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default VineyardInfoCard;
