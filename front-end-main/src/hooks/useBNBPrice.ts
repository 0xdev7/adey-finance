import { useEffect, useState } from 'react';
import useGrapeFinance from './useGrapeFinance';
import useRefresh from './useRefresh';

const useBNBPrice = () => {
  const [stat, setStat] = useState<String>();
  const { fastRefresh } = useRefresh();
  const grapeFinance = useGrapeFinance();

  useEffect(() => {
    async function fetchGrapePrice() {
      try {
        setStat(await grapeFinance.getDepositTokenPriceInDollars('WBNB', null));
      } catch (err) {
        console.error(err);
      }
    }
    fetchGrapePrice();
  }, [setStat, grapeFinance, fastRefresh]);

  return stat;
};

export default useBNBPrice;
