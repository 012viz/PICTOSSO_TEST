import { OrderDeliveryEstimateUpdated, OrderItemStatusUpdatedEvent, OrderItemTrackingCodeUpdated, OrderStatusUpdatedEvent, WebHookEvent } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import handleOrderTrackingCodeUpdateEvent from "./handleOrderTrackingCodeUpdateEvent";
export const dynamic = "force-dynamic";


/**
 * It is triggered when order status is changed.
 * 
 * This event provides information about the new status of the order and its items, as well as its tracking codes if they are available.
 * https://dashboard.gelato.com/docs/webhooks/#order-status-updated
 */
const isOrderStatusUpdatedEvent = (event: WebHookEvent): event is OrderStatusUpdatedEvent => event.event === "order_status_updated";

/**
 * It is triggered when the status of an item has changed.
 * 
 * This is a useful event to track information about your item, including notification if the item has been printed or if an error has occured.
 * https://dashboard.gelato.com/docs/webhooks/#order-item-status-updated
 */
const isOrderItemStatusUpdatedEvent = (event: WebHookEvent): event is OrderItemStatusUpdatedEvent => event.event === "order_item_status_updated";

/**
 * It is triggered when item is shipped.
 * 
 * This event provides information about the tracking code and the shipping provider.
 * https://dashboard.gelato.com/docs/webhooks/#order-item-tracking-code-updated
 */
const isOrderItemTrackingCodeUpdated = (event: WebHookEvent): event is OrderItemTrackingCodeUpdated => event.event === "order_item_tracking_code_updated";

/**
 * In beta, To get access to this beta feature contact apisupport@gelato.com.
 */
const isOrderDeliveryEstimateUpdated = (event: WebHookEvent): event is OrderDeliveryEstimateUpdated => event.event === "order_delivery_estimate_updated";


const handleEvent = async (event: WebHookEvent) => {
    console.log("\n\n>>>>>>>>>>>>>>>>>> GELATO WEBHOOK")
    console.log(JSON.stringify(event))
    console.log("<<<<<<<<<<<<<<<<<< GELATO WEBHOOK\n\n\n\n")
    if (isOrderStatusUpdatedEvent(event)) {
        if (event.fulfillmentStatus == "shipped") {
            console.log("Handling isOrderStatusUpdatedEvent, fulfillmentStatus", event.fulfillmentStatus);
            const trackingUrl = Array.from(new Set(event.items.map(i => i.fulfillments[0].trackingUrl))).pop()
            const trackingCode = Array.from(new Set(event.items.map(i => i.fulfillments[0].trackingCode))).pop()
            console.log("SENDING TRACKING INFORMATION FOR ORDER", event.orderId, trackingUrl, trackingCode)
            if (trackingUrl && trackingCode)
                return await handleOrderTrackingCodeUpdateEvent(event.orderId, trackingUrl, trackingCode);
        }
    }
    else if (isOrderItemTrackingCodeUpdated(event)) {
        console.log("NOT IMPLEMENTED Handling isOrderItemTrackingCodeUpdated, trackingCode", event.trackingCode, event.trackingUrl);
        // return await handleOrderTrackingCodeUpdateEvent(event.orderId, event.trackingUrl, event.trackingCode);

    } else if (isOrderItemStatusUpdatedEvent(event)) {
        console.log("NOT IMPLEMENTED Handling isOrderItemStatusUpdatedEvent, event", event);
        // return await handleOrderItemStatusUpdateEvent(event);
    }
    else {
        console.error("Unknown event type", event);
    }
};

export async function POST(req: NextRequest) {
    try {
        const event: WebHookEvent = await req.json();
        await handleEvent(event)
        return NextResponse.json({}, { status: 200 });

    } catch (error) {
        // @ts-ignore
        console.error('Error getting shipping methods', error);
        throw error;
    }
}