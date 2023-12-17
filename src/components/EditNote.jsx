import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditNoteMutation, useFetcNotesQuery } from './Store/api/NoteSlice';


const EditNote = () => {
  
  const [ initialValues, setIntianValues ] = useState({
    title: "",
    content: ""
  })
  const params = useParams()
  const navigate = useNavigate()
  const { data: allNote = [] } = useFetcNotesQuery()
  const [ editNote ] = useEditNoteMutation();

  useEffect(()=>{
    const notes = allNote.find((note) => note.id === Number(params.id))     
    if(notes){
      setIntianValues(notes)
    }
  },[params.id, allNote])

  const validationSchema = Yup.object({
    title: Yup.string().required("title is required"),
    content: Yup.string().required("content is required")
  })
  
  function handleSubmit(values){
      editNote({
        noteId: Number(params.id),
        UpdatedNote: values
      }).unwrap().then(()=>{
        navigate("/")
      })
      setIntianValues({
        title: "",
        content: ""
      })
  }
  

  return (
    <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-5">
            <Field
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
            />
            <ErrorMessage name="title" component="div" className="text-red-500" />
          </div>

          <div className="mb-5">
            <Field
              as="textarea"
              name="content"
              placeholder="Body"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
            />
            <ErrorMessage name="content" component="div" className="text-red-500" />
          </div>

          <button
            type="submit"
            className="block w-full bg-yellow-400 text-black font-bold p-4 rounded-lg hover:bg-yellow-500"
          >
            Update Note
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default EditNote;
