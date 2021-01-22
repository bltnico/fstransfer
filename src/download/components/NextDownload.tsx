import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { extractJwkFromUrl, isInInsecureContext } from 'app/services/navigator';
import { decryptWithKey, importKey } from 'app/services/crypto';
import { fileTypeFromBase64, FileType } from 'app/services/file';
import { receive } from 'app/services/api';
import Loader from 'app/components/Loader';
import ImageViewer from 'download/components/ImageViewer';
import DownloadButton from 'download/components/DownloadButton';

import { ReactComponent as ShieldIcon } from 'shield2.svg';
import { ReactComponent as ErrorIcon } from 'cancel.svg';

import styles from 'download/components/Download.module.css';

const Download = () => {
  const [ready, setReady] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [fileType, setFileType] = useState<FileType>(FileType.UNKNOW);
  const [preview, setPreview] = useState<string | null>(null);
  const { id } = useParams() as { id: string };

  useEffect(() => {
    (async () => {
      try {
        await isInInsecureContext();
        const jwk = await extractJwkFromUrl();
        const key = await importKey(jwk);

        const buffer = await receive(id);
        const base64 = await decryptWithKey(key, buffer);

        const fileType = await fileTypeFromBase64(base64);

        setFileType(fileType);
        setPreview(base64 as string);
      } catch (e) {
        setError(e?.message);
      } finally {
        setReady(true);
      }
    })();
  }, [id]);

  const renderFile = useMemo(() => {
    if (!preview) {
      return null;
    }

    if (fileType === FileType.IMAGE) {
      return (
        <div className={styles.preview}>
          <ImageViewer base64={preview} />
        </div>
      );
    }

    if (fileType === FileType.PDF) {
      return (
        <div className={styles.preview}>
          <iframe
            title={preview.substring(0, 5)}
            src={preview} />
        </div>
      );
    }

    return null;
  }, [fileType, preview]);


  const renderContent = useMemo(() => {
    if (!ready) {
      return <Loader />;
    }

    return (
      <>
        {!error && <ShieldIcon className={styles.shield} />}
        {error && <ErrorIcon className={styles.shield} />}
        {error && <p>{error}</p>}
        {renderFile}
        {preview && <DownloadButton base64={preview} />}
      </>
    )
  }, [ready, error, preview, renderFile]);

  return (
    <div className={styles.container}>
      {renderContent}
    </div>
  );
}

export default Download;
