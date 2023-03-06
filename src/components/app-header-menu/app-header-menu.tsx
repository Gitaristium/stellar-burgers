// import { useState } from "react";
import styles from "./app-header-menu.module.css";

export default function AppHeaderMenu({
  curLink,
  link,
  text,
  className,
  onClick,
  children,
}: {
  curLink: string;
  link: string;
  text: string;
  className: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <li
      className={`text text_type_main-default  pt-4 pb-4 pl-5 pr-5
          ${curLink !== link && "text_color_inactive"} ${className}`}
    >
      <span className={`${styles.link} remove-select`} onClick={onClick}>
        {children}
        <span className="ml-2">{text}</span>
      </span>
    </li>
  );
}
