import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(request) {
    try {
        const {name, description, category} = await request.json();
        if (!name || !description || !category) {
            return NextResponse.json({reqField: 'All fields are required.'}, {status: 500});
        }
        const product = await prisma.product.create({
            data: {
                name,
                description,
                category: {
                    connect: {
                        id: category
                    }
                }
            },
            include: {
                category: true
            }
        });
        return NextResponse.json({successMsg: 'Product added successfully.', data: product}, {status: 201});
    } catch (error) {
        return NextResponse.json({errorMsg: 'Product added failed.'}, {status: 500});
    }
}

export async function GET(req) {
    const url = new URL(req.url);
    const search = url.searchParams.get('search');
    try {
        if (search) {
            const products = await prisma.product.findMany({
                where: {
                    name: {
                        contains: search
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    category: true
                }
            });
            if (products.length > 0) {
                return NextResponse.json({products}, {status: 200});
            } else {
                return NextResponse.json({message: "No product available."}, {status: 200});
            }
        } else {
            const products = await prisma.product.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    category: true
                }
            });
            if (products.length > 0) {
                return NextResponse.json({products}, {status: 200});
            } else {
                return NextResponse.json({total: products.length, message: "No product available."}, {status: 200});
            }
        }
    } catch (error) {
        return NextResponse.json({errorMsg: 'Failed to load products.'}, {status: 500});
    }
}