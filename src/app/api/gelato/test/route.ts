import { GelatoOrderData } from '@/types';
import { getGelatoOrder } from '@/utils/gelatoHelpers';
import { NextResponse } from 'next/server';


const getMetadataByKey = (order: GelatoOrderData, key: string): string | undefined => {
    const item = order.metadata?.find(item => item.key === key);
    return item ? item.value : undefined;
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
        return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    try {
        const order = await getGelatoOrder(orderId);
        const email = getMetadataByKey(order, "userEmail")
        return NextResponse.json({email, order});
    } catch (error) {
        console.error('Error fetching Gelato order:', error);
        return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
    }
}
