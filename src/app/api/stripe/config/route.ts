import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    try {
        return NextResponse.json({
            publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
        })

    } catch (error) {
        return NextResponse.json({ error })

    }
}