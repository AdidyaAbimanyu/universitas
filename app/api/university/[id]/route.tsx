import clientPromise from '../../../../lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const numericId = parseInt(id);

        if (isNaN(numericId)) {
            return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("universities");
        const university = await db
            .collection("university")
            .findOne({ id: numericId });

        if (!university) {
            return NextResponse.json({ message: 'University not found' }, { status: 404 });
        }

        return NextResponse.json(university);
    } catch (e) {
        console.error(e);
        return NextResponse.error();
    }
}
