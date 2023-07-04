'use client'
import { Table, Form, InputGroup } from "react-bootstrap";
import AddProduct from "./AddProduct";
import dateFormat from "dateformat";
import { APP_URL } from "../../../utils/config";
import Link from "next/link";

const getCategories = async () => {
    const res = await fetch(`${APP_URL}/api/category`, {cache: 'no-store'});
    return res.json();
}

const getProducts = async () => {
    const res = await fetch(`${APP_URL}/api/product`, {cache: 'no-store'});
    return res.json();
}

const ShowProduct = async () => {
    const [categoryData, productData] = await Promise.all([
        getCategories(),
        getProducts()
    ]);
    return (
        <>
        <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1">
                <AddProduct categories={categoryData.categories} />
                {/* <AddProduct /> */}
            </div>
            <div className="col-span-3">
                <div className="input-group mb-3">
                    <span className="input-group-text">Search</span>
                    <input type="search" className="form-control focus:border-green-400" placeholder="Write a product name..."  />
                </div>
            </div>
        </div>
        <Table striped bordered hover className="rounded-md overflow-hidden">
            <thead>
                <tr>
                    <th className="!bg-green-400">#</th>
                    <th className="!bg-green-400">Name</th>
                    <th className="!bg-green-400">Description</th>
                    <th className="!bg-green-400">Category</th>
                    <th className="!bg-green-400">Created At</th>
                    <th className="!bg-green-400">Action</th>
                </tr>
            </thead>
            <tbody>
                {productData.products && productData.products.length > 0 && productData.products.map((product, key) => (
                    <tr key={product.id}>
                        <td>{key + 1}</td>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.category.name}</td>
                        <td>{dateFormat(product.createdAt, 'dd mmmm yyyy h:MM:ss TT')}</td>
                        <td>
                            <div className="btn-group">
                                <Link href={`/product/${product.id}`} className="btn btn-outline-success btn-sm">View</Link>
                                <button type="button" className="btn btn-outline-primary btn-sm">Edit</button>
                                <button type="button" className="btn btn-outline-danger btn-sm">Delete</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        {productData && productData.message && <h1 className="text-center text-[25px] text-slate-500 font-medium">{productData.message}</h1>}
        </>
)};

export default ShowProduct;