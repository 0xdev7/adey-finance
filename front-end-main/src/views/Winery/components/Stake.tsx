import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Box, Button, Grid, Card, CardContent, Typography } from '@material-ui/core';

// import Button from '../../../components/Button';
// import Card from '../../../components/Card';
// import CardContent from '../../../components/CardContent';
import CardIcon from '../../../components/CardIcon';
import { AddIcon, RemoveIcon } from '../../../components/icons';
import IconButton from '../../../components/IconButton';
import Label from '../../../components/Label';
import Value from '../../../components/Value';

import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useModal from '../../../hooks/useModal';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useWithdrawCheck from '../../../hooks/boardroom/useWithdrawCheck';

import { getDisplayBalance } from '../../../utils/formatBalance';

import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import useGrapeFinance from '../../../hooks/useGrapeFinance';
import ProgressCountdown from './ProgressCountdown';
import useStakedBalanceOnBoardroom from '../../../hooks/useStakedBalanceOnBoardroom';
import useStakedTokenPriceInDollars from '../../../hooks/useStakedTokenPriceInDollars';
import useUnstakeTimerBoardroom from '../../../hooks/boardroom/useUnstakeTimerBoardroom';
import TokenSymbol from '../../../components/TokenSymbol';
import useStakeToBoardroom from '../../../hooks/useStakeToBoardroom';
import useWithdrawFromBoardroom from '../../../hooks/useWithdrawFromBoardroom';
import nImg from '../../../assets/img/n-removebg-preview.png';
import zigImg from '../../../assets/img/zig-removebg-preview.png';
import roundImg from '../../../assets/img/round-removebg-preview.png';
import dotsyImg from '../../../assets/img/dotsy-removebg-preview.png';

const Stake: React.FC = () => {
  const grapeFinance = useGrapeFinance();
  const [approveStatus, approve] = useApprove(grapeFinance.WINE, grapeFinance.contracts.Boardroom.address);

  const tokenBalance = useTokenBalance(grapeFinance.WINE);
  const stakedBalance = useStakedBalanceOnBoardroom();
  const { from, to } = useUnstakeTimerBoardroom();

  const stakedTokenPriceInDollars = useStakedTokenPriceInDollars('AKSHARE', grapeFinance.WINE);

  const tokenPriceInDollars = useMemo(
    () =>
      stakedTokenPriceInDollars
        ? (Number(stakedTokenPriceInDollars) * Number(getDisplayBalance(stakedBalance))).toFixed(2).toString()
        : null,
    [stakedTokenPriceInDollars, stakedBalance],
  );
  // const isOldBoardroomMember = boardroomVersion !== 'latest';

  const { onStake } = useStakeToBoardroom();
  const { onWithdraw } = useWithdrawFromBoardroom();
  const canWithdrawFromBoardroom = useWithdrawCheck();

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={(value) => {
        onStake(value);
        onDismissDeposit();
      }}
      tokenName={'AKSHARE'}
    />,
  );

  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={(value) => {
        onWithdraw(value);
        onDismissWithdraw();
      }}
      tokenName={'AKSHARE'}
    />,
  );

  return (
    <>
      <Grid style={{ textAlign: 'center', zIndex: 1000 }}>
        <TokenSymbol height={70} width={70} symbol="AKSHARE" />
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
          AKSHARE
        </Typography>
        <Grid container justifyContent="space-between" style={{ padding: '0px 20px', marginTop: '-10px' }}>
          <img src={nImg} width="23%" />
          <img src={zigImg} width="23%" />
          <img src={roundImg} width="23%" />
          <img src={dotsyImg} width="23%" />
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
                  AKSHARE: STAKED
                </Typography>
                <Typography variant="h5" style={{ color: '#212652' }}>{`$${Number(tokenPriceInDollars).toLocaleString(
                  'en-US',
                )}`}</Typography>
              </StyledCardHeader>
              <StyledCardActions>
                {approveStatus !== ApprovalState.APPROVED ? (
                  <Button
                    disabled={approveStatus !== ApprovalState.NOT_APPROVED}
                    className="shinyButton"
                    onClick={approve}
                  >
                    Approve AKSHARE
                  </Button>
                ) : (
                  <>
                    <IconButton disabled={!canWithdrawFromBoardroom} onClick={onPresentWithdraw}>
                      <RemoveIcon color={!canWithdrawFromBoardroom ? '' : 'yellow'} />
                    </IconButton>
                    <StyledActionSpacer />
                    <IconButton onClick={onPresentDeposit}>
                      <AddIcon color={!canWithdrawFromBoardroom ? '' : 'yellow'} />
                    </IconButton>
                  </>
                )}
              </StyledCardActions>
            </StyledCardContentInner>
          </CardContent>
        </Card>
        <Box mt={2} style={{ color: '#FFF' }}>
          {canWithdrawFromBoardroom ? (
            ''
          ) : (
            <Card>
              <CardContent>
                <Typography style={{ textAlign: 'center' }}>Withdraw possible in</Typography>
                <ProgressCountdown hideBar={true} base={from} deadline={to} description="Withdraw available in" />
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

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Stake;
