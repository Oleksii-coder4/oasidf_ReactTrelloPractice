import React from 'react';
import classes from './css/loader.module.css';
const Loader = function () {
  return (
    <div className={classes.loader__wrapper}>
      <div className={classes.loader}></div>
    </div>
  );
};
export default Loader;
