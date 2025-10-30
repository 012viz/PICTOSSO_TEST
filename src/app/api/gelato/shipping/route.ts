import { TGetShippingMethodInput } from "@/types";
import { getGelatoShippingMethods } from "@/utils/gelatoHelpers";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    try {

        const input: TGetShippingMethodInput = await req.json();

        let shippingMethods = await getGelatoShippingMethods(input)


        if (!shippingMethods || shippingMethods.quotes.length <= 0) return NextResponse.json(null, { status: 404 });

        let methods = shippingMethods.quotes[0].shipmentMethods;

        // limit methods for US
        if (input.country.toLocaleLowerCase() == "us") {
            let usMethods = methods.filter(m =>
                m.name.toLocaleLowerCase().trim().startsWith("usps") ||
                m.name.toLocaleLowerCase().trim().startsWith("fedex")
            )
            if (usMethods.length >= 1) 
                methods = usMethods;
        }

        return NextResponse.json(methods, { status: 200 });

    } catch (error) {
        // @ts-ignore
        console.error('Error getting shipping methods', error.response.data);
        // throw error;
    }
}