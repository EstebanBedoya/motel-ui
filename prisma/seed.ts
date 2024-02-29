import { PrismaClient, RateType, Role } from '@prisma/client';

const prisma = new PrismaClient();

const cleanDatabase = async () => {
  await prisma.record.deleteMany();
  await prisma.additionals.deleteMany();
  await prisma.price.deleteMany();
  await prisma.room.deleteMany();
  await prisma.user.deleteMany();
};

const seedUser = async () => {
  const user = await prisma.user.create({
    data: {
      email: 'test@test.com',
      password: 'password',
      role: Role.admin,
    },
  });

  return user;
};

const seedRooms = async () => {
  const mockItems = [
    { id: 101, type: 'sencilla', name: 'secilla' },
    { id: 102, type: 'jacuzzi', name: 'Especial Name' },
    { id: 103, type: 'sauna', name: 'Especial Name' },
    { id: 104, type: 'sencilla', name: 'secilla' },
    { id: 105, type: 'jacuzzi', name: 'Especial Name' },
    { id: 106, type: 'sauna', name: 'Especial Name' },
    { id: 107, type: 'sencilla', name: 'secilla' },
  ];

  const pricesHourly = [
    {
      roomId: 101,
      weekday: 10000,
      weekend: 20000,
      rateType: RateType.hourly,
    },
    {
      roomId: 102,
      weekday: 30000,
      weekend: 50000,
      rateType: RateType.hourly,
    },
    {
      roomId: 103,
      weekday: 30000,
      weekend: 50000,
      rateType: RateType.hourly,
    },
    {
      roomId: 104,
      weekday: 10000,
      weekend: 20000,
      rateType: RateType.hourly,
    },
    {
      roomId: 105,
      weekday: 30000,
      weekend: 50000,
      rateType: RateType.hourly,
    },
    {
      roomId: 106,
      weekday: 30000,
      weekend: 50000,
      rateType: RateType.hourly,
    },
    {
      roomId: 107,
      weekday: 10000,
      weekend: 20000,
      rateType: RateType.hourly,
    },
  ];

  const pricesOvernight = [
    {
      roomId: 101,
      weekday: 15000,
      weekend: 30000,
      rateType: RateType.overnight,
    },
    {
      roomId: 102,
      weekday: 35000,
      weekend: 70000,
      rateType: RateType.overnight,
    },
    {
      roomId: 103,
      weekday: 35000,
      weekend: 70000,
      rateType: RateType.overnight,
    },
    {
      roomId: 104,
      weekday: 15000,
      weekend: 30000,
      rateType: RateType.overnight,
    },
    {
      roomId: 105,
      weekday: 35000,
      weekend: 70000,
      rateType: RateType.overnight,
    },
    {
      roomId: 106,
      weekday: 35000,
      weekend: 70000,
      rateType: RateType.overnight,
    },
    {
      roomId: 107,
      weekday: 15000,
      weekend: 30000,
      rateType: RateType.overnight,
    },
  ];

  const rooms = await prisma.room.createMany({
    data: mockItems,
  });

  await prisma.price.createMany({
    data: pricesHourly,
  });

  await prisma.price.createMany({
    data: pricesOvernight,
  });

  return rooms;
};

const seedAdditional = async () => {
  const mockItems = [
    { name: 'jacuzzi', price: 30000 },
    { name: 'sauna', price: 30000 },
    { name: 'bar', price: 10000 },
  ];

  const additional = await prisma.additionals.createMany({
    data: mockItems,
  });

  return additional;
};

const main = async () => {
  await cleanDatabase();
  console.log('Database cleaned');
  const user = await seedUser();
  console.log('seeded user:', user);
  const rooms = await seedRooms();
  console.log('seeded rooms:', rooms);
  const additional = await seedAdditional();
  console.log('seeded additional:', additional);
};

main()
  .then(async () => {
    console.log('Seeding complete!');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
