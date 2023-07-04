'use client'
import { Table, Form, InputGroup } from "react-bootstrap";
import dateFormat from "dateformat";
import SingleCategory from "./SingleCategory";
import { APP_URL } from "../../../utils/config";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";

const getCategories = async () => {
    const res = await fetch(`${APP_URL}/api/category`, {cache: 'no-store'});
    return res.json();
}

const ShowCategory = async () => {
    const categoryData = await getCategories();
    return (
        <>
        <div className="input-group mb-3">
            <span className="input-group-text">Search</span>
            <input type="search" className="form-control focus:border-green-400" placeholder="Write a category name..."  />
        </div>
        <Table striped bordered hover className="rounded-md overflow-hidden">
            <thead>
                <tr>
                <th className="!bg-green-400">#</th>
                <th className="!bg-green-400">Category Name</th>
                <th className="!bg-green-400">Created At</th>
                <th className="!bg-green-400">Action</th>
                </tr>
            </thead>
            <tbody>
                {categoryData.categories && categoryData.categories.length > 0 && categoryData.categories.map((category, key) => (
                    <tr key={category.id}>
                        <td>{key + 1}</td>
                        <td>{category.name} {`[${category.products.length}]`}</td>
                        <td>{dateFormat(category.createdAt, 'dd mmmm yyyy h:MM:ss TT')}</td>
                        <td>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <SingleCategory category={category} />
                            <EditCategory category={category} />
                            <DeleteCategory id={category.id} />
                        </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
                {categoryData && categoryData.message && <h1 className="text-center text-[25px] text-slate-500 font-medium">{categoryData.message}</h1>}
        </>
)};

export default ShowCategory;