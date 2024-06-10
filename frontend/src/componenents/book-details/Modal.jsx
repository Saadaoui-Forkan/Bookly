import React, { useState } from "react";
import "./book-details.css";
import { useDispatch } from "react-redux";
import { postReview } from "../../redux/apiCalls/bookApiCall";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Modal = ({ showModal, handleClose, book }) => {
  const [rate, setRating] = useState(0);
  const [comment, setComment] = useState("");
  console.log(rate)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitReview = (e) => {
    e.preventDefault();
    if (comment === "") {
      return toast.error("Comment is required");
    }
    dispatch(postReview(book, { rate, comment }));
    handleClose();
    navigate(`/${book}`);
  };

  return (
    <div className={`modal ${showModal ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <h2>Submit Your Review</h2>
        <form onSubmit={submitReview}>
          <div className="rating-input">
            <label>Rating:</label>
            <select
              value={rate}
              onChange={(e) => setRating(Number(e.target.value))}
              required
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="comment">
            <label>Comment:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <button className="modal-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
