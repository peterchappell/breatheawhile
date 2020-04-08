import React, { useState, useRef } from 'react';
import AppBar from '@material-ui/core/AppBar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Popover from '@material-ui/core/Popover';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import Slider from '@material-ui/core/Slider';
import SpeedIcon from '@material-ui/icons/Speed';
import Toolbar from '@material-ui/core/Toolbar';
import TuneIcon from '@material-ui/icons/Tune';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { makeStyles } from '@material-ui/core/styles';
import styles from './App.module.css';
import Main from 'components/Main';

const useStyles = makeStyles((theme) => ({
  popoverStyle: {
    transform: `translateY(-20px)`,
    marginBottom: '56px',
  },
  fullWidthPopover: {
    width: '100%',
  },
  popoverMain: {
    border: '3px solid red',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  sliderContainer: {
    padding: theme.spacing(3),
  },
  speedControl: {
    direction: 'rtl',
  },
}));

const breathingPatterns = [
  {
    id: 'square_breathing',
    name: 'Square Breathing',
    description: 'A simple breathing exercise you can practice to reduce stress.',
    phases: [
      {
        name: 'in',
        units: 4,
        instruction: 'Breathe in',
      },
      {
        name: 'pause',
        units: 4,
        instruction: 'Hold',
      },
      {
        name: 'out',
        units: 4,
        instruction: 'Breathe out',
      },
      {
        name: 'pause',
        units: 4,
        instruction: 'Hold'
      },
    ]
  },
  {
    id: '4-7-8_breathing',
    name: '4-7-8 Breathing',
    description: 'A breathing technique that is particularly good for sleep and for increasing oxygen intake.',
    phases: [
      {
        name: 'in',
        units: 4,
        instruction: 'Breathe in through nose',
      },
      {
        name: 'pause',
        units: 7,
        instruction: 'Hold your breath',
      },
      {
        name: 'out',
        units: 8,
        instruction: 'Exhale with a WHOOSH',
      }
    ]
  }
]

const App = () => {
  const [buzzOnSecond, setBuzzOnSecond] = useState(false);
  const [beepOnSecond, setBeepOnSecond] = useState(false);
  const [buzzOnChange, setBuzzOnChange] = useState(false);
  const [beepOnChange, setBeepOnChange] = useState(false);
  const [navValue, setNavValue] = useState();
  const [sliderValue, setSliderValue] = useState(0.5);
  const [timeUnitInSeconds, setTimeUnitInSeconds] = useState(1);
  const [showInstructions, setShowInstructions] = useState(true);
  const [selectedPattern, setSelectedPattern] = useState(breathingPatterns[0]);
  const popoverAnchorRef = useRef();
  const classes = useStyles();

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

  const toggleShowInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  const closeAllDrawers = () => {
    setNavValue('');
  };

  const handleNavChange = (event, newValue) => {
    if (newValue !== navValue) {
      setNavValue(newValue);
    } else {
      setNavValue('');
    }
  };

  const changeTimeUnit = (event, value) => {
    setSliderValue(value);
    setTimeUnitInSeconds(1 - value + 0.5);
  };

  const handlePatternSelect = (event, value) => {
    setSelectedPattern(value);
    closeAllDrawers();
  };

  return (
    <section className={styles.App}>
      <AppBar position="static" component="header">
        <Toolbar>
          <Typography variant='h6' component='h1'>
            Breathonome
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" component="main">
        <Main
          buzzOnSecond={buzzOnSecond}
          beepOnSecond={beepOnSecond}
          buzzOnChange={buzzOnChange}
          beepOnChange={beepOnChange}
          timeUnitInSeconds={timeUnitInSeconds}
          showInstructions={showInstructions}
          pattern={selectedPattern}
        />
        <Popover
          anchor="bottom"
          open={navValue === 'sound'}
          onClose={closeAllDrawers}
          anchorEl={popoverAnchorRef.current}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          className={classes.popoverStyle}
        >
          <Container maxWidth="md">
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Sound</FormLabel>
              <Hidden xsDown>
                <FormHelperText> </FormHelperText>
              </Hidden>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={beepOnSecond}
                      onChange={toggleBeepOnSecond}
                    />
                  }
                  label="On every count"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={beepOnChange}
                      onChange={toggleBeepOnChange}
                    />
                  }
                  label="On every change"
                />
              </FormGroup>
            </FormControl>
            <Hidden smUp>
              <Divider />
            </Hidden>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Vibration</FormLabel>
              <FormHelperText>(Only for compatible devices)</FormHelperText>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={buzzOnSecond}
                      onChange={toggleBuzzOnSecond}
                    />
                  }
                  label="On every count"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={buzzOnChange}
                      onChange={toggleBuzzOnChange}
                    />
                  }
                  label="On every change"
                />
              </FormGroup>
            </FormControl>
          </Container>
        </Popover>
        <Popover
          anchor="bottom"
          open={navValue === 'speed'}
          onClose={closeAllDrawers}
          anchorEl={popoverAnchorRef.current}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          classes={{
            paper: classes.fullWidthPopover,
          }}
          className={classes.popoverStyle}
        >
          <div className={classes.sliderContainer}>
            <Typography id="speed-slider" gutterBottom>
              Speed
            </Typography>
            <Slider
              value={sliderValue}
              min={0}
              max={1}
              step={0.05}
              track={false}
              onChange={changeTimeUnit}
              className={classes.speedControl}
              aria-labelledby="speed-slider" />
          </div>
        </Popover>
        <Popover
          anchor="bottom"
          open={navValue === 'display'}
          onClose={closeAllDrawers}
          anchorEl={popoverAnchorRef.current}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          className={classes.popoverStyle}
        >
          <Container maxWidth="md">
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Display</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showInstructions}
                      onChange={toggleShowInstructions}
                    />
                  }
                  label="Show instruction prompt"
                />
              </FormGroup>
            </FormControl>
          </Container>
        </Popover>
        <Popover
          anchor="bottom"
          open={navValue === 'pattern'}
          onClose={closeAllDrawers}
          anchorEl={popoverAnchorRef.current}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          classes={{
            paper: classes.fullWidthPopover,
          }}
          className={classes.popoverStyle}
        >
          <Container maxWidth="md">
            <List>
              {breathingPatterns.map((pattern) => {
                const labelId = `select_${pattern.id}`;

                return (
                  <ListItem
                    key={`${pattern.id}_key`}
                    alignItems="flex-start"
                    button
                    selected={selectedPattern.id === pattern.id}
                    onClick={event => handlePatternSelect(event, pattern)}
                  >
                    <ListItemIcon>
                      { selectedPattern.id === pattern.id ? (
                        <RadioButtonCheckedIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={pattern.name}
                      secondary={
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          {pattern.description}
                        </Typography>
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          </Container>
        </Popover>
      </Container>
      <BottomNavigation showLabels component="nav" value={navValue} onChange={handleNavChange} ref={popoverAnchorRef}>
        <BottomNavigationAction label="Sound" value="sound" icon={<VolumeUpIcon />} />
        <BottomNavigationAction label="Speed" value="speed" icon={<SpeedIcon />} />
        <BottomNavigationAction label="Display" value="display" icon={<VisibilityIcon />} />
        <BottomNavigationAction label="Pattern" value="pattern" icon={<TuneIcon />} />
      </BottomNavigation>
    </section>
  );
};

export default App;
