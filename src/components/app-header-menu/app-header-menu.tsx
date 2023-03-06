// import { useState } from "react";
import styles from "./app-header-menu.module.css";

export default function AppHeaderMenu(props: {
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
          ${props.curLink !== props.link && "text_color_inactive"} ${
        props.className
      }`}
    >
      <span className={`${styles.link} remove-select`} onClick={props.onClick}>
        {props.children}
        <span className="ml-2">{props.text}</span>
      </span>
    </li>
  );
}
