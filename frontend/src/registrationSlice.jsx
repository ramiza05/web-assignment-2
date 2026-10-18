import { createSlice } from "@reduxjs/toolkit";

const registrationSlice = createSlice({
    name: "registrations",
    initialState: [],
    reducers: {
        registerEvent: (state, action) => {
            const { userId, eventId } = action.payload;

            const alreadyRegistered = state.some((registration) => registration.userId === userId && registration.eventId === eventId);
            if(!alreadyRegistered){
                state.push(action.payload);
            }
        },
        cancelRegistration: (state, action) =>{
            return state.filter((registration) => !(registration.userId === action.payload.userId && registration.eventId === action.payload.eventId));
        }
    }
});

export const {registerEvent, cancelRegistration} = registrationSlice.actions;
export default registrationSlice.reducer;