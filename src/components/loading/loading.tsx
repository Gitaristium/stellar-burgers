import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";
import styles from "./loading.module.css";

export default function Loading(props: { children: string }) {
  return (
    <div className={`${styles.loading} text text_type_main-large`}>
      {props.children}
    </div>
  );
}
