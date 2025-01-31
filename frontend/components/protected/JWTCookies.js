//"use server";
//
//import { cookies } from "next/headers";
//import jwt_decode from "jwt-decode";
//import { TOKEN_NAME } from "...";
//
//interface StoreToeknRequest {
//    token: string
//    refresh_token: string
//}
//
//export async function storeToken(request: StoreTokenRequest) {
//    cookies().ser({
//        name: "accessToken",
//        value: request.token,
//        httpOnly: true,
//        sameSite: "strict",
//        secure: true,
//    })
//    cookies().set({
//        name: "refreshToken",
//        value: request.refresh_token,
//        httpOnly: true,
//        sameSite: "strict",
//        secure: true,
//    })
//}
//
////export async function POST(request: NextRequest) {
////    const loginRes = await axios.post("http://localhost")
////}
//
