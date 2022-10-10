type FileReaderMethod =
  | 'readAsArrayBuffer'
  | 'readAsBinaryString'
  | 'readAsDataURL'
  | 'readAsText';

export const useFileReader = () => {
  if (import.meta.env.SSR) {
    return {
      readAsArrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      readAsBinaryString: () => Promise.resolve(''),
      readAsDataURL: () => Promise.resolve(''),
      readAsText: () => Promise.resolve('')
    };
  }

  const reader = new FileReader();

  const readAsync =
    <T extends FileReaderMethod>(method: T) =>
    (file: Blob) =>
      new Promise<T extends 'readAsArrayBuffer' ? ArrayBuffer : string>(
        (resolve, reject) => {
          reader[method](file);
          reader.onload = () => resolve(reader.result as any);
          reader.onerror = () => reject(reader.error);
        }
      );

  const readAsArrayBuffer = readAsync('readAsArrayBuffer');
  const readAsBinaryString = readAsync('readAsBinaryString');
  const readAsDataURL = readAsync('readAsDataURL');
  const readAsText = readAsync('readAsText');

  return {
    readAsArrayBuffer,
    readAsBinaryString,
    readAsDataURL,
    readAsText
  };
};
