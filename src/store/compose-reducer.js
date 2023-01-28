import { createSlice } from "@reduxjs/toolkit";

const initialComposeState = {
    composeMail: '',
    fetchMail: []
}

const ComposeSlice = createSlice({
    name: 'compose',
    initialState: initialComposeState,
    reducers: {
        composeMail(state, action){
            state.composeMail = action.payload.userMailId
        },
        fetchMail(state, action){
            state.fetchMail = action.payload
        }
    }
});

export const composeActions = ComposeSlice.actions;
export default ComposeSlice.reducer;