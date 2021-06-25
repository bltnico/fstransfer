import { ReactNode, useEffect, useState } from 'react';

import { isInInsecureContext } from 'app/services/navigator';
import Button from 'app/components/Button';

interface Props {
  children: any;
};

const InsecureContextProvider = ({ children }: Props) => {
  const [isInInsecureCtx, setInsecureCtx] = useState<boolean>(false);
  const [insecureCtxFriendly, allowInsecureCtx] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        await isInInsecureContext();
      } catch (e) {
        setInsecureCtx(true);
      }
    })();
  }, []);

  if (!isInInsecureCtx || insecureCtxFriendly) {
    return children;
  }

  return (
    <>
      <p> page non secure </p>
      <Button onClick={() => allowInsecureCtx(true)} label={'Continue'} />
      <Button
        onClick={() => {}}
        label={'Cancel'} />
    </>
  );
};

export default InsecureContextProvider;
