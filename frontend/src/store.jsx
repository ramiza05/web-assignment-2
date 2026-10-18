import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./userSlice.jsx";

const Storage_Key = "ticketmaster-auth";
function loadState(){
    try{
        const savedStae = localStorage.getItem(Storage_Key);
        if (savedStae){
            return JSON.parse(savedStae);
        }
    }
    catch(error){
        alert("Could not load saved state: ", error);
    }
}

const store = configureStore({
    reducer: {
        user: userReducer
    },
    preloadedState: {
        user: loadState()
    }
});

store.subscribe(() => {
    try {
        localStorage.setItem(
            Storage_Key,
            JSON.stringify(store.getState().user)
        );
    }
    catch(error){
        alert("Could not save state: ", error);
    }
});

export default store;