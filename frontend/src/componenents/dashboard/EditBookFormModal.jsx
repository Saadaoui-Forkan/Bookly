import React, { useEffect, useState } from "react";
import "./dashboard-modal.css";
import { Oval } from "react-loader-spinner";
import moment from "moment";
import { IoIosCloseCircle } from "react-icons/io";

const categories = [
  "Historical Fiction",
  "Mystery",
  "Fantasy",
  "Romance",
  "Human Development",
  "Social",
  "Drame",
  "History",
];

const InputField = ({ type, placeholder, ...props }) => (
  <input
    type={type}
    className="edit-book-modal-input"
    placeholder={placeholder}
    {...props}
  />
);

function EditBookModal({ book, loading, setEditForm }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [PublicationDate, setPublicationDate] = useState("");
  const [language, setLanguage] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault()
    console.log("form")
  }

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setDescription(book.description);
      setCategory(book.category);
      setAuthor(book.author);
      setPublicationDate(moment(book.PublicationDate).format("YYYY-MM-DD"));
      setLanguage(book.language);
    }
  }, [book]);

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
    <div className="edit-book-modal">
      <div className="edit-book-modal-content"><button
          type="button"
          className="close-btn"
          onClick={() => setEditForm(false)}
        >
          <IoIosCloseCircle />
        </button>
        <div className="edit-book-modal-form">
          <InputField
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            className="edit-book-modal-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option disabled value="">
              Select A Category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <InputField
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <InputField
            type="text"
            placeholder="Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
          <InputField
            type="date"
            placeholder="Published at"
            value={PublicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
          />
          <textarea
            className="edit-book-modal-textarea"
            rows="5"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button type="submit" className="edit-book-modal-form-btn" onSubmit={formSubmitHandler}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditBookModal;
