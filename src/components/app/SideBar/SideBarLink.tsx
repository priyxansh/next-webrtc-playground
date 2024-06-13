"use client";

import Hint from "@/components/global/Hint";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SideBarLinkProps = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

const SideBarLink = ({ path, icon, label }: SideBarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Hint
      content={label}
      side="right"
      trigger={
        <Button
          size={"icon"}
          variant={"ghost"}
          asChild
          className={`${isActive ? "bg-primary/20 hover:bg-primary/25" : ""}`}
        >
          <Link href={path} className="p-2 rounded-md">
            {icon}
          </Link>
        </Button>
      }
    />
  );
};

export default SideBarLink;
