import React from 'react';

//Graveyard ecosystem logos
import grapeLogo from '../../assets/img/grape.png';
import wine from '../../assets/img/gshare.png';
import gbondLogo from '../../assets/img/gbond.png';
import mimLogo from '../../assets/img/mim.png';
import wavax from '../../assets/img/wavax.png';
import bnb from '../../assets/img/bnb.png';
import busd from '../../assets/img/busd.png';
import grapeWine from '../../assets/img/grape-wine.png';
import grapeMimLpLogo from '../../assets/img/AKUSD-BUSD.png';
import wineMimLpLogo from '../../assets/img/gshare-mim.png';
import wamp from '../../assets/img/WAMP.png';
import hsharewine from '../../assets/img/hshare-wine.png';
import gnode from '../../assets/img/gnode.png';
import grapewlrs from '../../assets/img/grape-wlrs.png';
import winePops from '../../assets/img/wine-pops.png';
import vintage from '../../assets/img/vintage-token.png';
import { Grid } from '@material-ui/core';

const logosBySymbol: { [title: string]: string } = {
  //Real tokens
  //=====================
  AKUSD: grapeLogo,
  AKBOND: gbondLogo,
  AKSHARE: wine,
  SOFT: vintage,
  BNB: bnb,
  BUSD: busd,
  WBNB: wavax,
  WAMP: wamp,
  HSHARE: wamp,
  GNODE: gnode,
  sVintage: vintage,
  'AKUSD-BUSD-LP': grapeMimLpLogo,
  'AKSHARE-WBNB-LP': grapeMimLpLogo,
  'AKSHARE-BUSD-LP': wineMimLpLogo,
  'SOFT-BUSD-LP': grapewlrs,
  'AKUSD-AKSHARE-LP': grapeWine,
  'HSHARE-AKSHARE-LP': hsharewine,
  'AKSHARE-POPS-LP': winePops,
};

type LogoProps = {
  symbol: string;
  width?: number;
  height?: number;
  marginTop?: number;
};

const TokenSymbol: React.FC<LogoProps> = ({ symbol, width, height, marginTop }) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid Token Logo symbol: ${symbol}`);
  }
  if (!width) {
    width = 60;
  }
  if (!height) {
    height = 60;
  }

  return (
    <img
      src={logosBySymbol[symbol]}
      alt={`${symbol} Logo`}
      width={width}
      height={height}
      style={{ marginTop: marginTop, zIndex: 1000 }}
    />
  );
};

export default TokenSymbol;
