import React from "react";
import ReactModal, { Props } from "react-modal";
import { XIcon } from "@heroicons/react/outline";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    minWidth: "400px",
    backgroundColor: "rgb(17, 24, 39)",
    borderColor: "rgb(99, 102, 241)",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function Modal(props: Props) {
  return (
    <ReactModal style={customStyles} {...props}>
      <XIcon
        onClick={props.onRequestClose}
        className="w-6 h-6 hover:text-blue-500 text-gray-300 absolute right-2 top-2 cursor-pointer"
      />
      {props.children}
    </ReactModal>
  );
}
