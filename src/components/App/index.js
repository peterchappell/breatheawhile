import React, { useState } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from 'react-router-dom';
import styles from './App.module.css';
import { ReactComponent as SettingsIcon } from './settings.svg';
import Main from 'components/Main';

const App = () => {
  const [buzzOnSecond, setBuzzOnSecond] = useState(false);
  const [beepOnSecond, setBeepOnSecond] = useState(false);
  const [buzzOnChange, setBuzzOnChange] = useState(false);
  const [beepOnChange, setBeepOnChange] = useState(false);

  const toggleBuzzOnSecond = () => {
    setBuzzOnSecond(!buzzOnSecond);
  };

  const toggleBeepOnSecond = () => {
    setBeepOnSecond(!beepOnSecond);
  };

  const toggleBuzzOnChange = () => {
    setBuzzOnChange(!buzzOnChange);
  };

  const toggleBeepOnChange = () => {
    setBeepOnChange(!beepOnChange);
  };

  return (
    <Router>
      <section className={styles.App}>
        <header className={styles.header}>
          <h1 className={styles.headerTitle}>
            <Link to="/" className={styles.headerTitleLink}>
              Breathonome
            </Link>
          </h1>
          <NavLink to="/settings" className={styles.settingsLink} activeStyle={{color: 'white'}}>
            <SettingsIcon className={styles.settingsIcon} />
          </NavLink>
        </header>
        <Switch>
          <Route path="/settings">
            <h2 className={styles.settingsSubheading}>Vibrations</h2>
            <p className={styles.settingsHelp}>(Only applies to devices that can vibrate).</p>
            <div className={styles.checkboxItem}>
              <input className={styles.checkbox} type="checkbox" checked={buzzOnSecond} id="buzz_on_second" onChange={toggleBuzzOnSecond} />
              <label htmlFor="buzz_on_second">Vibrate on every count</label>
            </div>
            <div className={styles.checkboxItem}>
              <input className={styles.checkbox} type="checkbox" checked={buzzOnChange} id="buzz_on_change" onChange={toggleBuzzOnChange} />
              <label htmlFor="buzz_on_change">Vibrate (more) when the breath changes</label>
            </div>
            <h2 className={styles.settingsSubheading}>Sound</h2>
            <div className={styles.checkboxItem}>
              <input className={styles.checkbox} type="checkbox" checked={beepOnSecond} id="beep_on_second" onChange={toggleBeepOnSecond} />
              <label htmlFor="beep_on_second">Beep on every count</label>
            </div>
            <div className={styles.checkboxItem}>
              <input className={styles.checkbox} type="checkbox" checked={beepOnChange} id="beep_on_change" onChange={toggleBeepOnChange} />
              <label htmlFor="beep_on_change">Beep (louder) when the breath changes</label>
            </div>
            <Link to="/" className={styles.settingsApplyButton}>
              OK
            </Link>
          </Route>
          <Route path="*">
            <Main buzzOnSecond={buzzOnSecond} beepOnSecond={beepOnSecond} buzzOnChange={buzzOnChange} beepOnChange={beepOnChange} />
          </Route>
        </Switch>
      </section>
    </Router>
  );
};

export default App;
