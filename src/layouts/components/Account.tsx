import { GeneralIcons } from "@/lib/icons/general";
import React, { useState } from "react";
import styles from "@/layouts/components/style/Index.module.css";
import { useApp } from "@/contexts/AppContext";
import Util from "@/utils/Util";
import Dispa8chAvatar from "@/components/avatar/Dispa8chAvatar";
import { useAuth } from "@/contexts/AuthContext";
import Dispa8chModal from "@/lib/modal/Dispa8chModal";

function Account({
  email,
  fullName,
  image,
}: {
  email: string;
  fullName: string;
  image: string;
}) {
  const [modal, setModal] = useState(false);
  const [toggled, setToggled] = useState(false);
  const { theme, getTheme, updateTheme } = useApp();
  const { logout } = useAuth();
  const middle = [
    {
      label: "Settings",
      icon: GeneralIcons.settings,
      action: () => {},
    },
    {
      label: "Logout",
      icon: GeneralIcons.logout,
      action: (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setModal(true);
      },
    },
  ];

  const themes = [
    {
      label: "System Default",
      value: "system",
      icon: GeneralIcons.default_theme,
    },
    {
      label: "Light Theme",
      value: "light",
      icon: GeneralIcons.light_theme,
    },
    {
      label: "Dark Theme",
      value: "dark",
      icon: GeneralIcons.dark_theme,
    },
  ];

  return (
    <section className={styles.account}>
      <div className={`${styles.wrapper} ${styles.top}`}>
        <Dispa8chAvatar name={fullName} image="" size="md" />
        <div>
          <p>{fullName}</p>
          <small>{email}</small>
        </div>
      </div>
      <div className={`${styles.wrapper} ${styles.middle}`}>
        {middle.map((d, i) => (
          <button key={i} onClick={(e) => d.action(e)}>
            {d.icon} <span>{d.label}</span>
          </button>
        ))}
      </div>
      <div className={`${styles.wrapper} ${styles.bottom}`}>
        <button
          className={styles.toggle}
          onClick={() => setToggled((prev) => !prev)}
        >
          {GeneralIcons.theme} <span>Display: {Util.capitalize(theme)}</span>{" "}
          <span className={styles.icon}>{GeneralIcons.chevron_right}</span>
        </button>
        {toggled && (
          <div>
            {themes.map((t, i) => (
              <button
                key={i}
                onClick={() => {
                  updateTheme(t.value as Theme);
                  setToggled((prev) => !prev);
                }}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <Dispa8chModal
        onClose={() => {
          setModal(false);
        }}
        title="Logout"
        visible={modal}
        actionButtonPayload={{
          action: () => {},
          label: "Yes, logout",
        }}
      >
        <div></div>
      </Dispa8chModal>
    </section>
  );
}

export default Account;
