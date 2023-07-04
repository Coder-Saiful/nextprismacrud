import { useState } from 'react';
import dateFormat from "dateformat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark
} from "@fortawesome/free-solid-svg-icons";

const SingleCategory = ({category}) => {
  const [isOepn, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    document.body.classList.add('hide-scrollbar');
  }

  const closeModal = () => {
    setIsOpen(false);
    document.body.classList.remove('hide-scrollbar');
  }

  return (
    <>
      <button type="button" className='btn btn-sm btn-outline-success' onClick={openModal}>View</button>

      <div className={`${isOepn ? 'dark-overlay' : ''}`}></div>
      <div className={`modal fade ${isOepn ? 'show' : ''}`} style={{display: `${isOepn ? "block" : "none"}`}}>
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 font-medium">Category Details</h1>
              <FontAwesomeIcon
                  icon={faXmark}
                  className='text-[25px] text-gray-700 cursor-pointer'
                  onClick={closeModal}
                />
            </div>
            <div className="modal-body">
              <p><span className='font-semibold'>Category Name: </span>{category.name}</p>
              <p><span className='font-semibold'>Category Id: </span>{category.id}</p>
              <p><span className='font-semibold'>Created Time: </span>{dateFormat(category.createdAt, 'dd mmmm yyyy h:MM:ss TT')}</p>
            </div>
            <div className="modal-footer border-t-0">
              <button type="button" className="btn btn-outline-dark" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleCategory;