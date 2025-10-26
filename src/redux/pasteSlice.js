import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const initialState = {
  // Initialize 'pastes' from local storage, or as an empty array
  pastes: localStorage.getItem("pastes") ? JSON.parse(localStorage.getItem("pastes")) : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    // 1. Adds a new paste to the state and local storage
    addToPaste: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Created Successfully ");
    },

    // 2. Updates an existing paste (expects payload: { id, updatedTitle, updatedContent })
    updateToPaste: (state, action) => {
      const { id, updatedTitle, updatedContent } = action.payload;

      // Find the index of the paste to update
      const index = state.pastes.findIndex(paste => paste.id === id);

      if (index !== -1) {
        // Use map to create a new array with the updated paste (ensuring immutability)
        const updatedPastes = state.pastes.map((paste, i) =>
          i === index
            ? {
                ...paste,
                title: updatedTitle,     // Update title
                content: updatedContent, // Update content
                updatedAt: new Date().toISOString()
            }
            : paste
        );

        state.pastes = updatedPastes;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Updated Successfully ");
      } else {
        toast.error("Paste Not Found for update ");
      }
    },

    // 3. Resets all pastes to an empty array
    resetAllPaste: (state, action) => {
      state.pastes = [];
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("All Pastes Cleared ");
    },

    // 4. Removes a paste by ID (expects payload: paste ID string)
    removefromPaste: (state, action) => {
      const idToRemove = action.payload;

      // Filter out the paste with the matching ID
      const initialLength = state.pastes.length;
      state.pastes = state.pastes.filter(paste => paste.id !== idToRemove);

      if (state.pastes.length < initialLength) {
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Removed Successfully ");
      } else {
        toast.error("Paste Not Found for removal ");
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPaste, updateToPaste, resetAllPaste, removefromPaste } = pasteSlice.actions

export default pasteSlice.reducer