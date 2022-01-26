import React from "react";
import { Props } from "react-modal";
// import { invoke } from "@tauri-apps/api";

import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { Input } from "@/components/Form";

// import { RedisConnection } from "@bindings/RedisConnection";

// const connectionInfo: RedisConnection = {
//   host: "127.0.0.1",
//   port: 6379,
//   db: 0 as unknown as bigint,
//   username: null,
//   password: null,
// };

// invoke("test_connection", { connectionInfo })
//   .then(console.log)
//   .catch(console.error);

function Colors() {
  return (
    <>
      <p className="dark:text-white text-sm mb-1 cursor-default">Color</p>
      <div className="flex justify-between">
        <div className="bg-indigo-500 w-8 h-8 rounded-full cursor-pointer" />
        <div className="bg-rose-500 w-8 h-8 rounded-full cursor-pointer" />
        <div className="bg-blue-500 w-8 h-8 rounded-full cursor-pointer" />
        <div className="bg-green-500 w-8 h-8 rounded-full cursor-pointer" />
        <div className="bg-red-500 w-8 h-8 rounded-full cursor-pointer" />
        <div className="bg-yellow-500 w-8 h-8 rounded-full cursor-pointer" />
        <div className="bg-slate-500 w-8 h-8 rounded-full cursor-pointer" />
        <div className="bg-teal-500 w-8 h-8 rounded-full cursor-pointer" />
      </div>
    </>
  );
}

export default function ConnectionModal(props: Props) {
  return (
    <Modal {...props}>
      <h1 className="text-lg dark:text-white font-semibold mb-4">
        Add new connection
      </h1>

      <Input className="mb-4" placeholder="localhost" id="name" label="Name" />

      <div className="flex mb-4">
        <Input
          className="mr-3"
          placeholder="127.0.0.1"
          id="host"
          label="Host"
        />
        <Input placeholder="6379" id="port" label="Port" />
      </div>

      <div className="flex mb-4">
        <Input
          className="mr-3"
          placeholder="admin"
          id="username"
          label="Username"
        />
        <Input
          placeholder="••••••"
          id="password"
          type="password"
          label="Password"
        />
      </div>

      <Colors />

      <div className="flex mt-10">
        <Button>Test connection</Button>
        <div className="flex ml-auto">
          <Button
            className="mr-2"
            variant="neutral"
            onClick={props.onRequestClose}
          >
            Cancel
          </Button>
          <Button variant="success">Save</Button>
        </div>
      </div>
    </Modal>
  );
}
