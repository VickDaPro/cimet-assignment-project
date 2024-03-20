import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
import jwt from "jsonwebtoken";

// Import necessary modules for timezone conversion
import { zonedTimeToUtc } from "date-fns-tz";

export async function POST(request: Request) {
  const existingToken = cookies().get("token")?.value;

  // Decode the token
  let tokenExpired = false;
  if (existingToken) {
    const decoded: any = jwt.decode(existingToken);
    if (decoded && decoded.exp < Math.floor(Date.now() / 1000)) {
      tokenExpired = true;
      cookies().delete("token");
    }
  }

  // If token is still valid, no need to refresh
  if (existingToken && !tokenExpired) {
    return NextResponse.json({ message: "Token is still valid." });
  }

  // If API_KEY exists or not
  if (!process.env.API_KEY) {
    throw new Error("API_KEY is not defined");
  }

  // Generating a new token
  let data;
  try {
    const res = await axios.post(
      "https://27tbkfjjri.execute-api.ap-southeast-2.amazonaws.com/staging/generate-token",
      {},
      {
        headers: {
          "Api-Key": process.env.API_KEY,
        },
      }
    );
    data = res.data;
  } catch (error) {
    console.error("Error generating token:", error);
    return NextResponse.json(
      { message: "Failed to generate token" },
      { status: 500 }
    );
  }

  // storing response data inside token and expiryTime vairables
  const { token, token_expire_time: tokenExpiryTime } = data.data;

  // converting the current time to Sydney australia
  const sydneyTimeZone = "Australia/Sydney";
  const expiryDateUtc = zonedTimeToUtc(tokenExpiryTime, sydneyTimeZone);
  // console.log(expiryDateUtc);
  const nowUtc = new Date();
  const maxAge = expiryDateUtc.getTime() - nowUtc.getTime();

  // Storing the token in a cookie
  const response = NextResponse.json({ message: "Token stored in cookie" });
  cookies().set("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: maxAge / 1000,
    path: "/",
  });

  return response;
}
