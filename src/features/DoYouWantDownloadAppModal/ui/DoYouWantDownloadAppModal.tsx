import { memo, useEffect, useState } from "react";
import { Modal } from "shared/ui/Modal/ui/Modal";
import styles from "./DoYouWantDownloadAppModal.module.css";
import { Button } from "shared/ui/Button";
import { LOCAL_STORAGE_VISIT_COUNT } from "shared/lib/constants/localstorage/localstorage";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;

const DoYouWantDownloadAppModal = memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      let visits = Number(localStorage.getItem(LOCAL_STORAGE_VISIT_COUNT));

      if (visits > 1) {
        setIsOpen(true);
        deferredPrompt = e as BeforeInstallPromptEvent;
      }
    });

    window.addEventListener("appinstalled", (event) => {
      setIsOpen(false);
    });
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const installApp = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("Пользователь принял предложение об установке");
        } else {
          console.log("Пользователь отклонил предложение об установке");
        }
        deferredPrompt = null;
      });
    }
  };

  return (
    <Modal isPortal isOpen={isOpen} isCentered onClose={handleClose}>
      <div className={styles.downloadModal}>
        <h2 className={styles.downloadModalTitle}>
          Хотите скачать приложение?
        </h2>
        <div className={styles.buttons}>
          <Button theme="positive" onClick={installApp}>
            ДА
          </Button>
          <Button theme="negative" onClick={handleClose}>
            НЕТ
          </Button>
        </div>
      </div>
    </Modal>
  );
});

export { DoYouWantDownloadAppModal };
