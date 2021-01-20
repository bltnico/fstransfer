import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Download = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const { id } = useParams() as { id: string };

  useEffect(() => {
    (async () => {
      try {
        const jwk = window.location.hash.slice("#k=".length);
        const key = await window.crypto.subtle.importKey(
          'jwk',
          {
            k: jwk,
            alg: 'A128GCM',
            ext: true,
            key_ops: ['encrypt', 'decrypt'],
            kty: 'oct',
          },
          { name: 'AES-GCM', length: 128 },
          false, // extractable
          ['decrypt']
        );

        const response = await fetch(`http://localhost:5001/receive?id=${id}`, {
          method: 'GET',
          // headers: {
          //   'Content-Type': 'text/plain',
          // },
        });

        // @ts-ignore
        const encrypted = await response.arrayBuffer();
        console.log(encrypted);

        const decrypted = await window.crypto.subtle.decrypt(
          { name: 'AES-GCM', iv: new Uint8Array(12) },
          key,
          // new Uint8Array(encrypted),
          encrypted,
        );

        const decoded = new window.TextDecoder().decode(new Uint8Array(decrypted));
        // const content = JSON.parse(decoded);
        console.log(decoded.substring("data:image/".length, decoded.indexOf(";base64")));
        setPreview(decoded as string);
      } catch (e) {
        console.error('download error: ', e);
      }
    })();
  }, [id]);

  return (
    <>
      {preview && <a href={preview} download>Download</a>}
      {/* {preview && <iframe src={preview} width={'100%'} height={'100%'} />} */}
      {preview && <img src={preview} width={'100%'} />}
    </>
  );
}

export default Download;
