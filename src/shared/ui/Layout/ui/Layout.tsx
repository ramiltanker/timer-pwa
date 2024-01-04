import React, { FC } from "react";

import styles from "./Layout.module.css";

import classNames from "classnames";

interface ILayout {
  children: React.ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
  return <div className={classNames(styles.layout)}>{children}</div>;
};

export { Layout };
