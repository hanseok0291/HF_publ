export const validateImageFile = (file: File) => {
  // const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp"
  ];

  // if (file.size > MAX_FILE_SIZE) {
  //   throw new Error("파일 크기는 5MB를 초과할 수 없습니다.");
  // }

  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    alert("JPG, PNG, WEBP 형식의 이미지만 업로드 가능합니다.");
    throw new Error("JPG, PNG, WEBP 형식의 이미지만 업로드 가능합니다.");
  }
};
