import React, { useState } from 'react'
import "./Create.css"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import axios from "axios"
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Create = () => {
    const [title,setTitle] = useState("")
    const [content,setContent] = useState("")
    const [src,setSrc] = useState("https://icons.iconarchive.com/icons/praveen/minimal-outline/512/gallery-icon.png")
    const formData = new FormData();
const imagefile = document.querySelector('#image');

    const handleImg = (e) => {
        if(e.target.files[0]) {
            setSrc(URL.createObjectURL(e.target.files[0]));    
        }
    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(title===""||content===""){
          toast("please fill all Fields")
        }else{
        formData.append("image", imagefile.files[0]);
        formData.append("title", title)
        formData.append("content", content)
        const res = await axios.post('/notes', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                        }
                    })
        if(res.status===200){
          
            setTitle("")
            setContent("")
            formData.delete("image")
            formData.delete("title")
            formData.delete("content")
            toast("Note created!!")
        }else{
            toast("can't create Note Right Now")
        }
      }
    }
    return (
        <div className="create">
            <div className="create__left">
                <img src={src} alt="Uploaded"></img>
            </div>
        <div className="create__right">
        <form className="was-validated form" enctype="multipart/form-data">
        <div className="mb-3">
    <div className="input-group is-invalid">
      <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder="Title" className="form-control is-invalid" aria-describedby="validatedInputGroupPrepend" required/>
    </div>
  </div>
        <div className="mb-3">
          <textarea value={content} onChange={(e)=>{setContent(e.target.value)}} rows="10" cols="50" name="content" className="form-control is-invalid" id="validationTextarea" placeholder="Note Content" required></textarea>
        </div>
        <div className="input-group is-invalid">
          <div className="custom-file">
            <input onChange={handleImg} name="image" type="file" className="custom-file-input" id="image" required/>
            <label className="custom-file-label" for="validatedInputGroupCustomFile">Choose file...</label>
          </div>
        </div>
        <div className="mt-3">
             <button className="btn btn-outline-secondary button" onClick={handleSubmit} type="button">Create</button>
        </div>
      </form>
        </div>
        <ToastContainer autoClose={5000} />
      </div>
    )
}

export default Create
