import React, { useState } from "react";
import { CogIcon, PlusCircleIcon } from "@heroicons/react/outline";

import ConnectionModal from "@/components/ConnectionModal";

const connections = [
  {
    id: 1,
    name: "Docker",
    address: "127.0.0.1",
    port: "6379",
  },
  {
    id: 2,
    name: "localhost",
    address: "127.0.0.1",
    port: "6379",
  },
];

export default function Connections() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ConnectionModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />

      <div className="shadow-xl h-full min-w-64 relative select-none">
        <div className="flex items-center justify-between pl-4 py-3 bg-indigo-500">
          <h1 className="text-white font-bold">Connections</h1>
          <PlusCircleIcon
            className="h-5 w-5 text-white cursor-pointer mr-4"
            onClick={() => setIsModalOpen(true)}
          />
        </div>

        {connections.map((connection) => (
          <button
            key={connection.id}
            className="mb-2 dark:bg-gray-800 bg-gray-100 flex items-center justify-between cursor-pointer w-full outline-transparent"
          >
            <div
              className={`${
                connection.id === 1 ? "border-l-teal-500" : "border-l-blue-500"
              } border-l-4 pl-3 text-left`}
            >
              <p className="mt-1 dark:text-white font-medium">
                {connection.name}
              </p>
              <p className="text-gray-500 mb-1 text-sm">
                {connection.address}:{connection.port}
              </p>
            </div>
            <CogIcon className="h-5 w-5 hover:text-blue-400 text-gray-400 cursor-pointer mr-4" />
          </button>
        ))}
      </div>
    </>
  );
}
