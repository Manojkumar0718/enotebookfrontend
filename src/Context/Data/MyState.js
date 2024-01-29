import React, { useState } from 'react';
import toast from 'react-hot-toast';
import MyContext from './MyContext';
import { Navigate } from 'react-router-dom';

const MyState = (props) => {

  const baseURL = process.env.REACT_BACKEND_BASE_URL
  

  const [loading, setLoading] = useState(false);
  const [allNotes, setAllNotes] = useState([]);


  const getAllNotes = async () => {
    setLoading(true)
    try {
      const res = await fetch(`http://localhost:4000/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        }
      });

      const notesData = await res.json()
      console.log(notesData)
      setAllNotes(notesData)
      setLoading(false)

    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');

  const addNote = async () => {
    const res = await fetch(`http://localhost:4000/api/notes/addnote`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'auth-token': localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    })

    const noteData = await res.json();

    getAllNotes();

    if (noteData.error) {
      toast.error(noteData.error)
    } else {
      toast.success(noteData.success);
    }

    //* after submit data all fields empty   
    setTitle("");
    setDescription("");
    setTag("");
  }

  const deleteNote = async (id) =>{
      const res = await fetch(`http://localhost:4000/api/notes/deletenote/${id}` , {
        method : "DELETE",
        headers : {
          'Content-Type' : "appliction/json",
          'auth-token' : localStorage.getItem("token")
        },
      })

      const noteData = await res.json();

      getAllNotes();

      toast.success(noteData.Success)
  }

//   const deleteNote = async (id) => {
//     try {
//         const res = await fetch(`${baseURL}/api/notes/deletenote/${id}`, {
//             method: "DELETE",
//             headers: {
//                 'Content-Type': "application/json",
//                 'auth-token': localStorage.getItem("token")
//             },
//         });

//         if (!res.ok) {
//             throw new Error("Failed to delete note");
//         }

//         const noteData = await res.json();
        
//         getAllNotes();

//         toast.success(noteData.Success);
//     } catch (error) {
//         console.error("Error deleting note:", error.message);
//         toast.error("Failed to delete note. Please try again later.");
//     }
// };


  return (
    <div>
      <MyContext.Provider value={{ allNotes, getAllNotes, loading, title, setTitle, description, setDescription, tag, setTag, addNote , deleteNote }} >
        {props.children}
      </MyContext.Provider>
    </div>
  );
}

export default MyState;
