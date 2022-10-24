import React from 'react';
import Page from '../../components/Page';
import { Switch } from 'react-router-dom';
import strategy from '../../assets/img/strategy.jpg';

const Strategies: React.FC = () => {
  return (
    <Switch>
      <Page>
        <img src={strategy} width="100%" style={{ margin: '50px 0px', borderRadius: '30px' }} />
      </Page>
    </Switch>
  );
};

export default Strategies;
