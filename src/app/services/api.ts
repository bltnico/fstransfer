import { version } from './../../../package.json';
import { signHMACSha256 } from 'app/services/crypto';

/**
 * @TODO
 * Improve API security
 * Use signature & timeout between requests
 * Generate uniq ID to sign
 */

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
const API_URL = process.env.REACT_APP_API_URL || 'https://fstransfer.herokuapp.com';

const endpoint = (path: string): string => `${API_URL}${path}`;

const signRequest = async (method: string, endpoint: string, fingerprint: string): Promise<{
  signature: string,
  timestamp: string,
  version: string,
}> => {
  const timestamp = Date.now().toString();
  const signature = await signHMACSha256(`${method}:${endpoint}:${timestamp}:${version}:${fingerprint}`);

  return {
    signature,
    timestamp,
    version,
  };
}

export async function transfer(fingerprint: string, fileBuffer: ArrayBuffer): Promise<string> {
  const path = '/transfer';
  const { signature, timestamp, version } = await signRequest('POST', path, fingerprint);

  const headers = new Headers();
  headers.append('Content-Type', 'application/octet-stream');
  headers.append('x-fingerprint', fingerprint);
  headers.append('x-signature', signature);
  headers.append('x-timestamp', timestamp);
  headers.append('x-version', version);

  const response = await fetch(
    endpoint(path),
    {
      method: 'POST',
      headers,
      body: fileBuffer,
    },
  );

  const { success, data } = await response.json() as any;
  if (!success) {
    throw new Error();
  }

  return data.id;
}

export async function receive(fileId: string): Promise<ArrayBuffer> {
  const path = `/receive/${fileId}`;
  const { signature, timestamp, version } = await signRequest('GET', path, '');

  const headers = new Headers();
  headers.append('x-fingerprint', '');
  headers.append('x-signature', signature);
  headers.append('x-timestamp', timestamp);
  headers.append('x-version', version);

  const response = await fetch(
    endpoint(path),
    { headers },
  );

  if (response.status === 404) {
    throw new Error('File no longer exist');
  }

  const fileEncrypted = await response.arrayBuffer();
  return fileEncrypted;
}
