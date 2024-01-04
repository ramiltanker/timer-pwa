import styles from "./Footer.module.css";

import classNames from "classnames";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <a
          className={classNames(styles.link)}
          href="https://www.figma.com/exit?url=https%3A%2F%2Ffeathericons.com%2F"
        >
          Icons by Feather Icons
        </a>
        <a
          className={classNames(styles.link)}
          href="https://www.figma.com/community/file/1043830039993297065?fuid=873079164158002036"
        >
          Figma
        </a>
        <a
          className={classNames(styles.link)}
          href="https://www.figma.com/exit?url=http%3A%2F%2Faneeshbhat.com"
        >
          By Aneesh Bhat
        </a>
      </div>
    </footer>
  );
};

export { Footer };
