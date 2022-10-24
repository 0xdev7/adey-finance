import React, { useMemo, useContext } from 'react';
import styled from 'styled-components';

import { Button, Grid } from '@material-ui/core';

import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useModal from '../../../hooks/useModal';
import useStake from '../../../hooks/useStake';
import useStakedBalance from '../../../hooks/useStakedBalance';
import useStakedTokenPriceInDollars from '../../../hooks/useStakedTokenPriceInDollars';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useWithdraw from '../../../hooks/useWithdraw';

import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import { Bank } from '../../../grape-finance';

interface StakeProps {
  bank: Bank;
}

const Stake: React.FC<StakeProps> = ({ bank }) => {
  const [approveStatus, approve] = useApprove(bank.depositToken, bank.address);

  const tokenBalance = useTokenBalance(bank.depositToken);
  const stakedBalance = useStakedBalance(bank.contract, bank.poolId);

  const { onStake } = useStake(bank);
  const { onWithdraw } = useWithdraw(bank);

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      decimals={bank.depositToken.decimal}
      onConfirm={(amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        onStake(amount);
        onDismissDeposit();
      }}
      tokenName={bank.depositTokenName}
    />,
  );

  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      decimals={bank.depositToken.decimal}
      onConfirm={(amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        onWithdraw(amount);
        onDismissWithdraw();
      }}
      tokenName={bank.depositTokenName}
    />,
  );

  return (
    <StyledCardActions>
      {approveStatus !== ApprovalState.APPROVED ? (
        <Button
          disabled={
            bank.closedForStaking || approveStatus === ApprovalState.PENDING || approveStatus === ApprovalState.UNKNOWN
          }
          onClick={approve}
          className={
            bank.closedForStaking || approveStatus === ApprovalState.PENDING || approveStatus === ApprovalState.UNKNOWN
              ? 'shinyButtonDisabled'
              : 'shinyButton'
          }
        >
          {`Approve ${bank.depositTokenName}`}
        </Button>
      ) : (
        <Grid item xs={12} md={12} lg={12}>
          <Grid container alignItems="baseline" justifyContent="space-between">
            <Grid item xs={6} style={{ textAlign: 'center', marginTop: '15px' }}>
              <Button style={{ border: '1px solid black', color: 'black' }} onClick={onPresentWithdraw}>
                -
              </Button>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'center', marginTop: '15px' }}>
              <Button
                disabled={bank.closedForStaking}
                style={{ border: '1px solid black', color: 'black' }}
                onClick={() => (bank.closedForStaking ? null : onPresentDeposit())}
              >
                +
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </StyledCardActions>
  );
};

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 28px;
  width: 100%;
`;

export default Stake;
