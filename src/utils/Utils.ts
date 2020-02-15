export function calculateIndex(
  currentIndex: number,
  increment: number,
  albumLength: number
) {
  if (currentIndex + increment <= -1) {
    return albumLength - 1;
  } else if (currentIndex + increment >= albumLength) {
    return 0;
  } else {
    return currentIndex + increment;
  }
}

export function getImageUrl(imageType: string, path: string) {
  return `${process.env.VUE_APP_IMAGE_HOST}${imageType}${path}`;
}
