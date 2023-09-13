import {createSlice} from "@reduxjs/toolkit";

const loggedInUser = createSlice({
    name: "loggedInUser",
    initialState: {
     id: "64f8c19aa4b6dfb8be6c51b0"
    },
    reducers: {
        logInUser: (state ) => {}
    }
})

export const logInUser = loggedInUser.reducer.logInUser;
export default loggedInUser.reducer;