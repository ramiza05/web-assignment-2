import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        name: "",
        email: "",
        password: "",
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        resetPassword: (state) => {
            state.password = "";
        }
    }
});

export const { setName, setEmail, setPassword, resetPassword } = userSlice.actions;
export default userSlice.reducer;