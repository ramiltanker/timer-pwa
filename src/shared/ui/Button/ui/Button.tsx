import { FC, HTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";
import styled from "styled-components";
import classNames from "classnames";

export type ButtonTheme =
  | "clear"
  | "primary"
  | "positive"
  | "negative"
  | "neutral";

const buttonThemeClasses: Record<ButtonTheme, string> = {
  clear: styles.clear,
  primary: styles.primary,
  neutral: styles.neutral,
  positive: styles.positive,
  negative: styles.negative,
};

interface IButton extends HTMLAttributes<HTMLButtonElement> {
  marginRight?: string;
  children: ReactNode;
  theme?: ButtonTheme;
}

const ButtonStyled = styled.button`
  margin-right: ${(props) => props.style?.marginRight};
`;

const Button: FC<IButton> = ({
  marginRight,
  color,
  children,
  theme = "neutral",
  className,
  ...otherProps
}) => {
  const classes = [buttonThemeClasses[theme], className];

  return (
    <ButtonStyled
      className={classNames(styles.button, classes)}
      style={{
        marginRight: marginRight,
        color: color,
      }}
      {...otherProps}
    >
      {children}
    </ButtonStyled>
  );
};

export { Button };
