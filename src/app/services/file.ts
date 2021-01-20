
export async function fileToBase64(file: Blob): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}

export enum FileType {
  IMAGE = 'IMAGE',
  PDF = 'PDF',
  UNKNOW = 'UNKNOW',
};

export async function fileTypeFromBase64(base64: string): Promise<FileType> {
  const mimeType = base64.substring(
    'data:'.length,
    base64.indexOf(';base64'),
  );

  switch (mimeType) {
    case 'image/png':
    case 'image/jpg':
    case 'image/jpeg':
    case 'image/gif':
      return FileType.IMAGE;
    case 'application/pdf':
      return FileType.PDF;
    default:
      return FileType.UNKNOW;
  }
}