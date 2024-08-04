import clientPromise from '../../../lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const client = await clientPromise;
        const db = client.db("universities");
        const university = await db
            .collection("university")
            .find({})
            .toArray();
        return NextResponse.json(university);
    } catch (e) {
        console.error(e);
        return NextResponse.error();
    }
}
