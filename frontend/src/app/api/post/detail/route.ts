// import { NextRequest } from "next/server";
// import { withApiHandler } from "@/utils/withApiHandler";
// import { error, success } from "@/utils/apiResponse";
// import { BUSINESS_STATUS_CODE, DB_NAME } from "@/config/constants";
// import clientPromise from "@/lib/mongodb";
// import { v4 as uuidv4 } from "uuid";

// export const GET = withApiHandler(async (request: NextRequest) => {
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get("id");
//   if (!id) {
//     return Response.json(error("Id is required"), {
//       status: 400,
//     });
//   }
//   const client = await clientPromise;
//   const db = client.db(DB_NAME);
//   const collection = db.collection("posts");
//   const post = await collection.findOne({ id }); // 尋找到這一筆

//   return Response.json(success(post), { status: 200 });
// });
export {}; // 這樣 TypeScript 就會把這個檔案當 module
