export const parseRoute = (route: string, id: string): string => {
  return route.replace('[id]', id);
};
