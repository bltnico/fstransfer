import { createContext, ReactNode, Dispatch, SetStateAction, useState, useContext, useEffect } from 'react';

import { generateFingerprint } from 'app/services/session';

export enum TransferStatus {
  DEFAULT = 'DEFAULT',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
};

export type UploadContext = {
  status: TransferStatus;
  fingerprint: string | null;
  file: string | ArrayBuffer | null;
  duration: string | null;
  shareUrl: string | null;
  setStatus: Dispatch<SetStateAction<TransferStatus>>;
  setFile: Dispatch<SetStateAction<string | ArrayBuffer | null>>;
  setDuration: Dispatch<SetStateAction<string | null>>;
  setShareUrl: Dispatch<SetStateAction<string | null>>;
};

const defaultContext = {
  status: TransferStatus.DEFAULT,
  fingerprint: null,
  file: null,
  duration: null,
  shareUrl: null,
  setStatus: () => {},
  setFile: () => {},
  setDuration: () => {},
  setShareUrl: () => {},
};

const StateContext = createContext<UploadContext>(defaultContext);

interface Props {
  children: ReactNode;
};

const UploadProvider = ({ children }: Props) => {
  const [status, setStatus] = useState<TransferStatus>(TransferStatus.DEFAULT);
  const [fingerprint, setFingerprint] = useState<string | null>(null);
  const [file, setFile] = useState<string | ArrayBuffer | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setFingerprint(
        await generateFingerprint()
      );
    })();
  }, []);

  return (
    <StateContext.Provider value={{
      status,
      fingerprint,
      file,
      duration,
      shareUrl,
      setStatus,
      setFile,
      setDuration,
      setShareUrl,
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useUpload = () => useContext(StateContext);

export default UploadProvider;
