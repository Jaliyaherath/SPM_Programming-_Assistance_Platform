import React from "react";
import ForumDrawer from "./ForumDrawer";
import { ForumProvider } from "@/context/ForumProvider";

const Forum = ({ labId }: { labId: string }) => {
  return (
    <ForumProvider>
      <ForumDrawer labId={labId} />
    </ForumProvider>
  );
};

export default Forum;
