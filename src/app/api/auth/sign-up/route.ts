import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import bycript from "bcrypt";

export const POST = async (req: Request) => {
  try {
    const payload = await req.json();
    console.log("payload", payload);

    const data: Prisma.UserCreateInput = {
      name: payload.name,
      email: payload.email,
      password: bycript.hashSync(payload.password, 8),
    };

    const user = await prisma.user.create({
      data,
    });

    const dataRes: Partial<User> = {
      ...user,
      password: undefined,
    };

    console.log("data res", dataRes);

    return Response({
      message: "User Registered successfully",
      data: dataRes,
    });
  } catch (error) {
    return Response({
      message: "User Registered failed",
      data: error,
      status: 500,
    });
  }
};
