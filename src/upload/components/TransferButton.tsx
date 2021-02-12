import { useCallback, useMemo } from 'react';

import * as api from 'app/services/api';
import * as navigator from 'app/services/navigator';
import * as crypto from 'app/services/crypto';
import Button from 'app/components/Button';
import { useApp, LogoState } from 'app/components/AppProvider';
import { useUpload, TransferStatus } from 'upload/components/UploadProvider';

const TransferButton = () => {
  const { setLogoState } = useApp();
  const { file, fingerprint, status, setStatus, setShareUrl } = useUpload();

  const canTransfer = useMemo(() => file && fingerprint, [file, fingerprint]);

  const cancel = useCallback(() => window.location.href = '/', []);

  const upload = useCallback(async () => {
    setStatus(TransferStatus.LOADING);

    try {
      const cryptoKey = await crypto.generateKey();
      const fileBuffer = await crypto.encryptWithKey(cryptoKey, file as string);
      const keyString = await crypto.exportKey(cryptoKey);

      const fileId = await api.transfer(fingerprint as string, fileBuffer);
      const url = await navigator.toShareUrl(fileId, keyString as string);

      setShareUrl(url);
      setStatus(TransferStatus.SUCCESS);
      setLogoState(LogoState.FULL);
    } catch (e) {
      setStatus(TransferStatus.FAILURE);
    }
  }, [file, fingerprint, setShareUrl, setStatus, setLogoState]);

  if (!canTransfer) {
    return null;
  }

  return (
    <>
      <Button
        cancel
        onClick={cancel}
        label={'Cancel'} />
      <Button
        onClick={upload}
        label={'Transfer'}
        disabled={status === TransferStatus.LOADING}
        gradient />
    </>
  );
};

export default TransferButton;
