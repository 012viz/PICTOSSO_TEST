import { GelatoOrderData, OrderItemTrackingCodeUpdated } from "@/types";
import { getGelatoOrder } from "@/utils/gelatoHelpers";
import { sendMailTrackingCode } from "@/utils/mailjet";
import { NextResponse } from "next/server";


const handleOrderTrackingCodeUpdateEvent = async (orderId: string, trackingUrl: string, trackingCode: string) => {
    const order = await getGelatoOrder(orderId)

    await sendMailTrackingCode(order, trackingUrl, trackingCode)
    return NextResponse.json(order, { status: 200 });
    // event.fulfillmentStatus
}

export default handleOrderTrackingCodeUpdateEvent;