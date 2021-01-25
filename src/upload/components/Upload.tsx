import Loader from 'app/components/Loader';
import FileReader from 'upload/components/FileReader';
import TimeSelect from 'upload/components/TimeSelect';
import { useUpload, TransferStatus } from 'upload/components/UploadProvider';
import ShareButton from 'upload/components/ShareButton';
import TransferButton from 'upload/components/TransferButton';

import './App.css';

const Upload = () => {
  const { status } = useUpload();

  return (
    <div className={'App'}>
      {status === TransferStatus.DEFAULT && (
        <>
          <FileReader />
          <TimeSelect />
          <TransferButton />
        </>
      )}
      {status === TransferStatus.LOADING && (
        <Loader />
      )}
      {status === TransferStatus.SUCCESS && (
        <ShareButton />
      )}
    </div>
  );
}

export default Upload;
