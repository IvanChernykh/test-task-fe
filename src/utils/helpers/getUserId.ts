export const getUserId = (pathname: string) => {
  return pathname.split('/')[1];
};
