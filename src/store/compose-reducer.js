import { createSlice } from "@reduxjs/toolkit";

const initialComposeState = {
    composeMail: ''
}

const ComposeSlice = createSlice({
    name: 'compose',
    initialState: initialComposeState,
    reducers: {
        composeMail(state, action){
            state.composeMail = action.payload.userMailId
        }
    }
});

export const composeActions = ComposeSlice.actions;
export default ComposeSlice.reducer;