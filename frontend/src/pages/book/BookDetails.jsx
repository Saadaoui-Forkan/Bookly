import React, { useEffect, useState } from "react";
import "./book.css";
import Rating from "../../componenents/rating/Rating";
import { useParams } from "react-router-dom";
import {
  fetchSingleBook,
  getBookReviews,
} from "../../redux/apiCalls/bookApiCall";
import { useDispatch, useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import moment from "moment";
import Modal from "../../componenents/book-details/Modal";
import Reviews from "../../componenents/book-details/Reviews";

function BookDetails() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { book } = useParams();
  const { books, loading } = useSelector((state) => state.book);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSingleBook(book));
  }, [dispatch, book]);

  
  useEffect(() => {
    if (book) {
      dispatch(getBookReviews(book));
    }
  }, [dispatch, book]);

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
    <div className="book-details">
      <div className="book-details-top">
        <div className="book-details-top-img">
          <img src={books?.image?.url} alt={books?.image?.publicId} />
        </div>
        <div className="book-details-top-info">
          <h1>{books?.title}</h1>
          <Rating rating={books?.rate} />
          <h3>{books?.category}</h3>
          <h3>{books?.author}</h3>
          <h3>{books?.language}</h3>
          <p>
            <span>{`Published at: `}</span>{" "}
            {moment(books?.PublicationDate).format("DD MMM YYYY")}
          </p>
          <p className="description">
            <span>{`Description: `}</span>
            {books?.description}
          </p>
        </div>
      </div>

      <div className="btns">
        <div className="favorite-btn">
          <button type="button">Add To Favorites</button>
        </div>
        <div className="review-btn">
          <button type="button" onClick={handleOpenModal}>
            Add Review
          </button>
        </div>
      </div>

      <div className="book-details-reviews">
        <Reviews book={book}/>
      </div>
      <Modal
        showModal={showModal}
        handleClose={handleCloseModal}
        book={book}
        // handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default BookDetails;
