import { PrismaClient } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient({
    log: ["query"],
  });
  const { count } = await prisma.payslip.updateMany({
    where: {
      AND: [
        { employeeId: { in: [""] } },
        { status: "uploaded" },
        { paymentDate: new Date() },
        { publishedAt: null },
      ],
    },
    data: {
      status: "published",
      publishedAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log(count);
  prisma.$disconnect();
}

main();
