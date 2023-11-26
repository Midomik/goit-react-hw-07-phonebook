import { InfinitySpin } from 'react-loader-spinner';

import css from './loader.module.css';
export const Loader = () => {
  return (
    <div className={css.homepageLoader}>
      <InfinitySpin width="200" color="rgb(235, 81, 9)" />
    </div>
  );
};
