import React from 'react';
import classes from './css/FallbackError.module.css';
const FallbackError = function (props) {
  const { error, resetErrorBoundary } = props;
  return (
    <div className={classes.wrapper}>
      <div className={classes.error_container}>
        <div className={classes.error_message}>
          <h1 className={classes.error_word}>Oops!</h1>
          <p className={classes.error_words}>Something went wrong.</p>
          <pre className={classes.error_words}>{error.message}</pre>
          <button onclick={resetErrorBoundary} className={classes.retry_button}>
            Retry
          </button>
        </div>
      </div>
    </div>
  );
};

export default FallbackError;
