import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./userSlice.jsx";
import registrationReducer from "./registrationSlice.jsx";

const Storage_Key = "ticketmaster-auth";
const registration_Key = "ticketmaster-registration";
function loadState(key, fallback){
    try{
        const savedStae = localStorage.getItem(key);
        if (savedStae){
            return JSON.parse(savedStae);
        }
        return fallback;
    }
    catch(error){
        console.error("Could not load saved state: ", error);
        return fallback;
    }
}

const store = configureStore({
    reducer: {
    user: userReducer,
    registrations: registrationReducer
},
    preloadedState: {
        user: loadState(Storage_Key, {users: [], currentUser: null}),
        registrations: loadState(registration_Key, [])
    }
});

store.subscribe(() => {
    try {
        localStorage.setItem(
            Storage_Key,
            JSON.stringify(store.getState().user)
        );
        localStorage.setItem(
            registration_Key,
            JSON.stringify(store.getState().registrations)
        );
    }
    catch(error){
        alert("Could not save state: ", error);
    }
});

export default store;