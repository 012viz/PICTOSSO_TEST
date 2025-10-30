import { TGetShippingMethodInput, TProduct } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import availableProducts from "./availableProducts";


export async function GET(req: NextRequest) {
    try {


        return NextResponse.json(availableProducts, { status: 200 });

    } catch (error) {
        // @ts-ignore
        console.error('Error getting shipping methods', error.response.data);
        // throw error;
    }
}