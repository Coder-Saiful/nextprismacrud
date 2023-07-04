import AddCategory from "@/components/category/AddCategory";
import ShowCategory from "@/components/category/ShowCategory";

export const metadata = {
  title: 'Category Page'
}

const Category = () => (
  <section className="grid grid-cols-7 container mx-auto gap-x-4 mt-3">
    <div className="col-span-7 lg:col-span-2">
      <h2 className="text-center text-[20px] font-medium bg-green-400 py-2 rounded-t-md">Add New Category</h2>
      <AddCategory />
    </div>
    <div className="col-span-7 lg:col-span-5 overflow-auto">
      <ShowCategory />
    </div>
  </section>
);

export default Category;