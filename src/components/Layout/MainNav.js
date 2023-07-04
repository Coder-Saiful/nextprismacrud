'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {Navbar, Nav} from 'react-bootstrap';
import { APP_URL } from '../../../utils/config';

const getCategories = async () => {
  const res = await fetch(`${APP_URL}/api/category`, {cache: 'no-store'});
  return res.json();
}
const getProducts = async () => {
  const res = await fetch(`${APP_URL}/api/product`, {cache: 'no-store'});
  return res.json();
}

const MainNav = async () => {
  const pathname = usePathname();
  const [categoryData, productData] = await Promise.all([
        getCategories(),
        getProducts()
    ]);
  
  return (
    <Navbar expand="sm" className="bg-gray-700 py-0">
      <div className='container mx-auto'>
        <div className='logo'><Link href='/' className='text-white font-medium no-underline text-[24px]'>CRUD</Link></div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link href='/' className={`main-nav-link ${pathname === '/' ? 'main-link-active': ''}`}>Home</Link>
            <Link href='/category' className={`main-nav-link relative ${pathname === '/category' ? 'main-link-active': ''}`}>Category{categoryData.categories && categoryData.categories.length > 0 && (
            <span className='absolute text-black text-[11px] bg-white rounded-full w-[17px] h-[17px] text-center top-[2px] right-[10px]'>{categoryData.categories.length}</span>
          )}</Link>
          {/* <Link href='/category' className={`main-nav-link relative ${pathname === '/category' ? 'main-link-active': ''}`}>Category</Link> */}
            <Link href='/product' className={`main-nav-link ${pathname === '/product' ? 'main-link-active': ''}`}>Product{productData.products && productData.products.length > 0 && (
            <span className='absolute text-black text-[11px] bg-white rounded-full w-[17px] h-[17px] text-center top-[2px] right-[10px]'>{productData.products.length}</span>
          )}</Link>
          {/* <Link href='/product' className={`main-nav-link ${pathname === '/product' ? 'main-link-active': ''}`}>Product</Link> */}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
)};

export default MainNav;