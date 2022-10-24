import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Button, Card, CardContent, Typography, Grid } from '@material-ui/core';
// import Button from '../../../components/Button';
// import Card from '../../../components/Card';
// import CardContent from '../../../components/CardContent';
import CardIcon from '../../../components/CardIcon';
import Label from '../../../components/Label';
import Value from '../../../components/Value';
import useEarnings from '../../../hooks/useEarnings';
import useHarvest from '../../../hooks/useHarvest';

import { getDisplayBalance } from '../../../utils/formatBalance';
import TokenSymbol from '../../../components/TokenSymbol';
import { Bank } from '../../../grape-finance';
import useGrapeStats from '../../../hooks/useGrapeStats';
import useShareStats from '../../../hooks/useWineStats';
import ReactTooltip from 'react-tooltip';
import rewards from '../../../assets/jsons/rewards.json';

interface HarvestProps {
  bank: Bank;
}

const Harvest: React.FC<HarvestProps> = ({ bank }) => {
  const earnings = useEarnings(bank.contract, bank.earnTokenName, bank.poolId);

  const { onReward } = useHarvest(bank);
  const grapeStats = useGrapeStats();
  const tShareStats = useShareStats();
  const tokenName = bank.earnTokenName === 'AKUSD' ? 'AKUSD' : 'AKSHARE';
  const tokenStats = bank.earnTokenName === 'AKSHARE' ? tShareStats : grapeStats;

  const tokenPriceInDollars = useMemo(
    () => (tokenStats ? Number(tokenStats.priceInDollars).toFixed(2) : null),
    [tokenStats],
  );
  const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);

  return (
    <Button
      onClick={onReward}
      disabled={earnings.eq(0)}
      style={{ width: '100%' }}
      className={earnings.eq(0) ? 'shinyButtonDisabled' : 'shinyButton'}
    >
      Claim
    </Button>
  );
};

export default Harvest;
