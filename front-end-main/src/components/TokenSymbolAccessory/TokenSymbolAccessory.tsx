import React from 'react';

//Graveyard ecosystem logos
import grapeLogo from '../../assets/img/s_y-removebg-preview.png';
import wine from '../../assets/img/s_o-removebg-preview.png';
import gbondLogo from '../../assets/img/s_b-removebg-preview.png';

const logosBySymbol: { [title: string]: string } = {
  //Real tokens
  //=====================
  AKUSD: grapeLogo,
  AKSHARE: wine,
  SOFT: gbondLogo,
};

type LogoProps = {
  symbol: string;
  width?: number;
  height?: number;
};

const TokenSymbolAccessory: React.FC<LogoProps> = ({ symbol, width, height }) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid Token Logo symbol: ${symbol}`);
  }
  if (!width) {
    width = 60;
  }
  if (!height) {
    height = 60;
  }

  return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} height={height} />;
};

export default TokenSymbolAccessory;
