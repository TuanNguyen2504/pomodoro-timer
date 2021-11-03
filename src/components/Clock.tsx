import AutorenewIcon from '@mui/icons-material/Autorenew';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { Box, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import useStyles from '../styles/Clock';
import { useStyleBtn } from '../styles/commons/Button';

interface NewClockValue {
  second: string;
  minute: string;
  circlePercent: number;
}

function getNewClockValue(
  secondsLeft: number = 0,
  totalSecond: number = 0,
): NewClockValue {
  const circlePercent: number =
    100 - Math.round(((secondsLeft - totalSecond) / totalSecond) * 100);
  const minute = `0${~~(secondsLeft / 60)}`.slice(-2);
  const second = `0${secondsLeft % 60}`.slice(-2);

  return { second, minute, circlePercent };
}

function Clock() {
  const classes = useStyles();
  const { buttonClass } = useStyleBtn();

  const [run, setRun] = useState<string>('start');
  const seconds: number = 25 * 60;
  const [secondsLeft, setSecondsLeft] = useState<number>(seconds);
  const { second, minute, circlePercent } = getNewClockValue(
    secondsLeft,
    seconds,
  );

  const onPause = () => {
    if (run === 'start') {
      setRun('stop');
    } else {
      setRun('start');
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsLeft((preValue) => preValue - 1);
    }, 1000);

    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="flex-center flex-col flex-grow-1">
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          className={classes.circle}
          variant="determinate"
          value={circlePercent}
          size="12rem"
          thickness={2}
        />

        <div className={classes.timeBlock}>
          <span>{minute}</span>:<span>{second}</span>
        </div>
      </Box>

      <Box mt={6} display="flex">
        <Button
          className={`${buttonClass} ${run}`}
          variant="contained"
          onClick={onPause}
          sx={{ marginRight: '1rem' }}
          endIcon={run === 'start' ? <PlayArrowIcon /> : <StopIcon />}
        >
          {run}
        </Button>
        <Button
          variant="contained"
          className={`${buttonClass} reset`}
          endIcon={<AutorenewIcon />}
        >
          Reset
        </Button>
      </Box>
    </div>
  );
}

export default Clock;
