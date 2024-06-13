import SideBar from "@/components/app/SideBar/SideBar";

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex h-screen">
      <SideBar />
      {children}
    </div>
  );
};

export default AppLayout;
