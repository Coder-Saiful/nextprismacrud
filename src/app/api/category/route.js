import { NextResponse } from "next/server";
import {prisma} from '../../../../lib/prisma';

export async function GET(req) {
    const url = new URL(req.url);
    const search = url.searchParams.get('search');
    try {
        if (search) {
            const categories = await prisma.category.findMany({
                where: {
                    name: {
                        contains: search
                    }
                }
            });
            if (categories.length > 0) {
                return NextResponse.json({total: categories.length, categories}, {status: 200});
            } else {
                return NextResponse.json({message: "No category available."}, {status: 200});
            }
        } else {
            const categories = await prisma.category.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    products: true
                }
            });
            if (categories.length > 0) {
                return NextResponse.json({total: categories.length, categories}, {status: 200});
            } else {
                return NextResponse.json({total: categories.length, message: "No category available."}, {status: 200});
            }
        }
    } catch (error) {
        return NextResponse.json({errMessage: 'Failed to load categories'}, {status: 500});
    }
}

export async function POST(request) {
    try {
        const {name} = await request.json();
        if (!name) return NextResponse.json({reqField: 'Category field is required.'}, {status: 500});
        const category = await prisma.category.create({
            data: {
                name: name
            }
        }); 
        return NextResponse.json({successMsg: "Category created successfully.", data: category}, {status: 201});
    } catch (error) {
        return NextResponse.json({errorMsg: "Category created failed."}, {status: 500});
    }
}