import React from 'react';
import { Formik, Form, Field, ErrorMessage, yupToFormErrors } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAddNoteMutation } from './Store/api/NoteSlice';


const AddNote = () => {

  const [ addNote ] = useAddNoteMutation()
 
  let initialValues= {
      title: "",
      content: ""
  }

  const navigate= useNavigate()
  const validationSchema = Yup.object({
    title: Yup.string().required("title is required"),
    content: Yup.string().required("content is required")
  })

  const handleSubmit = (values) => {
      addNote(values).unwrap().then(()=>{
        window.location.reload()
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
            Add Note
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddNote;
