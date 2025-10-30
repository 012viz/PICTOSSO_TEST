import { NextRequest, NextResponse } from 'next/server'
import { TGetPrice } from '@/types';
import { getPrice } from '@/utils';




export const POST = async (req: NextRequest) => {
    try {
        const input: TGetPrice = await req.json();
        const price = await getPrice(input);
        return NextResponse.json(price);

    } catch (error) {
        return NextResponse.json({ error })

    }
}