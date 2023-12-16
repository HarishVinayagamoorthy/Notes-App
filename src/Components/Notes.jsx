import React, { useEffect, useState, useContext, useRef } from "react";
import { NotesContext } from "./Context/NotesDataContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

function Notes() {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    notes: Yup.string().required("Notes are required"),
  });

  const [data, setData] = useState([]);
  const { API_URL } = useContext(NotesContext);
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const notesRef = useRef(null);

  const handleDelete = async (id, index) => {
    let newArray = [...data];
    newArray.splice(index, 1);
    setData(newArray);
    try {
      let res = await axios.delete(`${API_URL}/${id}`);
      if (res.status === 200) {
        getData();
        toast.success("Notes Delete Successfully ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddUser = async (values, { resetForm }) => {
    if (!values.title || !values.notes) {
      toast.error("Title and Notes are required");
      return;
    }

    try {
      let res = await axios.post(API_URL, values);

      if (res.status === 201) {
        // Clear form fields using refs
        resetForm();

        toast.success("Notes created");
        getData();
      }
    } catch (error) {
      toast.error("Error Occurred");
    }
  };

  const getData = async () => {
    try {
      let res = await axios.get(API_URL);
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const date = new Date();
  const showTime = date.getMinutes();

  return (
    <>
      <div className="col-sm-9 notes-body">
        <div className="well notes-text">
          <h4 className="notes-title">Add a Note</h4>
          <Formik
            initialValues={{
              title: "",
              notes: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              handleAddUser(values, actions);
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <div className="form-outline">
                  <Field
                    type="text"
                    name="title"
                    id="typeText"
                    placeholder="Title"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="invalid-feedback"
                  />

                  <Field
                    as="textarea"
                    name="notes"
                    placeholder="Take a note..."
                    id="textAreaExample"
                    rows="4"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="notes"
                    component="div"
                    className="invalid-feedback"
                  />

                  <button
                    type="submit"
                    className="btn CE-button"
                    disabled={isSubmitting}
                  >
                    Create
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>

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
        <div className="row content">
          <div className="overflow-auto total-cards-overflow">
            {data.map((e, i) => (
              <div className="col-sm-4" key={i}>
                <div className="well notes-cards">
                  <h1 className="cards-title">{e.title}</h1>
                  <div className="curd-icons">
                    <i
                      className="fa-solid fa-pen"
                      onClick={() => navigate(`/edit/${e.id}`)}
                    ></i>
                    <i
                      className="fa-solid fa-trash-can"
                      onClick={() => handleDelete(e.id, i)}
                    ></i>
                  </div>
                  <div className="overflow-auto cards-overflow">
                    <p className="notes-para">{e.notes}</p>
                  </div>
                  <h5 className="date-time">{showTime} minutes ago</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Notes;
