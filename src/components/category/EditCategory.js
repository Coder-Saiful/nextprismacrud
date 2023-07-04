import { useRef, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { Form } from 'react-bootstrap';
import { APP_URL } from '../../../utils/config';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const EditCategory = ({category}) => {
  const [isOepn, setIsOpen] = useState(false);
  const [name, setName] = useState(category.name);
  const [catErr, setCatErr] = useState(false);
  const updateBtnRef = useRef(false);
  const router = useRouter();

  const openModal = () => {
    setIsOpen(true);
    document.body.classList.add('hide-scrollbar');
  }

  const closeModal = () => {
    setIsOpen(false);
    document.body.classList.remove('hide-scrollbar');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateBtnRef.current.innerHTML = 'Updating...';
    updateBtnRef.current.disabled = true;

    const res = await fetch(`${APP_URL}/api/category/${category.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name})
        });

        const data = await res.json();

        if (data) {
            updateBtnRef.current.disabled = false;
            updateBtnRef.current.innerHTML = 'Update';
            if (data.successMsg) {
                router.refresh();
                toast.success(data.successMsg);
                setCatErr(false);
                closeModal();
            } else if (data.errorMsg) {
                toast.error(data.errorMsg);
                setCatErr(false);
            } else if (data.reqField) {
                setCatErr(data.reqField);
            }
        } else {
          updateBtnRef.current.disabled = false;
          updateBtnRef.current.innerHTML = 'Update';
          toast.error('Something went wrong.');
          setCatErr(false);
        }
  }

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <button type="button" className='btn btn-sm btn-outline-primary' onClick={openModal}>Edit</button>

      <div className={`${isOepn ? 'dark-overlay' : ''}`}></div>
      <div className={`modal fade ${isOepn ? 'show' : ''}`} style={{display: `${isOepn ? "block" : "none"}`}}>
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 font-medium">Edit Category</h1>
              <FontAwesomeIcon
                  icon={faXmark}
                  className='text-[25px] text-gray-700 cursor-pointer'
                  onClick={closeModal}
                />
            </div>
            <div className="modal-body">
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Category Name:</Form.Label>
                        <Form.Control type="text" placeholder="Enter category name..." className='focus:border-green-400' value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    {catErr && <p className='text-[14px] text-red-400'>Category field is required.</p>}
                    <Form.Group className='text-right mt-3'>
                    <button type="button" className="btn btn-outline-dark mr-3" onClick={closeModal}>Cancel</button>
                    <button type="submit" className="btn btn-outline-primary" ref={updateBtnRef}>Update</button>
                    </Form.Group>
                </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCategory;