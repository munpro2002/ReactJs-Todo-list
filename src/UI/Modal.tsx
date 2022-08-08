import React from "react";
import ReactDom from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props: any) => {
  return <div className={classes.backdrop} onClick={props.onCloseModal} />;
};

const ModalOverlays = (props: any) => {
  return <div className={classes.overlay}>{props.children}</div>;
};

const portalElement: any = document.getElementById("overlays");

const Modal = (props: any) => {
  return (
    <React.Fragment>
      {ReactDom.createPortal(
        <Backdrop onCloseModal={props.onCloseModal} />,
        portalElement
      )}
      {ReactDom.createPortal(
        <ModalOverlays>{props.children}</ModalOverlays>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Modal;
