import Response from "@/lib/api.response";

export const GET = async () => {
  return Response({
    message: "Get All Users",
    data: [
      {
        id: "1",
        name: "Ahmad",
      },
      {
        id: "2",
        name: "Zaki",
      },
    ],
    status: 200,
  });
};

export const POST = () => {
  return Response({
    message: "New User Created",
    data: [
      {
        id: 3,
        name: "yamani",
      },
    ],
  });
};
