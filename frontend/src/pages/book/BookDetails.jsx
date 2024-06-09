import React, { useEffect } from "react";
import "./book.css";
import Rating from "../../componenents/rating/Rating";
import { useParams } from "react-router-dom";
import {
  fetchSingleBook,
  fetchSingleBookReviews,
} from "../../redux/apiCalls/bookApiCall";
import { useDispatch, useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import moment from "moment";

function BookDetails() {
  const dispatch = useDispatch();
  const { book } = useParams();
  const { books, loading } = useSelector((state) => state.book);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSingleBook(book));
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
            <span>Published at:</span> {moment(books?.PublicationDate).format("DD MMM YYYY")}
          </p>
          <p className="description">
            <span>Description:</span>
            {books?.description}
          </p>
        </div>
      </div>

      <div className="book-details-reviews">
        <div className="add-review"></div>
        <div className="get-reviews">
          <h2>Reviews ({books?.reviews?.length})</h2>
          <div className="reviews">
            {books?.reviews?.map((el, key) => (
              <div className="user-review" key={key}>
                <p>
                  <span>{el?.username ? el?.username : "Unknown User"}</span> -
                  {moment(el?.createdAt).format('DD MMM YYYY')}
                </p>
                <Rating rating={el?.rate} />
                <p>{el?.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
