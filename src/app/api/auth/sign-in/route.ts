import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import bycript from "bcrypt";

export const POST = async (req: Request) => {
  try {
    const payload = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!user || !bycript.compareSync(payload.password, user.password)) {
      return Response({
        message: "Email or Password is wrong",
        status: 404,
      });
    }

    const data: Partial<User> = {
      ...user,
      password: undefined,
    };

    // const data = user;

    return Response({
      message: "Login Is Succesfully",
      data,
    });
  } catch (error) {
    return Response({
      message: "Sign In Failed",
      data: error,
      status: 500,
    });
  }
};
