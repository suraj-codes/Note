import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./Notes.css"

import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { NavLink } from 'react-router-dom'
const Notes = () => {
    const [notes,setNotes] = useState([])
   const isEmpty=(obj)=> {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
    useEffect(()=>{
    const fetchNotes = async()=>{
        const notes = await axios.get("/notes",{params:{}});
      if(isEmpty(notes.data)){
        setNotes("THIS IS EMPTY OBJECT")
      }else{
        setNotes(notes.data);
      }
    }
    fetchNotes()
    },[])
    return (
        <div className="w-100 pt-5 ps-4 row row-cols-1 row-cols-md-3 g-4">
        {typeof(notes)==="string"?<h1>No Notes Yet,<br></br> Please Create One.</h1>:
        notes.length>0?
          notes.map(note=>(
              <div className="col">
              <div className="card h-100">
                <img src={`https://surajcodesnoteapi.herokuapp.com/${note.image}`} className="card-img-top" alt="..."/>
                <div className="card-body">
                  <h5 className="card-title">{note.title.length>=11?`${note.title.slice(0,10)} ...`:note.title}</h5>
                  <p className="card-text">{note.content.length>=501?`${note.content.slice(0,500)} ...`:note.content}</p>
                  <NavLink to={`/notes/${note.addr}`} className="btn btn-primary">Read More</NavLink>
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
        </div>
    )
}

export default Notes
