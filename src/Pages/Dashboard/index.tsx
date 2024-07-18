import classNames from "classnames";

const DashboardPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={classNames({
        "relative py-4 pr-4 pl-2": true,
        "flex flex-col items-start justify-start gap-8": true,
        "h-screen w-full": true,
        "overflow-x-hidden": true,
        "bg-primary": false,
      })}
    >
      {children}
    </div>
  );
};

export default DashboardPage;
