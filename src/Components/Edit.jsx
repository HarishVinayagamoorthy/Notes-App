import React, { useRef, useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { NotesContext } from './Context/NotesDataContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Formik } from 'formik'

const Edit = () => {
  const params = useParams()
  // let [title, setTitle] = useState("")
  // let [notes, setNotes] = useState("")
  let { API_URL } = useContext(NotesContext)
  let [data, setData] = useState([])
  let ref1 = useRef()
  let ref2 = useRef()

  const [initialValues, setInitialValues] = useState({
    title: '',
    notes: ''

  })
  let navigate = useNavigate()

  let handleDelete = (index) => {
    let newArray = [...data]//deep copy
    newArray.splice(index, 1)
    setData(newArray)
  }

  // const getData = (index)=>{

  // setTitle(data[index].title)
  // setNotes(data[index].notes)
  // }
  const getData = async (id) => {
    try {
      let res = await axios.get(`${API_URL}/${id}`)
      if (res.status === 200) {
        setInitialValues(res.data)
      }
    }
    catch (error) {
      toast.error("Error Occoured")

    }
  }


  const handleEdit = async (values) => {
    // let newArray = [...data]
    //   newArray.splice(Number(params.id),1,values)
    //   setData(newArray)


    try {
      let res = await axios.put(`${API_URL}/${params.id}`, values)
      if (res.status === 200) {
        navigate('notes')

        toast.success("Notes Edited Successfully")

      }
    }
    catch (error) {
      //  toast.error("ERROR OCCURRED")
      console.log(error)
    }
  }


  useEffect(() => {
    if (Number(params.id)) {
      getData(Number(params.id))
    }
    else {
      navigate('notes')
    }
    ref1.current.focus()
  }, [])




  // var handleEdit = ()=>{
  //   let newArray = [...data]
  //   newArray.splice(Number(params.id),1,{
  //     title,
  //      notes

  //   })
  //   setData(newArray)

  // navigate('/notes')

  // }

  return <>
    <div className="col-sm-9  notes-body">
      <div className="well notes-text ">
        <h4 className="notes-titel">Edit a Note</h4>

        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={(values) => {
            handleEdit(values)
          }}

        >
          {({ values, handleBlur, handleSubmit, handleChange }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-outline">
                <input
                  type="text"
                  ref={ref1}
                  value={values.title}
                  name='title'
                  id="typeText"

                  placeholder="Title"
                  className="form-control"
                  onBlur={handleBlur} onChange={handleChange} />


                <textarea
                  className="form-control"
                  value={values.notes}
                  name='notes'
                  ref={ref2}
                  placeholder="Take a note..."
                  id="textAreaExample"
                  rows="4"
                  onBlur={handleBlur} onChange={handleChange}>
                </textarea>

                <button type="submit" className="btn CE-button" onClick={handleEdit} >
                  Edit
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>

      <div className="row">
        <div className="col-sm-3">
          <ul className="nav nav-pills nav-stacked nav-ul notes-ul">
            <li className="notesbtn">
              <a href="#section1">
                <i className="fa-solid fa-file-lines"></i> MY Notes
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

      <div className="row content">
        {
          data.map((e, i) => {
            return <><div className="col-sm-4" key={i} >
              <div className="well notes-cards" >


                <h1 className='cards-title'>{e.title}</h1>
                <div className="curd-icons">
                  <i className="fa-solid fa-pen" onClick={() => {


                    navigate(`/edit/${i}`)
                  }}></i>

                  <i className='fa-solid fa-trash-can' onClick={() => handleDelete(e.id, i)}></i>
                </div>
                <div className="overflow-auto  cards-overflow">


                  <p>{e.notes}</p>
                </div>
              </div>
            </div>
              {/* </div> */}

            </>

          })
        }
      </div>


    </div>




  </>
}
export default Edit