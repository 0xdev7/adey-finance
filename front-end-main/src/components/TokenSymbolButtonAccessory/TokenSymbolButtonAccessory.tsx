import React from 'react';

//Graveyard ecosystem logos
import grapeLogo from '../../assets/img/e86bab48ec8694ad1eb64696ddc2b760.svg';
import wine from '../../assets/img/b160922688c9c5b80301ab61da50434c.svg';
import gbondLogo from '../../assets/img/244b542465d827ebd869a1096655d4ab.svg';

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

const TokenSymbolButtonAccessory: React.FC<LogoProps> = ({ symbol, width, height }) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid Token Logo symbol: ${symbol}`);
  }
  if (!width) {
    width = 60;
  }
  if (!height) {
    height = 60;
  }

  return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} height={height} style={{ marginRight: '5px' }} />;
};

export default TokenSymbolButtonAccessory;
