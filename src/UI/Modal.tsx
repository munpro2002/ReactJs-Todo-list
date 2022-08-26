import React from "react";
import ReactDom from "react-dom";
import classes from "./Modal.module.css";

type BackdropProps = {
  onCloseModal: () => void;
};

const Backdrop = (props: BackdropProps) => {
  return <div className={classes.backdrop} onClick={props.onCloseModal} />;
};

type ModalOverlaysProps = {
  children: React.ReactNode;
};

const ModalOverlays = (props: ModalOverlaysProps) => {
  return <div className={classes.overlay}>{props.children}</div>;
};

type ModalProps = {
  onCloseModal: () => void;
  children: React.ReactNode;
};

const portalElement: HTMLElement = document.getElementById("overlays")!;

const Modal = (props: ModalProps) => {
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
