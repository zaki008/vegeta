import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";

export const GET = async () => {
  try {
    const products = await prisma.product.findMany({});

    return Response({
      message: "Get All Products",
      data: products,
    });
  } catch (error) {
    return Response({
      message: "Failed to get products",
      data: error,
      status: 500,
    });
  }
};
