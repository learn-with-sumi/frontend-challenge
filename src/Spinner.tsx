import { FC } from 'react';
import loader from './assets/loader.svg';
import './Spinner.scss';

const Spinner: FC = () => {
  return <img className="Spinner" src={loader} alt="Spinner" data-testid='spinner'/>;
};

export default Spinner;
