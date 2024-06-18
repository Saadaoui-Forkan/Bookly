import React, { useState } from "react";
import "./dashboard-modal.css";
import { Oval } from "react-loader-spinner";
import { FaPen } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

function EditBookImageModal({ book, loading, setEditImage }) {
    console.log(book)
    const [file, setFile] = useState(null);

    const updateBookImage = () => {
      console.log("first");
    };

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
        <div className="edit-book-image-modal">
            <div className="edit-book-modal-image-content">
                <button
                    type="button"
                    className="close-image-modal-btn"
                    onClick={() => setEditImage(false)}
                >
                    <IoIosCloseCircle />
                </button>
                <div className="edit-book-modal-img">
                    <img
                        src={file ? URL.createObjectURL(file) : book?.image.url}
                        alt="Book"
                    />
                    <label htmlFor="file-input" className="edit-icon">
                        <FaPen />
                    </label>
                    <input 
                        type="file" 
                        id="file-input" 
                        style={{ display: "none" }} 
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <button
                        className="edit-book-modal-btn"
                        type="button"
                        onClick={updateBookImage}
                    >
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditBookImageModal;
