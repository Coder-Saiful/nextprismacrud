'use client'
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { APP_URL } from '../../../utils/config';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [catErr, setCatErr] = useState(false);
    const submitBtnRef = useRef(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        submitBtnRef.current.disabled = true;
        submitBtnRef.current.innerHTML = 'Processing...';

        const res = await fetch(`${APP_URL}/api/category`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name})
        });

        const data = await res.json();

        if (data) {
            if (data.successMsg) {
                router.refresh();
                setName('');
                submitBtnRef.current.disabled = false;
                submitBtnRef.current.innerHTML = 'Submit';
                toast.success(data.successMsg);
                setCatErr(false);
            } else if (data.errorMsg) {
                submitBtnRef.current.disabled = false;
                submitBtnRef.current.innerHTML = 'Submit';
                toast.error(data.errorMsg);
                setCatErr(false);
            } else if (data.reqField) {
                submitBtnRef.current.disabled = false;
                submitBtnRef.current.innerHTML = 'Submit';
                setCatErr(data.reqField);
            } else {

            }
        }
    }

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <Form className='px-3 py-2  border rounded-md overflow-hidden mb-5' onSubmit={handleSubmit}>
                <Form.Group className="mb-2">
                    <Form.Label>Category Name:</Form.Label>
                    <Form.Control type="text" placeholder="Enter category name..." className='focus:border-green-400' value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                {catErr && <p className='text-[14px] text-red-400'>Category field is required.</p>}
                <button type="submit" className='ring ring-1 ring-green-400 text-green-400 rounded-[3px] px-3 py-[4px] mt-2 hover:bg-green-400 hover:text-white transition duration-200' ref={submitBtnRef}>Submit</button>
            </Form>
        </>
)};

export default AddCategory;