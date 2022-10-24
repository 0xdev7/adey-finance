import React from 'react';
import { Button, Card, CardContent, Grid, Paper, Typography } from '@material-ui/core';
import TokenSymbol from '../TokenSymbol';
import { roundAndFormatNumber } from '../../0x';
import plantImg from '../../assets/img/plant-removebg-preview.png';

interface LPInfoCardProps {
  name: string;
  color: string;
  poolAddress?: string;
  price: number;
  token1Value: number;
  token1Name: string;
  token2Value: number;
  token2Name: string;
  circulatingSupply: number;
  totalSupply: number;
}

const LPInfoCard: React.FC<LPInfoCardProps> = ({
  name,
  color,
  poolAddress,
  price,
  token1Value,
  token1Name,
  token2Value,
  token2Name,
  circulatingSupply,
  totalSupply,
}) => {
  return (
    <>
      <Grid container justifyContent="space-between" style={{ zIndex: '1000', alignItems: 'end' }}>
        <TokenSymbol symbol={token2Name.toUpperCase()} height={70} width={70} />
        <img src={plantImg} width={'50%'} height={'auto'} style={{ marginBottom: '-10px' }} />
        <TokenSymbol symbol={token1Name.toUpperCase()} height={70} width={70} />
      </Grid>
      <Card style={{ marginTop: '-25px', position: 'relative', boxShadow: 'none' }}>
        <svg
          id="vKfJzuURFG9yEEVN"
          viewBox="0 0 655.7808 583.0396"
          preserveAspectRatio="none"
          style={{
            overflow: 'hidden',
            top: '0%',
            left: '0%',
            width: '100%',
            position: 'absolute',
            opacity: '1.0',
            height: '100%',
          }}
        >
          <g id="WrVRuQvvnDe2XNXc" style={{ transform: 'scale(1, 1)' }}>
            <path
              id="odzmM032tgIUh5ss"
              d="M579.4307781381326,582.0396017692394 L76.3499984741211,582.0396017692394 C34.72999954223633,582.0396017692394 1.0,548.2996039054699 1.0,291.5197879839101 C1.0,34.72999954223633 34.72999954223633,1.0 76.3499984741211,1.0 L579.4307781381326,1.0 C621.0407634896951,1.0 654.7807842416482,34.72999954223633 654.7807842416482,291.5197879839101 C654.7807842416482,548.2996039054699 621.0407940072732,582.0396017692394 579.4307781381326,582.0396017692394"
              style={{ fill: color, opacity: '1.0' }}
            ></path>
            <path
              id="zLOfsLquSfBc1ZcZ"
              d="M579.4307781381326,0.0 L76.3499984741211,0.0 C34.25,0.0 0.0,34.25 0.0,291.5197879839101 C0.0,548.7896017692394 34.25,583.0396017692394 76.3499984741211,583.0396017692394 L579.4307781381326,583.0396017692394 C621.5307842416482,583.0396017692394 655.7807842416482,548.7896017692394 655.7807842416482,291.5197879839101 C655.7807842416482,34.25 621.5307842416482,0.0 579.4307781381326,0.0 M579.4307781381326,581.0396017692394 L76.3499984741211,581.0396017692394 C35.349998474121094,581.0396017692394 2.0,547.6896032951183 2.0,291.5197879839101 C2.0,35.349998474121094 35.349998474121094,2.0 76.3499984741211,2.0 L579.4307781381326,2.0 C620.4307781381326,2.0 653.7807842416482,35.349998474121094 653.7807842416482,291.5197879839101 C653.7807842416482,547.6896032951183 620.4307781381326,581.0396017692394 579.4307781381326,581.0396017692394"
              style={{ fill: '#000000', opacity: '1.0' }}
            ></path>
          </g>
        </svg>
        <CardContent>
          <Grid container style={{ position: 'relative', textAlign: 'center' }} spacing={1} direction="column">
            <Grid item>
              <Typography style={{ color: '#0C5D14' }} variant="h4">
                FARM
              </Typography>
            </Grid>
            <Grid item>
              <Typography style={{ color: '#0C5D14' }} variant="h4">
                {token2Name}-{token1Name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography style={{ color: '#000000' }} variant="h4">
                {token1Value} {token1Name} / {token2Value} {token2Name}
              </Typography>
            </Grid>
            <Grid container spacing={3}>
              <Grid item className="card-price-item" xs={12} md={12} lg={12}>
                <Button
                  href={poolAddress}
                  className="shinyButton"
                  style={{
                    width: '30%',
                    marginTop: '10px',
                    borderRadius: '0px !important',
                    fontSize: '20px!important',
                  }}
                >
                  ZAP IN
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <span className="info-card-price">${price ? price : '-.----'}</span>
            </Grid>
            <Grid item>
              <Grid container justifyContent="center">
                <Grid item>
                  <span className="card-info-text">Liquidity: </span>
                </Grid>
                <Grid item>
                  <b className="card-info-value">${roundAndFormatNumber(circulatingSupply, 2)}</b>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container justifyContent="center">
                <Grid item>
                  <span className="card-info-text">Total Supply: </span>
                </Grid>
                <Grid item>
                  <b className="card-info-value">{roundAndFormatNumber(totalSupply, 2)}</b>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default LPInfoCard;
