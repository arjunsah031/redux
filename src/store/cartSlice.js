const { createSlice } = require('@reduxjs/toolkit');

// Function to save cart to localStorage
const saveCartToLocalStorage = (cart) => {
    try {
        const serializedCart = JSON.stringify(cart);
        localStorage.setItem('addedProductInCart', serializedCart);
    } catch (error) {
        console.error('Could not save cart to localStorage:', error);
    }
};

// Initial state loaded from localStorage
const initialState = {
    addedProductInCart: localStorage.hasOwnProperty('addedProductInCart')
        ? JSON.parse(localStorage.getItem('addedProductInCart'))
        : [],
    loading: false, // Add a loading state
};

// Cart Slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addStart(state) {
            state.loading = true; // Set loading to true when adding starts
        },
        addSuccess(state, action) {
            const existingItemIndex = state.addedProductInCart.findIndex(
                (item) => item.id === action.payload.id
            );
            if (existingItemIndex === -1) {
                state.addedProductInCart.push(action.payload);
                saveCartToLocalStorage(state.addedProductInCart);
            }
            state.loading = false; // Set loading to false after adding success
        },
        addFailure(state) {
            state.loading = false; // Handle failure and stop loading
        },
        remove(state, action) {
            state.addedProductInCart = state.addedProductInCart.filter(
                (item) => item.id !== action.payload
            );
            saveCartToLocalStorage(state.addedProductInCart);
        },
    },
});

export const { addStart, addSuccess, addFailure, remove } = cartSlice.actions;
export default cartSlice.reducer;
