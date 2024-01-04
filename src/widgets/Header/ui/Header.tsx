import styles from "./Header.module.css";

import { Theme, useTheme } from "app/providers/ThemeProvider";
import { Button } from "shared/ui/Button";

import { ReactComponent as LightThemeIcon } from "shared/assets/images/sun.svg";
import { ReactComponent as DarkThemeIcon } from "shared/assets/images/moon.svg";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Button
          theme="primary"
          onClick={toggleTheme}
          className={styles.themeSwitcher}
        >
          {theme === Theme.LIGHT ? <DarkThemeIcon /> : <LightThemeIcon />}
        </Button>
      </div>
    </header>
  );
};

export { Header };
