import ShowProduct from "@/components/product/ShowProduct";

export const metadata = {
    title: 'Product Page'
  }
  
  const Product = () => (
    <section className="container mx-auto mt-4">
      <ShowProduct />
    </section>
  );
  
  export default Product;