import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
    name: "book",
    initialState: {
        books: [],
        pages: null,
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
        getReviews(state, action) {
            state.books = action.payload;
        },
        setPages(state, action) {
            state.pages = action.payload;
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
    }
})

const bookReducer = bookSlice.reducer;
const bookActions = bookSlice.actions;

export {bookActions, bookReducer}