import React, { useState } from "react";
import "./dashboard-modal.css";
import { IoIosCloseCircle } from "react-icons/io";
import { toast } from "react-toastify";
import { addBook } from "../../redux/apiCalls/bookApiCall";
import { useDispatch } from "react-redux";

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
    className="book-modal-input"
    placeholder={placeholder}
    {...props}
  />
);

function DashboardModal({ setOpenModal }) {
  const dispatch = useDispatch()

  const [fileName, setFileName] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [PublicationDate, setPublicationDate] = useState("");
  const [language, setLanguage] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Book Title is required");
    if (category.trim() === "") return toast.error("Book Category is required");
    if (description.trim() === "")
      return toast.error("Book Description is required");
    if (author.trim() === "") return toast.error("Book Author is required");
    if (language.trim() === "") return toast.error("Book Language is required");
    if (PublicationDate.trim() === "")
      return toast.error("Book Publication Date is required");
    if (!fileName) return toast.error("Book Image is required");

    const formData = new FormData();
    formData.append("image", fileName);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("author", author);
    formData.append("language", language);
    formData.append("PublicationDate", PublicationDate);

    dispatch(addBook(formData))
    setOpenModal(false)
  };

  return (
    <div className="dashboard-modal">
      <div className="dashboard-modal-content">
        <button
          type="button"
          className="close-btn"
          onClick={() => setOpenModal(false)}
        >
          <IoIosCloseCircle />
        </button>
        <h1 className="dashboard-modal-title">Add New Book</h1>
        <form className="book-modal-form" onSubmit={formSubmitHandler}>
          <label htmlFor="file" className="image-label">
            {fileName ? (
              <span className="file-name">{fileName.name}</span>
            ) : (
              "Select new image"
            )}
          </label>
          <input
            type="file"
            name="file"
            id="file"
            style={{ display: "none" }}
            onChange={(e)=>setFileName(e.target.files[0])}
          />
          <InputField
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            className="book-modal-input"
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
            className="book-modal-textarea"
            rows="5"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button type="submit" className="book-modal-btn">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default DashboardModal;
