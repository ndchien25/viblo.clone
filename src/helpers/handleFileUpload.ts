export const handleFileUpload = async (file: File, preSignedUrl: string) => {
  const response = await fetch(preSignedUrl, {
    method: 'PUT',
    body: file,
  });
  return response
};