import React from 'react';
import { Button, Card, CardContent, Grid, Paper, Typography } from '@material-ui/core';
import TokenSymbol from '../../components/TokenSymbol';
import TokenSymbolAccessory from '../../components/TokenSymbolAccessory';
import TokenSymbolButtonAccessory from '../../components/TokenSymbolButtonAccessory';
import useGrapeFinance from '../../hooks/useGrapeFinance';
import MetamaskFox from '../../assets/img/metamask-fox.svg';
import { roundAndFormatNumber } from '../../0x';

interface InfoCardProps {
  name: string;
  color: string;
  buyAddress?: string;
  internalLink?: boolean;
  chartAddress?: string;
  price: number;
  circulatingSupply: number;
  totalSupply: number;
}

const InfoCard: React.FC<InfoCardProps> = ({
  name,
  color,
  buyAddress,
  internalLink,
  chartAddress,
  price,
  circulatingSupply,
  totalSupply,
}) => {
  const grapeFinance = useGrapeFinance();

  return (
    <>
      <Grid container justifyContent="space-between" style={{ zIndex: '1000' }}>
        <TokenSymbolAccessory symbol={name.toUpperCase()} height={100} width={70} />
        <TokenSymbol symbol={name.toUpperCase()} height={80} width={80} marginTop={30} />
      </Grid>
      <Card style={{ marginTop: '-30px', boxShadow: 'none' }}>
        <CardContent>
          <Grid container style={{ position: 'relative', backgroundColor: color, borderRadius: '200px' }} spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Grid container direction="column">
                <Grid item sm={12} md={12} lg={12} style={{ marginBottom: '8px' }}>
                  <Typography variant="h4" align="center" style={{ color: 'black' }}>
                    {name}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Button
              onClick={() => {
                grapeFinance.watchAssetInMetamask(name.toUpperCase());
              }}
              style={{ position: 'absolute', top: '20px', right: '0', display: 'flex', justifyContent: 'row' }}
            >
              {' '}
              <b style={{ color: 'black' }}>+</b>&nbsp;&nbsp;
              <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
            </Button>
          </Grid>
          <div style={{ boxShadow: '0px 0px 2px 0px black', margin: '-20px 20px' }}>
            <Grid item xs={12} sm={12} md={12} lg={12} style={{ paddingTop: '40px' }}>
              <Grid container direction="column">
                <Grid item sm={12} md={12} lg={12} style={{ marginBottom: '8px' }}>
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: '40px solid transparent',
                      borderBottom: '40px solid #31AD54',
                      borderLeft: '40px solid #31AD54',
                      borderRight: '40px solid transparent',
                      position: 'absolute',
                      marginTop: '-40px',
                      zIndex: 1,
                    }}
                  ></div>
                  <Typography variant="h4" align="center" style={{ color: 'black', zIndex: 1000 }}>
                    ${price ? price : '-.----'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container direction="column" spacing={1} style={{ width: 'calc(100% - 40px)', margin: '0px 20px' }}>
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <span className="card-info-text">Market Cap</span>
                  </Grid>
                  <Grid item>
                    <b className="card-info-value">${roundAndFormatNumber(circulatingSupply * price, 0)}</b>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Grid container alignItems="baseline" justifyContent="space-between">
                  <Grid item>
                    <span className="card-info-text">Price</span>
                  </Grid>
                  <Grid item>
                    <span className="info-card-price">${price ? price : '-.----'}</span>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <span className="card-info-text">Circulating Supply</span>
                  </Grid>
                  <Grid item>
                    <b className="card-info-value">{roundAndFormatNumber(circulatingSupply, 2)}</b>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <span className="card-info-text">Total Supply</span>
                  </Grid>
                  <Grid item>
                    <b className="card-info-value">{roundAndFormatNumber(totalSupply, 2)}</b>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={3} justifyContent="center">
              {buyAddress && (
                <Grid item className="card-price-item" xs={10} md={10} lg={10}>
                  <Button
                    href={buyAddress}
                    target={internalLink === true ? null : '_blank'}
                    className="shinyButton"
                    style={{
                      width: '100%',
                      marginTop: '10px',
                      borderRadius: '15px!important',
                      fontSize: '25px!important',
                    }}
                  >
                    <TokenSymbolButtonAccessory symbol={name.toUpperCase()} height={40} />
                    Buy {name}
                  </Button>
                </Grid>
              )}
              {/* {chartAddress && (
              <Grid item className="card-price-item" xs={6} md={6} lg={6}>
                <Button
                  href={chartAddress}
                  target="_blank"
                  className="shinyButton"
                  style={{ width: '100%', marginTop: '10px', borderRadius: '0px !important' }}
                >
                  {name} Chart
                </Button>
              </Grid>
            )} */}
            </Grid>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default InfoCard;
