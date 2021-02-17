import { useState, useEffect, useCallback, useMemo, Dispatch, SetStateAction } from 'react';

export interface Storage {
  persist: (key: string, value: string) => void;
  hydrate: (key: string, defaultValue: any) => string;
  purge: (key: string) => void;
};

export interface Transform {
  toString: (data: any) => string;
  toJSON: (str: string) => any;
};

export interface Config {
  storage?: Storage;
  transform?: Transform;
  namespace?: (base: string) => string;
};

const namespace = (base: string) => `__syncstate/${base}`;

const storage: Storage = {
  persist: (key: string, value: string) => localStorage.setItem(key, value),
  hydrate: (key: string, defaultValue: any) => localStorage.getItem(key) || defaultValue,
  purge: (key: string) => localStorage.removeItem(key),
};

const transform: Transform = {
  toString: (data: any = null) => JSON.stringify(data),
  toJSON: (str: string = '') => JSON.parse(str),
};

const useSyncState = <T>(
  keySuffix: string,
  defaultValue: T,
  stateConfig: Config | null = null,
): [
  T,
  Dispatch<SetStateAction<T>>,
  () => void,
] => {
  const config = useMemo(() => ({
    storage: stateConfig?.storage || storage,
    transform: stateConfig?.transform || transform,
    namespace: stateConfig?.namespace || namespace,
  }), [stateConfig]);

  const isBrowser = useMemo(() => typeof window !== 'undefined', []);
  const key = useMemo(() => config.namespace(keySuffix), [config, keySuffix]);

  const [state, setState] = useState(
    () => {
      if (isBrowser) {
        return config.transform.toJSON(
          config.storage.hydrate(
            key,
            config.transform.toString(defaultValue),
          ),
        );
      }

      return defaultValue;
    }
  );

  const purge = useCallback(() => {
    setState(defaultValue);
    if (isBrowser) {
      config.storage.purge(key);
    }
  }, [key, defaultValue, config, isBrowser]);

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    const handleFocus = () => {
      setState(
        config.transform.toJSON(
          config.storage.hydrate(
            key,
            config.transform.toString(defaultValue),
          ),
        ),
      );
    };

    window.addEventListener('storage', handleFocus, false);
    return () => window.removeEventListener('storage', handleFocus);
  }, [key, defaultValue, config, isBrowser]);

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    config.storage.persist(
      key,
      config.transform.toString(state),
    );
  }, [key, state, config, isBrowser]);

  return [state, setState, purge];
};

export default useSyncState;
