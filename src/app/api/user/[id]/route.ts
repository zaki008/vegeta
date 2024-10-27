import Response from "@/lib/api.response";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export const GET = async (req: NextResponse, params: Params) => {
  const id = params.params.id;
  return Response({
    message: "Get All Users",
    data: {
      id: id,
      name: "Ahmad",
    },
    status: 200,
  });
};
