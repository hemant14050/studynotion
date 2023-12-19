import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-hot-toast";

const initialState = {
    cart: localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")) : [],
    total: localStorage.getItem("total")? JSON.parse(localStorage.getItem("total")) : 0,
    totalItems: localStorage.getItem("totalItems")? JSON.parse(localStorage.getItem("totalItems")) : 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        // add to cart
        addToCart: (state, action) => {
            const course = action.payload;
            const presentIndex = state.cart.findIndex((item) => item._id === course._id);
            if(presentIndex > 0) {
                toast.error("Course already added in cart!");
                return;
            }
            state.cart.push(course);
            state.totalItems++;
            state.total += course.price;

            // update local storage
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

            // show toast
            toast.success("Course added to cart!");
        },
        // remover from cart
        removeFromCart: (state, action) => {
            const courseId = action.payload;
            console.log("here", courseId);
            const presentIndex = state.cart.findIndex((item) => item._id === courseId);
            console.log("here", presentIndex);
            if(presentIndex >= 0) {
                state.totalItems--;
                state.total -= state.cart[presentIndex].price;
                state.cart.splice(presentIndex, 1);

                // update local storage
                localStorage.setItem("cart", JSON.stringify(state.cart));
                localStorage.setItem("total", JSON.stringify(state.total));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

                // show toast
                toast.success("Course removed from cart!")
            }
        },
        // reset cart
        resetCart: (state, action) => {
            state.totalItems = 0;
            state.total = 0;
            state.cart = [];

            // update local storage
            localStorage.removeItem("cart");
            localStorage.removeItem("total");
            localStorage.removeItem("totalItems");

            // show toast
            toast.success("Cart reset successfully!");
        },
    }
});

export const {addToCart, removeFromCart, resetCart} = cartSlice.actions;
export default cartSlice.reducer;