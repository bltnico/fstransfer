import { createContext, ReactNode, Dispatch, SetStateAction, useState, useContext, useEffect } from 'react';

import { generateFingerprint } from 'app/services/session';

export enum LogoState {
  THIRD = 'THIRD',
  HALF = 'HALF',
  FULL = 'FULL',
};

export type AppContext = {
  fingerprint: string | null;
  logoState: LogoState;
  setLogoState: Dispatch<SetStateAction<LogoState>>;
};

const defaultContext = {
  fingerprint: null,
  logoState: LogoState.THIRD,
  setLogoState: () => {},
};

const StateContext = createContext<AppContext>(defaultContext);

interface Props {
  children: ReactNode;
};

const AppProvider = ({ children }: Props) => {
  const [logoState, setLogoState] = useState<LogoState>(LogoState.THIRD);
  const [fingerprint, setFingerprint] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setFingerprint(
        await generateFingerprint()
      );
    })();
  }, []);

  return (
    <StateContext.Provider value={{
      fingerprint,
      logoState,
      setLogoState,
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useApp = () => useContext(StateContext);

export default AppProvider;
