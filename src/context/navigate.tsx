import { createContext, useState } from "react";

const NavigateContext = createContext({});

const NavigateProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectTask, setSelectTask] = useState(true);
  const [selectHist, setSelectHist] = useState(false);

  const handleSelectTask = () => {
    setSelectTask(true);
    setSelectHist(false);
  };
  const handleSelectHist = () => {
    setSelectHist(true);
    setSelectTask(false);
  };

  return (
    <NavigateContext.Provider
      value={{ selectTask, selectHist, handleSelectTask, handleSelectHist }}
    >
      {children}
    </NavigateContext.Provider>
  );
};

export const navigatecontext = NavigateContext;
export default NavigateProvider;
