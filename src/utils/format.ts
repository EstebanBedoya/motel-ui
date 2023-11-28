const requestsHost = {
  roomsHost: process.env.ROOMS_SERVICE_HOST,
};

export const formatRequest = (request: string) => {
  const regex = /{([^}]+)}/g;

  return request.replace(
    regex,
    (_, capturedGroup) =>
      requestsHost[capturedGroup as keyof typeof requestsHost] ?? ""
  );
};
