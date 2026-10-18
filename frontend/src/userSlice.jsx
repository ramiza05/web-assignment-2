import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        users:[],
        currentUser: null,
    },
    reducers: {
        registerUser: (state, action) => {
            state.users.push(action.payload);
            state.currentUser = action.payload;
        },
        logIn: (state, action) => {
            const user = action.payload;
            state.currentUser = {
                id: user.id,
                email: user.email,
                password: user.password
            };
        },
        logOut: (state) => {
            state.currentUser = null;
        }
    }
});

export const { registerUser, logOut, logIn } = userSlice.actions;
export default userSlice.reducer;