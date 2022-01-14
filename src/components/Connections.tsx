import React, { useRef, useState } from "react";
import { CogIcon, PlusCircleIcon } from "@heroicons/react/outline";

import ConnectionModal from "@/components/ConnectionModal";

import useResizable from "@/hooks/useResizable";

const connections = [
  {
    id: 1,
    name: "Docker",
    address: "127.0.0.1",
    port: "6379",
    starred: false,
  },
  {
    id: 2,
    name: "localhost",
    address: "127.0.0.1",
    port: "6379",
    starred: false,
  },
];

export default function Connections() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const target = useRef(null);
  const resizer = useRef(null);

  const { isResizing } = useResizable(target, resizer, {
    minResizeWidth: 200,
    maxResizeWidth: 325,
  });

  return (
    <>
      <ConnectionModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />

      <div
        ref={target}
        className="shadow-2xl h-full min-w-64 w-64 relative select-none"
      >
        <div
          ref={resizer}
          className={`${
            !isResizing && "opacity-30"
          } absolute hover:opacity-100 transition bg-indigo-500 w-1 h-full -right-1 top-0 cursor-e-resize`}
        />

        <div className="flex items-center justify-between pl-4 py-3 bg-indigo-500">
          <h1 className="text-white font-bold">Connections</h1>
          <PlusCircleIcon
            className="h-5 w-5 text-white cursor-pointer mr-4"
            onClick={() => setIsModalOpen(true)}
          />
        </div>

        {connections.map((connection) => (
          <div
            key={connection.id}
            className="mb-2 bg-gray-800 cursor-default flex items-center justify-between"
          >
            <div className="border-l-teal-400 border-l-4 pl-3">
              <p className="mt-1 text-white font-medium">{connection.name}</p>
              <p className="text-gray-500 mb-1 text-sm">
                {connection.address}:{connection.port}
              </p>
            </div>
            <CogIcon className="h-5 w-5 hover:text-blue-400 text-gray-400 cursor-pointer mr-4" />
          </div>
        ))}
      </div>
    </>
  );
}
