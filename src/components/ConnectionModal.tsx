import React from "react";
import { Props } from "react-modal";

import Modal from "@/components/Modal";

export default function ConnectionModal(props: Props) {
  return (
    <Modal {...props}>
      <h1 className="text-lg text-white font-semibold">Add new connection</h1>
    </Modal>
  );
}
