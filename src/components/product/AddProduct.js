import { useRef, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { Form } from 'react-bootstrap';
import { APP_URL } from '../../../utils/config';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const AddProduct = ({categories = {}}) => {
  const [isOepn, setIsOpen] = useState(false);
  const submitBtnRef = useRef(false);
  const [values, setValues] = useState({
    name: '',
    description: '',
    category: ''
  });
  const {name, description, category} = values;
  const router = useRouter();

  const openModal = () => {
    setIsOpen(true);
    document.body.classList.add('hide-scrollbar');
  }

  const closeModal = () => {
    setIsOpen(false);
    document.body.classList.remove('hide-scrollbar');
  }

  const handleChange = e =>  {
    setValues((prevalue) => {
        return {
            ...prevalue,
            [e.target.name]: e.target.value
        }
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    submitBtnRef.current.innerHTML = 'Submitting...';
    submitBtnRef.current.disabled = true;

    const res = await fetch(`${APP_URL}/api/product`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });

        const data = await res.json();

        if (data) {
            submitBtnRef.current.disabled = false;
            submitBtnRef.current.innerHTML = 'Submit';
            if (data.successMsg) {
                router.refresh();
                toast.success(data.successMsg);
                setValues({
                  name: '',
                  description: '',
                  category: ''
                });
                closeModal();
            } else if (data.errorMsg) {
                toast.error(data.errorMsg);
            } else if (data.reqField) {
              toast.error(data.reqField);
            }
        } else {
          submitBtnRef.current.disabled = false;
          submitBtnRef.current.innerHTML = 'Submit';
          toast.error('Something went wrong.');
        }
  }

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <button type="button" className='ring ring-1 ring-green-400 text-green-400 rounded-[3px] px-3 py-[4px] mt-2 hover:bg-green-400 hover:text-white transition duration-200 w-full' onClick={openModal}>Create</button>

      <div className={`${isOepn ? 'dark-overlay' : ''}`}></div>
      <div className={`modal fade ${isOepn ? 'show' : ''}`} style={{display: `${isOepn ? "block" : "none"}`}}>
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 font-medium">Create New Product</h1>
              <FontAwesomeIcon
                  icon={faXmark}
                  className='text-[25px] text-gray-700 cursor-pointer'
                  onClick={closeModal}
                />
            </div>
            <div className="modal-body">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-2'>
                        <Form.Label>Product Name:</Form.Label>
                        <Form.Control autoComplete='off' type="text" placeholder="Enter category name..." className='focus:border-green-400' name='name' value={name} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className='mb-2'>
                        <Form.Label>Product Description:</Form.Label>
                        <Form.Control autoComplete='off' type="text" placeholder="Enter product description..." className='focus:border-green-400' name='description' value={description} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className='mb-2'>
                        <Form.Label>Product Category:</Form.Label>
                        <Form.Select name='category' value={category} onChange={handleChange}  className='focus:border-green-400'>
                            <option>Choose an option</option>
                            {categories && categories.length > 0 && categories.map(c =>  {
                                return (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='text-right mt-3'>
                        <button type="button" className="btn btn-outline-dark mr-3" onClick={closeModal}>Close</button>
                        <button type="submit" className="btn btn-outline-primary" ref={submitBtnRef}>Submit</button>
                    </Form.Group>
                </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;