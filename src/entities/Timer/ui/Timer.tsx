import React from "react";

import styles from "./Timer.module.css";

import classNames from "classnames";
import { Button } from "shared/ui/Button";
import TimeWrapper from "./TimeWrapper/TimeWrapper";

type TTime = {
  [key: string]: string;
};

const Timer = () => {
  const [time, setTime] = React.useState<TTime>({
    hours: "",
    minutes: "",
    seconds: "",
  });

  const [totalTime, setTotalTime] = React.useState<any>({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const [timerStart, setTimerStart] = React.useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const indicatorRef = React.useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const name = target.name;

    setTotalTime((state: any) => {
      state[name] = target.value;
      return { ...state };
    });

    setTime((state) => {
      state[name] = target.value;
      return { ...state };
    });
  };

  React.useEffect(() => {
    let hours = Number(time.hours);
    let minutes = Number(time.minutes);
    let seconds = Number(time.seconds);
    // Длина шкалы прогресса
    let containerWidth = containerRef!.current!.clientWidth;
    // Длина шкалы прогресса
    // Оставшееся время
    const timeLeft = hours * 60 * 60 + minutes * 60 + seconds;
    // Оставшееся время
    // Общее кол-во времени
    const total =
      Number(totalTime.hours) * 60 * 60 +
      Number(totalTime.minutes) * 60 +
      Number(totalTime.seconds);
    // Общее кол-во времени

    if (timeLeft >= 0) {
      indicatorRef!.current!.style.transform = `translateX(${
        (timeLeft * containerWidth!) / total - containerWidth
      }px)`;
    }

    if (timeLeft <= 0) {
      setTotalTime({
        hours: "00",
        minutes: "00",
        seconds: "00",
      });
    }

    return () => {
      indicatorRef!.current!.style.transform = `translateX(0px)`;
    };
  }, [time.hours, time.minutes, time.seconds]);

  React.useEffect(() => {
    let hours = Number(time.hours);
    let minutes = Number(time.minutes);
    let seconds = Number(time.seconds);

    const timer = setInterval(() => {
      if ((hours > 0 || minutes > 0 || seconds > 0) && timerStart) {
        if (seconds === 0) {
          if (minutes === 0) {
            if (hours > 0) {
              hours = hours - 1;
              minutes = 60;
              setTime((state) => {
                state["hours"] = hours + "";
                state["minutes"] = minutes + "";
                return { ...state };
              });
            }
          } else {
            minutes = minutes - 1;
            seconds = 59;
            setTime((state) => {
              state["seconds"] = seconds + "";
              state["minutes"] = minutes + "";
              return { ...state };
            });
          }
        } else {
          seconds = seconds - 1;
          setTime((state) => {
            state["seconds"] = seconds + "";
            return { ...state };
          });
        }
      } else {
        setTimerStart(false);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timerStart, time.seconds]);

  const handleReset = () => {
    setTime({
      hours: "",
      minutes: "",
      seconds: "",
    });
    setTotalTime({
      hours: "00",
      minutes: "00",
      seconds: "00",
    });
    indicatorRef!.current!.style.transform = "translateX(0px)";
    setTimerStart(false);
  };

  return (
    <section className={styles.timer}>
      <div className={classNames(styles.container)} ref={containerRef}>
        <h2 className={classNames(styles.title)}>TIMER</h2>
        <TimeWrapper
          handleChange={handleChange}
          time={time}
          timerStart={timerStart}
        />
        <div className={styles.buttons}>
          <Button
            theme="positive"
            marginRight="15px"
            onClick={() => setTimerStart(true)}
          >
            START
          </Button>
          <Button
            theme="neutral"
            marginRight="15px"
            onClick={() => setTimerStart(false)}
          >
            PAUSE
          </Button>
          <Button theme="negative" onClick={handleReset}>
            RESET
          </Button>
        </div>
        <div className={styles.indicator} ref={indicatorRef}></div>
      </div>
    </section>
  );
};

export default Timer;
