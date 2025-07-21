import React, {
  createContext,
  useMemo,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

type LoginContext = {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
};

const LoginContext = createContext<LoginContext>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export function LoginContextProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const productPageContextObj = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
    }),
    [isLoggedIn]
  );

  return (
    <LoginContext.Provider value={productPageContextObj}>
      {children}
    </LoginContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLoginContext = () => useContext(LoginContext);
