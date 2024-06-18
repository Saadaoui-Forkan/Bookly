import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../redux/apiCalls/bookApiCall";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Rating from "../../componenents/rating/Rating";
import DashboardModal from "../../componenents/dashboard/AddBookModal";
import EditBookFormModal from "../../componenents/dashboard/EditBookFormModal";
import EditBookImageModal from "../../componenents/dashboard/EditBookImageModal";

function BooksDashboard() {
  const dispatch = useDispatch();
  const { books, loading } = useSelector((state) => state.book);

  const [openModal, setOpenModal] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [editImage, setEditImage] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    dispatch(fetchBooks(currentPage));
  }, [dispatch, currentPage]);

  if (loading) {
    return (
      <Oval
        height={120}
        width={120}
        color="rgb(247, 96, 14)"
        wrapperStyle={{
          height: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#E2E2E2"
        strokeWidth={3}
        strokeWidthSecondary={3}
      />
    );
  }

  return (
    <div className="books-dashboard">
      <button
        type="button"
        className="books-dashboard-btn"
        onClick={() => setOpenModal(true)}
      >
        Add New Book
      </button>
      {openModal && <DashboardModal setOpenModal={setOpenModal} />}
      <div className="books-dashboard-container">
        {books?.data?.map((book, key) => (
          <div className="book-dashboard-item" key={key}>
            <img
              src={book?.image?.url}
              alt={book?.image?.publicId}
              className="book-dashboard-item-img"
            />
            <span
              className="book-dashboard-item-img-edit"
              onClick={() => setEditImage(true)}
            >
              Upload New Image
            </span>
            {editImage && (
              <EditBookImageModal
                book={book}
                loading={loading}
                setEditImage={setEditImage}
              />
            )}
            <h3 className="book-dashboard-item-title">{book?.title}</h3>
            <p className="book-dashboard-item-category">{book?.category}</p>
            <Rating rating={book?.rate} />
            <div className="book-dashboard-icons-wrapper">
              <FaEdit onClick={() => setEditForm(true)} />
              {editForm && (
                <EditBookFormModal
                  book={book}
                  loading={loading}
                  setEditForm={setEditForm}
                />
              )}
              <MdDelete />
            </div>
          </div>
        ))}
      </div>
      <ReactPaginate
        breakLabel=".."
        nextLabel="next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={Number.isFinite(books?.pages) ? Math.ceil(books.pages) : 0}
        previousLabel="previous"
        renderOnZeroPageCount={null}
        containerClassName={"pagination"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default BooksDashboard;
