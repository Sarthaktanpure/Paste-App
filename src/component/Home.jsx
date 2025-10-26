import { useState, useEffect } from "react"; // Added useEffect
import { useDispatch, useSelector } from "react-redux"; // Added useSelector
import { useSearchParams } from "react-router-dom";
import { addToPaste, updateToPaste } from "../redux/pasteSlice";
import toast from 'react-hot-toast'; // Import toast for local error handling

function Home() {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();

    // Fetch all pastes from Redux state to pre-fill the form for editing
    const pastes = useSelector(state => state.paste.pastes);

    // Effect to pre-fill the form when a pasteId is present (for editing)
    useEffect(() => {
        if (pasteId) {
            const pasteToEdit = pastes.find(p => p.id === pasteId);
            if (pasteToEdit) {
                setTitle(pasteToEdit.title || '');
                setValue(pasteToEdit.content || '');
            } else {
                // If the ID is in the URL but the paste doesn't exist
                toast.error("Paste for editing not found.");
                setSearchParams({}); // Clear the invalid search param
            }
        } else {
            // Clear the form if pasteId is not present
            setTitle('');
            setValue('');
        }
    }, [pasteId, pastes, setSearchParams]);

    function createPaste() {
        if (!title.trim() || !value.trim()) {
            toast.error("Title and Content cannot be empty!");
            return;
        }

        if (pasteId) {
            // 🛑 CRITICAL FIX: The updateToPaste reducer expects an object { id, updatedContent }
            const updatePayload = {
                id: pasteId, // Use the ID from the URL param
                // Correctly use the current state values
                updatedTitle: title,
                updatedContent: value,
            };

            dispatch(updateToPaste(updatePayload));
        } else {
            // Create a new paste object
            const newPaste = {
                id: Date.now().toString(36) + Math.random().toString(36).substr(2), // More robust unique ID
                title: title,
                content: value,
                createdAt: new Date().toISOString(),
            };
            dispatch(addToPaste(newPaste));
        }

        // After creation or updation
        setTitle('');
        setValue('');
        setSearchParams({});
    }

    return (
        <>
            <div className="flex flex-row gap-7 place-content-between">
                <input
                    className="p-1 rounded-2xl mt-2 w-[50%] pl-4"
                    type="text"
                    placeholder="Enter title Here.."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button
                    onClick={createPaste}
                    className="p-2 rounded-2xl mt-2 bg-blue-500 text-black hover:bg-blue-600 transition duration-200" // Added tailwind styles for button clarity
                >
                    {pasteId ? "Update My Paste" : "Create My Paste"}
                </button>
            </div>
            <div className="mt-8">
                <textarea
                    className="rounded-2xl mt-4 min-w-full p-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" // Improved styling
                    value={value}
                    placeholder="Enter Content Here..."
                    onChange={(e) => setValue(e.target.value)}
                    rows={20}
                >
                </textarea>
            </div>
        </>
    );
}
export default Home;