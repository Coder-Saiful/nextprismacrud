import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function PUT(req, {params}) {
    try {
        const {name} = await req.json();
        const id = params.id;

        if (!name) return NextResponse.json({reqField: 'Category field is required.'}, {status: 500});
        const category = await prisma.category.update({
            where: {
                id: id
            },
            data: {
                name: name
            }
        });
        return NextResponse.json({successMsg: 'Category updated successfully'}, {status: 200});
    } catch (error) {
        return NextResponse.json({errorMsg: 'Category updated failed.'}, {status: 500});
    }
}

export async function POST(req, {params}) {
    const id = params.id;
    try {
        const deleteProducts = prisma.product.deleteMany({
            where: {
                categoryId: id
            }
        });
        const deleteCategory = prisma.category.delete({
            where: {
                id: id
            }
        });
        // console.log(deleteProducts)
        const transaction = await prisma.$transaction([deleteProducts, deleteCategory]);
        return NextResponse.json({successMsg: 'Category deleted successfully'}, {status: 200});
    } catch (error) {
        return NextResponse.json({errorMsg: 'Category deleted failed.'}, {status: 500});
    }
}