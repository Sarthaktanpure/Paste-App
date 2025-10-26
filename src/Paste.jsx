import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// 🛑 FIX: You must import the action creator 'removefromPaste' here
import { removefromPaste } from "./redux/pasteSlice";
import { useSearchParams } from "react-router-dom"; // Import useSearchParams for Edit functionality

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState(""); // Corrected spelling to 'searchTerm'
  const dispatch = useDispatch();
  const navigate= useNavigate();

  // Import setSearchParams to navigate to the edit URL
  const [searchParams, setSearchParams] = useSearchParams();

  // Ensure filtering uses the correct property: 'content'
  const filteredData = pastes.filter(
    (paste) =>
      paste.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paste.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handledelete(idToRemove) {
    dispatch(removefromPaste(idToRemove));
  }

  // Function to handle the Edit button click
  function handleEdit(pasteId) {
    // Set a search parameter to indicate which paste to edit
    setSearchParams({ pasteId: pasteId });
    // Optional: You might want to navigate to the Home component or the route that handles creation/editing
     navigate("/"); // If you use react-router's navigate hook
  }

  return (
    <div>
      <input
        className="p-2 rounded-2xl min-w-[600px] mt-5"
        type="search"
        placeholder="Search by title or content..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Corrected spelling
      />
      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => {
            // 🛑 REMEMBER: Add a key to the outermost element in a map!
            return (
              // <div key={paste.id} className="border p-4 rounded-lg shadow-md bg-black">
              //      <div className="flex flex-row gap-4 place-content-evenly text-sm">
              //         <button
              //             className="bg-yellow-500 text-black p-1 rounded hover:bg-yellow-600 transition"
              //             onClick={() => handleEdit(paste.id)} // Call handleEdit on click
              //         >
              //             Edit
              //         </button>
              //         <button
              //             className="bg-blue-500 text-black p-1 rounded hover:bg-blue-600 transition"
              //             onClick={() => navigator.clipboard.writeText(paste.content).then(() => alert("Copied!"))}
              //         >
              //             Copy
              //         </button>
              //         <button
              //             className="bg-red-500 text-black p-1 rounded hover:bg-red-600 transition"
              //             onClick={() => handledelete(paste?.id)}
              //         >
              //             Delete
              //         </button>
              //         <button className="bg-gray-200 text-gray-800 p-1 rounded hover:bg-gray-300 transition">
              //             View
              //         </button>
              //         <button className="bg-green-500 text-black p-1 rounded hover:bg-green-600 transition">
              //             Share
              //         </button>
              //     </div>
              //     <div className="font-bold text-xl mb-1 mt-2 text-white">
              //         {paste.title}
              //     </div>
              //     <div className="text-white whitespace-pre-wrap mb-3">
              //         {/* 🛑 FIX: Use 'content' property consistently */}
              //         {paste.content}
              //     </div >

              //     <div className="text-xs text-gray-500 mt-2">
              //         Created: {new Date(paste.createdAt).toLocaleDateString()} at {new Date(paste.createdAt).toLocaleTimeString()}
              //     </div>
              // </div>

              <div className="card text-center bg-black rounded-2xl ">
                <div className="card-header bg-gray-600 text-white rounded-2xl"><h4>{paste.title}</h4></div>
                <div class="card-body mt-2 mb-2">             
                  <p class="card-text text-white mb-2">
                   {paste.content}
                  </p>
                  {/* <a href="#" class="btn btn-primary">
                    Go somewhere
                  </a> */}
                  <div>
                          <div className="flex flex-row gap-4 place-content-evenly text-sm">
                      <button
                          className="bg-yellow-500 text-black p-1 rounded hover:bg-yellow-600 transition btn btn-secondary"
                          onClick={() => handleEdit(paste.id)} // Call handleEdit on click
                      >
                          Edit
                      </button>
                      <button
                          className="bg-blue-500 text-black p-1 rounded hover:bg-blue-600 transition btn btn-secondary"
                          onClick={() => navigator.clipboard.writeText(paste.content).then(() => alert("Copied!"))}
                      >
                          Copy
                      </button>
                      <button
                          className="bg-red-500 text-black p-1 rounded hover:bg-red-600 transition btn btn-secondary"
                          onClick={() => handledelete(paste?.id)}
                      >
                          Delete
                    </button>
                     
                    
                  </div> 
                
                    </div>
                </div>
                <div class="card-footer text-body-secondary">2 days ago</div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-lg mt-10 text-gray-500">
            No pastes found. Create one or try a different search term.
          </p>
        )}
      </div>
    </div>
  );
};
export default Paste;
