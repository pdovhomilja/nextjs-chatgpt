import React from "react";
import NewChat from "./NewChat";

const SideBar = () => {
  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          {/* New Chat */}
          <NewChat />

          <div>{/* Model Selection */}</div>
          {/* Chat List - Map trought chat rows */}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
