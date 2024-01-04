import { FC } from "react";

import styles from "./TimeWrapper.module.css";

import classNames from "classnames";

interface ITimeWrapper {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  time: any;
  timerStart: boolean;
}

const TimeWrapper: FC<ITimeWrapper> = ({ handleChange, time, timerStart }) => {
  return (
    <form className={styles.time_wrapper}>
      <div className={styles.box_wrapper}>
        <div className={styles.time_box}>
          <input
            className={classNames(styles.input)}
            type={"number"}
            placeholder="0"
            min="0"
            max="24"
            name="hours"
            onChange={handleChange}
            value={time.hours}
            disabled={timerStart}
          />
        </div>
        <p className={classNames(styles.name)}>Hours</p>
      </div>
      <div className={styles.box_wrapper}>
        <div className={styles.time_box}>
          <input
            className={classNames(styles.input)}
            type={"number"}
            min="0"
            max="60"
            name="minutes"
            onChange={handleChange}
            value={time.minutes}
            placeholder="0"
            disabled={timerStart}
          />
        </div>
        <p className={classNames(styles.name)}>Minutes</p>
      </div>
      <div className={styles.box_wrapper}>
        <div className={styles.time_box}>
          <input
            className={classNames(styles.input)}
            type={"number"}
            placeholder="0"
            min="0"
            max="60"
            name="seconds"
            onChange={handleChange}
            value={time.seconds}
            disabled={timerStart}
          />
        </div>
        <p className={classNames(styles.name)}>Seconds</p>
      </div>
    </form>
  );
};

export default TimeWrapper;
