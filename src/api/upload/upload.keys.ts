export const uploadQueryKeys = {
  postUploadImages: () => 'uploads',
  postDeleteImage: (id: string) => `file/${id}`,
};
