import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../redux/apiCalls/bookApiCall";
import { Oval } from "react-loader-spinner";
import Rating from "../rating/Rating";

function Books({ currentPage }) {
  const dispatch = useDispatch();

  const { books, loading } = useSelector((state) => state.book);
  console.log(books)

  useEffect(() => {
    dispatch(fetchBooks(currentPage));
  }, [dispatch, currentPage]);

  return (
    <div className="books">
      <h1 className="books-title">Explore Books</h1>
      <div className="books-container">
        {loading ? (
          <Oval
            height={120}
            width={120}
            color="rgb(247, 96, 14)"
            wrapperStyle={{
              height: "70vh",
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
        ) : (
          books.data?.map((book, index) => (
            <div className="books-card" key={index}>
              <img src={book?.image.url} className="books-card-img" alt="" />
              <div className="over">
                <h2 className="over-title">{book?.title}</h2>
                <h3 className="over-auth">{book?.author}</h3>
                <Rating rating={book?.rate}/>
                <button className="over-btn">SHOW BOOK</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Books;
