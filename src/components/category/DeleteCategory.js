import { useRef, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { APP_URL } from '../../../utils/config';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const DeleteCategory = ({id}) => {
  const [isOepn, setIsOpen] = useState(false);
  const router = useRouter();

  const openModal = () => {
    setIsOpen(true);
    document.body.classList.add('hide-scrollbar');
  }

  const closeModal = () => {
    setIsOpen(false);
    document.body.classList.remove('hide-scrollbar');
  }

  const handleDelete = async (e) => {
    e.target.innerHTML = 'Deleting...';
    e.target.disabled = true;

    const res = await fetch(`${APP_URL}/api/category/${id}`, {
            method: 'POST'
    });

      const data = await res.json();

        if (data) {
            e.target.disabled = false;
            e.target.innerHTML = 'Delete';
            if (data.successMsg) {
                router.refresh();
                toast.success(data.successMsg);
                closeModal();
            } else if (data.errorMsg) {
                toast.error(data.errorMsg);
                closeModal();
            }
        } else {
          e.target.disabled = false;
          e.target.innerHTML = 'Delete';
          toast.error('Something went wrong.');
        }
  }

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <button type="button" className='btn btn-sm btn-outline-danger !rounded-r-[4px]' onClick={openModal}>Delete</button>

      <div className={`${isOepn ? 'dark-overlay' : ''}`}></div>
      <div className={`modal fade ${isOepn ? 'show' : ''}`} style={{display: `${isOepn ? "block" : "none"}`}}>
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header border-b-0">
              <h1 className="modal-title fs-5 font-medium">Are you sure delete this category?</h1>
              <FontAwesomeIcon
                  icon={faXmark}
                  className='text-[25px] text-gray-700 cursor-pointer'
                  onClick={closeModal}
                />
            </div>
            <div className="modal-body text-right">
                <button type="button" className="btn btn-outline-dark mr-3" onClick={closeModal}>Cancel</button>
                <button type="button" className="btn btn-outline-danger" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteCategory;