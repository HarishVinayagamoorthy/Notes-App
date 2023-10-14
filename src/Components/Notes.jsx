import React, { useRef, useEffect, useState, useContext } from "react";
import { NotesContext } from "./Context/NotesDataContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { Formik } from 'formik';
import { toast } from 'react-toastify'




function Notes() {

  // let [title, setTitle] = useState("")
  // let [notes, setNotes] = useState("")

  let [data, setData] = useState([])

  let { API_URL } = useContext(NotesContext)

  const navigate = useNavigate()



  let ref1 = useRef()
  let ref2 = useRef()


  let handleDelete = async (id, index) => {
    let newArray = [...data]
    newArray.splice(index, 1)
    setData(newArray)
    try {
      let res = await axios.delete(`${API_URL}/${id}`)
      if (res.status === 200) {
        getData()
      }
    } catch (error) {
      toast.error("Error Occoured")
    }
  }





  let handleAddUser = async (values) => {
    let newArray = [...data];
    newArray.push(values);
    toast.success("notes Created ")
    setData(newArray);
    ref1.current.value = ""
    ref2.current.value = ""
    // navigate('notes')

    try {


      let res = await axios.post(API_URL, values)

      if (res.status === 201) {
        // toast.success("notes Created ")
        getData()
      }
    }
    catch (error) {

      toast.error("Error Occoured")
    }
  }



  const getData = async () => {
    try {
      let res = await axios.get(API_URL)
      if (res.status === 200) {
        // toast.success("User Data Fetched")
        setData(res.data)
      }
    } catch (error) {
      toast.error("Internal Server Error")
    }

  }
  useEffect(() => {
    getData()
    ref1.current.focus()
  }, [])




  const date = new Date();
  const showTime = date.getMinutes();




  return (
    <><div className="col-sm-9  notes-body">
      <div className="well notes-text " >
        <h4 className="notes-titel">Add a Note</h4>
        <Formik
          initialValues={{
            title: "",
            notes: "",

          }}
          onSubmit={(values) => {
            handleAddUser(values)
          }}
        >

          {({ handleBlur, handleSubmit, handleChange }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-outline">
                <input
                  type="text"
                  ref={ref1}
                  name='title'
                  id="typeText"
                  placeholder="Title"
                  className="form-control"
                  onBlur={handleBlur} onChange={handleChange}

                />


                <textarea
                  className="form-control"
                  name='notes'
                  ref={ref2}
                  placeholder="Take a note..."
                  id="textAreaExample"
                  rows="4"
                  onBlur={handleBlur} onChange={handleChange}

                ></textarea>
                <button type="submit" className="btn CE-button" >
                  Create
                </button>
              </div>
            </form>
          )}
        </Formik>

      </div>





      {/* <Edit/> */}

      {/* <div className="well notes-text ">
        <h4 className="notes-titel">Add a Note</h4>



        <form  onSubmit={(e)=>{
         e.preventDefault()
         let newArray = [...data]
         // console.log(data)
         newArray.push({ title,notes })
         setData(newArray)
        
         // console.log(newArray)
                   }}>
          <div className="form-outline">
            <input
              type="text"
              id="typeText"
            value={title}
              placeholder="Title"
              className="form-control"
              onChange={(e) => setTitle(e.target.value)}
            
            />
             

            <textarea
              className="form-control"
           value={notes}
             
              placeholder="Take a note..."
              id="textAreaExample"
              rows="4"
              onChange={(e) => setNotes(e.target.value)}

            ></textarea>
            <button type="submit" className="btn CE-button" >
              Create
            </button>
          </div>
        </form>

      </div> */}

      <div className="row">
        <div className="col-sm-3">
          <ul className="nav nav-pills nav-stacked nav-ul notes-ul mynotes">
            <li className="notesbtn ">
              <a href="#section1">
                <i className="fa-solid fa-file-lines "></i> MY Notes
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="row ">
        <div className="col-sm-3 ">
          <div className=" sub-title ">
            <p>Recently viewed</p>
          </div>
        </div>
      </div>
      {/* <div className="overflow-auto  cards-overflow"> */}
      <div className="row content">
        <div className="overflow-auto   total-cards-overflow">
          {
            data.map((e, i) => {
              return <><div className="col-sm-4" key={i} >

                <div className="well notes-cards"  >
                  {/* <div className="title-icons"> */}

                  <h1 className='cards-title'>{e.title}</h1>
                  <div className="curd-icons">
                    <i className="fa-solid fa-pen" onClick={() => { navigate(`/edit/${e.id}`) }}></i>
                    <i className='fa-solid fa-trash-can' onClick={() => handleDelete(e.id, i)}></i>
                  </div>


                  <div className="overflow-auto  cards-overflow">
                    <p className="notes-para">{e.notes}</p>
                  </div>
                  <h5 className="date-time">{showTime} minutes ago</h5>
                </div>

              </div>
              </>

            })
          }
        </div>
      </div>
    </div>
    </>
  );



}






export default Notes;