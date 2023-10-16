import { FC } from "react";
// Wrapper FC
const Wrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="px-10 md:px-20 py-5">{children}</div>;
};

export default Wrapper;
