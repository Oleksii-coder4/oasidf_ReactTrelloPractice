import './signUpTest.css';
import classes from './css/signUp.module.css';
import { useState } from 'react';
const SignUp = (props) => {
  const [emailValue, setEmailValue] = useState('');
  const [password, setPassword] = useState('');
  let regexp =
    /^(([^< > ( ) \[ \] \\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // /(^\w[a-zA-Z0-9\-.+]{2,20})@([\w.!$%&’*+/=?^_-\d]){1,15}\.([a-z]){1,5}/gi;
  const isEmailValid = regexp.test(emailValue);

  const passwordSettings = {
    validRange: 0,
    isPasswordValid: false,
  };
  const validatePassword = (password) => {
    if (!password) return;
    if (password.length >= 6) passwordSettings.validRange += 1;
    if (password.length >= 12) passwordSettings.validRange += 1;
    if (/[A-Z]/.test(password)) passwordSettings.validRange += 1;
    if (/[0-9]/.test(password)) passwordSettings.validRange += 0.5;
    if (/[~`!@#$%^&*()_+{}|:\";'<>?,.]/.test(password)) passwordSettings.validRange += 1;
    if (passwordSettings.validRange >= 3) passwordSettings.isPasswordValid = true;
  };
  validatePassword(password);
  return (
    <section className={classes.signUpPage_wrapper}>
      <div className={classes.signUpPage}>
        <div className={classes.wrapper}>
          <p>Реєстрація</p>
          <label htmlFor="" className={classes.label}>
            Email
          </label>
          <input
            value={emailValue}
            onChange={(event) => setEmailValue(event.target.value)}
            type="mail"
            className={classes.input}
          />
          {emailValue !== '' && !isEmailValid && <p>Email is not valid(</p>}
          <label htmlFor="" className={classes.label}>
            Пароль
          </label>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            className={classes.input}
          />
          <div>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <label htmlFor="" className={classes.label}>
            Повторіть пароль
          </label>
          <input type="password" className={classes.input} />
          <button className={classes.button}>Зареєструватися</button>
          <div>
            <p>Вже маєте акаунт?</p>
            <a href="" className={classes.link}>
              Увійті
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
