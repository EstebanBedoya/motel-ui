const requestsHost = {
  roomsHost: process.env.NEXT_PUBLIC_ROOMS_SERVICE_HOST,
};

export const formatRequest = (request: string) => {
  const regex = /{([^}]+)}/g;

  return request.replace(
    regex,
    (_, capturedGroup) => requestsHost[capturedGroup as keyof typeof requestsHost] ?? '',
  );
};

export const formatPrice = (price: number) => price.toLocaleString('es-Co', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
