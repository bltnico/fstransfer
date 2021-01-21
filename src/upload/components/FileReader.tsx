import { useEffect, useMemo, useRef, useState } from 'react';
import cx from 'classnames';

import { fileToBase64, fileTypeFromBase64, FileType } from 'app/services/file';
import { useApp, LogoState } from 'app/components/AppProvider';
import { useUpload } from 'upload/components/UploadProvider';

import { ReactComponent as UploadIcon } from 'upload.svg';
import { ReactComponent as ShieldIcon } from 'shield2.svg';
import { ReactComponent as ErrorIcon } from 'cancel.svg';

import styles from 'upload/components/FileReader.module.css';

const FileReader = () => {
  const { setLogoState } = useApp();
  const { file, setFile } = useUpload();
  const [error, setError] = useState<string | null>(null);
  const handler = useRef() as React.MutableRefObject<HTMLLabelElement>;
  const input = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (!input.current || !handler.current) {
      return;
    }

    const iref = input.current;
    const href = handler.current;

    const onInputRefChange = async () => {
      if (!iref.files || iref.files?.length === 0) {
        setFile(null);
        setError('Missing file');
        return;
      }

      const base64 = await fileToBase64(iref.files[0]);
      const type = await fileTypeFromBase64(base64 as string);

      if (type === FileType.UNKNOW) {
        setFile(null);
        setError('File format not supported');
        return;
      }

      setFile(base64);
      setLogoState(LogoState.HALF);
      setError(null);
    };

    iref.addEventListener('change', onInputRefChange, false);

    const cancelEvent = (event: DragEvent) => event.preventDefault();
    const onHandlerRefDrop = (event: DragEvent) => {
      iref.files = event.dataTransfer?.files || null;
      onInputRefChange();
      cancelEvent(event);
    };

    href.addEventListener('dragover', cancelEvent);
    href.addEventListener('dragenter', cancelEvent);
    href.addEventListener('drop', onHandlerRefDrop);

    return () => {
      if (iref) {
        iref.removeEventListener('change', onInputRefChange);
      }

      if (href) {
        href.removeEventListener('dragover', cancelEvent);
        href.removeEventListener('dragenter', cancelEvent);
        href.removeEventListener('drop', onHandlerRefDrop);
      }
    }
  }, [input, handler, setFile, setLogoState]);

  const renderError = useMemo(() => {
    if (!error) {
      return null;
    }

    return (
      <>
        <ErrorIcon width={'80%'} height={'80%'} color={'#fff'} />
        <span>{error}</span>
      </>
    );
  }, [error]);

  const handlerStyles = cx(styles.handler, {
    [styles.loaded]: file,
    [styles.error]: error,
  });

  return (
    <div className={styles.container}>
      <label
        className={handlerStyles}
        ref={handler}
        htmlFor={'fileloader'}>
        {(!file && !error) && <UploadIcon width={'80%'} height={'80%'} />}
        {(file && !error) && <ShieldIcon width={'80%'} height={'80%'} color={'#fff'} />}
        {renderError}
      </label>
      <input
        ref={input}
        id={'fileloader'}
        className={styles.inputFile}
        type={'file'}
        accept={'image/*, .pdf'}
        capture />
    </div>
  );
}

export default FileReader;
