import React from "react";
import ReactModal, { Props } from "react-modal";
import { XIcon } from "@heroicons/react/outline";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default function Modal(props: Props) {
  return (
    <ReactModal
      style={customStyles}
      className="relative min-w-[520px] dark:bg-gray-900 bg-white px-6 py-8 rounded-lg border-indigo-500 border-2 outline-transparent"
      {...props}
    >
      <XIcon
        onClick={props.onRequestClose}
        className="w-6 h-6 hover:text-blue-500 text-gray-300 absolute right-2 top-2 cursor-pointer"
      />
      {props.children}
    </ReactModal>
  );
}
