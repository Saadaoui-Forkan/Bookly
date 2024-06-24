import moment from "moment";
import React from "react";
import Rating from "../rating/Rating";
import { Oval } from "react-loader-spinner";
import { useSelector } from "react-redux";

function Reviews() {
  const { loading, reviews } = useSelector((state) => state.book);

  return (
    <div className="get-reviews">
      <h2 className="get-reviews-title">Reviews ({reviews?.length})</h2>
      <div className="reviews">
        {loading ? (
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
        ) : (
          Array.isArray(reviews) && reviews.map((el, key) => (
            <div className="user-review" key={key}>
              <p>
                <span>{el?.username ? el?.username : "Unknown User"}</span>{" "}
                {`-  `}
                {moment(el?.createdAt).format("DD MMM YYYY")}
              </p>
              <Rating rating={el?.rate} />
              <p>{el?.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Reviews;
