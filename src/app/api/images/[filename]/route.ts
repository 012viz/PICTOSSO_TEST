import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
    const filename = req.nextUrl.pathname.split('/').pop();
    const filePath = path.join(process.cwd(), 'public', 'pictossos', filename as string);

    if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath);
        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': 'image/svg',
            },
        });
    } else {
        return new NextResponse(null, { status: 404 });
    }
}
