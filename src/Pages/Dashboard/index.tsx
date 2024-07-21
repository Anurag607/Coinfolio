import classNames from "classnames";

const DashboardPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={classNames({
        "relative py-4 pr-4 pl-2": true,
        "mobile:pr-0 mobile:pl-0": true,
        "flex flex-col items-start justify-start": true,
        "min-h-screen w-full": true,
        "overflow-x-hidden": !true,
        "bg-primary": false,
      })}
    >
      {children}
    </div>
  );
};

export default DashboardPage;
