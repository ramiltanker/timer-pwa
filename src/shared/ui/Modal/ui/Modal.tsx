import React, {
  FC,
  useCallback,
  useRef,
  useState,
  useEffect,
  MutableRefObject,
  ReactNode,
} from "react";
import styles from "./Modal.module.css";
import { Portal } from "../../Portal/ui/Portal";
import classNames from "classnames";
import FocusTrap from "focus-trap-react";
import { ReactComponent as CloseIcon } from "shared/assets/images/close-icon.svg";
import { Button } from "shared/ui/Button";

interface ModalProps {
  className?: string;
  contentClassName?: string;
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  isPortal?: boolean;
  isAbsolute?: boolean;
  isCentered?: boolean;
  contentTransform?: string;
}

const ANIMATION_DELAY = 300;

const modalRoot = document.getElementById("modal-root");

interface PortalWrapperProps {
  isPortal?: boolean;
  children: ReactNode;
}

const PortalWrapper = (props: PortalWrapperProps) => {
  const { isPortal, children } = props;

  if (isPortal) {
    return <Portal element={modalRoot!}>{children}</Portal>;
  }

  return <>{children}</>;
};

const Modal: FC<ModalProps> = ({
  className,
  contentClassName,
  children,
  isOpen,
  onClose,
  contentTransform,
  isPortal = false,
  isAbsolute = false,
  isCentered,
}) => {
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [isOpening, setIsOpening] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  const handleClose = useCallback(() => {
    if (onClose) {
      setIsOpening(false);
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, ANIMATION_DELAY);
    }
  }, [onClose]);

  useEffect(() => {
    if (isMounted) {
      const handleClick = (event: MouseEvent) => {
        const { target } = event;
        if (target instanceof Node && !rootRef.current?.contains(target)) {
          handleClose();
        }
      };

      window.addEventListener("click", handleClick);

      return () => {
        window.removeEventListener("click", handleClick);
      };
    }
  }, [handleClose, isMounted]);

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      window.addEventListener("keydown", handleKeyDown);
      timerRef.current = setTimeout(() => {
        setIsOpening(true);
      }, 0);
    } else {
      setIsOpening(false);
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        setIsMounted(false);
      }, ANIMATION_DELAY);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timerRef.current);
    };
  }, [isOpen, handleKeyDown]);

  const mods = {
    [styles.isClosing]: isClosing,
    [styles.isOpening]: isOpening,
    [styles.isAbsolute]: isAbsolute,
    [styles.isCentered]: isCentered,
  };

  return (
    <PortalWrapper isPortal={isPortal}>
      {isMounted && (
        <div
          className={classNames(styles.modal, mods, [className])}
          ref={rootRef}
        >
          <div className={styles.overlay} onClick={handleClose}></div>
          <FocusTrap
            active
            focusTrapOptions={{
              allowOutsideClick: true,
              clickOutsideDeactivates: false,
            }}
          >
            <div
              style={{ transform: contentTransform }}
              className={classNames(styles.content, contentClassName)}
              onClick={handleContentClick}
            >
              <Button
                theme="clear"
                className={styles.closeBtn}
                onClick={handleClose}
              >
                <CloseIcon />
              </Button>
              {children}
            </div>
          </FocusTrap>
        </div>
      )}
    </PortalWrapper>
  );
};

export { Modal };
