export const buildPath = (params: { endpointName: string }) => {
  const { endpointName } = params;
  return `/api/v1/${endpointName}`;
};
