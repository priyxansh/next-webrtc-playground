import { SIDEBAR_LINKS } from "@/constants/sidebar-links";
import SideBarLink from "./SideBarLink";
import ThemeToggler from "@/components/global/ThemeToggler";

type SideBarProps = {};

const SideBar = ({}: SideBarProps) => {
  return (
    <aside className="h-full border-r px-2 py-4">
      <div className="flex flex-col gap-2">
        <ThemeToggler />
        <hr />
        {SIDEBAR_LINKS.map((link) => {
          return (
            <SideBarLink
              key={link.id}
              path={link.path}
              icon={link.icon}
              label={link.label}
            />
          );
        })}
      </div>
    </aside>
  );
};

export default SideBar;
