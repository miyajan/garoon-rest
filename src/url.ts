export const buildPath = (params: { endpointName: string }) => {
  const { endpointName } = params;
  return `/g/api/v1/${endpointName}`;
};
