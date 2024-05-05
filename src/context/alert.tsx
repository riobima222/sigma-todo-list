import { createContext, useState } from "react";

const AlertContext = createContext({});

const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alert, setAlert] = useState(false);

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const alertcontext = AlertContext;
export default AlertProvider;
