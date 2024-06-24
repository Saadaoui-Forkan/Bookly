import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
    name: "book",
    initialState: {
        books: [],
        reviews: [],
        error: false,
        loading: false,
    },
    reducers: {
        getBooks(state, action) {
            state.books = action.payload;
        },
        findBook(state, action) {
            state.books = action.payload;
        },
        addReviews(state, action) {
            state.books.push(action.payload)
        },
        getReviews(state, action) {
            state.reviews = action.payload;
        },
        setLoading(state) {
            state.loading = true;
        },
        clearLoading(state) {
            state.loading = false;
        },
        setError(state) {
            state.error = true;
        },
        clearError(state) {
            state.error = false;
        },
        setBooks(state, action) {
            state.books = [...state.books, action.payload]
        },
        deleteBook(state, action) {
            state.books = state.books.filter(el => el._id !== action.payload)
        },
        updateBook(state, action) {
            state.books.data = state.books.data.map((book) => 
                book.id === action.payload.id ? action.payload : book
            );
        }
    }
})

const bookReducer = bookSlice.reducer;
const bookActions = bookSlice.actions;

export {bookActions, bookReducer}