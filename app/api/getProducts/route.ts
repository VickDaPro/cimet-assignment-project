// pages/api/getProducts/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

export async function POST(request: Request) {
  // Checking if the token exists in cookies
  const token = cookies().get("token")?.value;

  try {
    let data = JSON.stringify({
      post_code: "2000,Barangaroo,NSW",
      visit_id: process.env.VISIT_ID,
      property_type: 1,
      life_support: 0,
      movin_type: 0,
      life_support_value: "",
      solar_panel: 1,
      energy_type: 3,
      electricity_bill: 0,
      gas_bill: 0,
    });

    const apiKey = process.env.API_KEY?.replace("\r", "");

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://27tbkfjjri.execute-api.ap-southeast-2.amazonaws.com/staging/energy/plan/list",
      headers: {
        "Api-Key": apiKey,
        "Auth-Token": token,
        CountryId: "1",
        ServiceId: "1",
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);

    if (response.data.message === "Token has expired") {
      throw new Error("Token has expired. Please generate a new token.");
    }

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.log("ERROR IN PRODUCTS ROUTE", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
