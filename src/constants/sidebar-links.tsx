import { PlusIcon, WorkflowIcon } from "lucide-react";

export const SIDEBAR_LINKS = [
  {
    id: 1,
    label: "Create Room",
    path: "/create-room",
    icon: <PlusIcon size={24} />,
  },
  {
    id: 2,
    label: "Join Room",
    path: "/join-room",
    icon: <WorkflowIcon size={24} />,
  },
];
