import { useEffect, useRef, useState } from 'react';
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
  const [error, setError] = useState<boolean>(false);
  const input = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (!input.current) {
      return;
    }

    const iref = input.current;

    const onInputRefChange = async () => {
      if (!iref.files || iref.files?.length === 0) {
        // @XXX dev only
        console.error('Empty file reader');
        setFile(null);
        setError(true);
        return;
      }

      const base64 = await fileToBase64(iref.files[0]);
      const type = await fileTypeFromBase64(base64 as string);

      if (type === FileType.UNKNOW) {
        // @XXX dev only
        console.error('File format not supported');
        setFile(null);
        setError(true);
        return;
      }

      setFile(base64);
      setLogoState(LogoState.HALF);
    };

    iref.addEventListener('change', onInputRefChange, false);
    return () => {
      if (iref) {
        iref.removeEventListener('change', onInputRefChange);
      }
    }
  }, [input, setFile]);

  const handlerStyles = cx(styles.handler, {
    [styles.loaded]: file,
    [styles.error]: error,
  });

  return (
    <div className={styles.container}>
      <label
        className={handlerStyles}
        htmlFor={'fileloader'}>
        {(!file && !error) && <UploadIcon width={'80%'} height={'80%'} />}
        {(file && !error) && <ShieldIcon width={'80%'} height={'80%'} color={'#fff'} />}
        {error && <ErrorIcon width={'80%'} height={'80%'} color={'#fff'} />}
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
