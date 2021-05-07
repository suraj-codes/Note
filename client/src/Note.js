import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./Note.css"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { useHistory, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
const Notes = () => {
  const history = useHistory()
  const [edit,setEdit] = useState(false);
  const [newContent,setNewContent] = useState("")
  const [newTitle,setNewTitle] = useState("")
    const [notes,setNotes] = useState([])
   const addr =  useParams();
    useEffect(()=>{
    const fetchNotes = async()=>{
        const notes = await axios.get("/notes",{params:{addr:addr.addr}});
        setNotes(notes.data);
        setNewTitle(notes.data[0].title)
        setNewContent(notes.data[0].content)
    }
    fetchNotes()
    },[addr])
    const deleteNote=async()=>{
        const count = await axios.delete("/notes",{data:{addr:addr.addr}})
        if(count.data.deletedCount){
          alert("Note deleted")
          history.push("/notes")
        }else{
          toast("Can't Delete Note Right Now!!")
        }
        
    }
    const updateNote=async()=>{
        if(newTitle===notes[0].title&&newContent===notes[0].content){
          alert("NO changes to Save!!!")
        }else{
          window.location.reload(false)
          await axios.patch("/notes",{addr:addr.addr,newTitle,newContent})
        }
    }
    return (
      <div className="row p-5 w-100 row-cols-1 row-cols-md-30 g-4">
     {edit?
        notes.map(note=>(
         
            <div className="col">
               <h3 style={{textAlign:"center"}}>Click on Anything you want to edit</h3>
            <div className="card h-100">
            <div className="d-flex bg-dark">
            <input type="text" value={newTitle} onChange={(e)=>{setNewTitle(e.target.value)}} className="m-4 editTitle"></input>
            <div className="ml-auto">
            <button title="Save Changes" onClick={updateNote} type="button" className="m-3 btn btn-outline-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
</svg>
  </button>
               <button title="Discard Changes" onClick={()=>{setEdit(false)}} type="button" className="m-3 btn btn-outline-danger"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg></button>
                
                   </div>
                </div>
              <div className="card-body">
              <img src={`https://surajcodesnoteapi.herokuapp.com/${note.image}`} className="card-img-top" alt="..."/>
                <textarea rows="15" type="text" value={newContent} onChange={(e)=>{setNewContent(e.target.value)}} className="editContent"></textarea>
             </div>
            </div>
          </div>
        ))
      
      
     :
      notes.length>0?
        notes.map(note=>(
            <div className="col">
            <div className="card h-100">
            <div className="d-flex bg-dark">
            <h5 className="card-title text-light m-4">{note.title}</h5>
               <div className="ml-auto">
               <button onClick={()=>{setEdit(true)}} type="button" className="m-3 btn btn-outline-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
  </svg></button>
                <button onClick={deleteNote} type="button" className="m-3 btn btn-outline-danger">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
  </svg>
  </button>
                   </div>
                </div>
              <img src={`https://surajcodesnoteapi.herokuapp.com/${note.image}`} className="card-img-top" alt="..."/>
              <div className="card-body">
              <i className="bi bi-trash"></i>
                
                
                <p className="card-text">{note.content}</p>
               
              
  
              </div>
            </div>
          </div>
        ))
      :
      <div className="d-flex justify-content-center">
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
  </div>
      }
     
     <ToastContainer autoClose={1000} />
      </div>

           )
}

export default Notes
