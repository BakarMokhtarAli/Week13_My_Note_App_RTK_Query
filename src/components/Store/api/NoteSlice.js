import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const BASE_URL = "http://localhost:9000";

export const NoteSlice = createApi({
    reducerPath: "note",
    baseQuery: fetchBaseQuery({
      baseUrl: BASE_URL,
    }),
    tagTypes: ["notes"],
    endpoints: (builder) => ({

        // Fetch Notes
        fetcNotes: builder.query({
          query: () => {
            return {
              url: "/notes",
              method: "GET",
            };
          },
          providesTags: ["notes"]
        }),

        addNote: builder.mutation({
            query: (newNote) =>({
                url: "/create_note",
                method: "POST",
                body: newNote
            }),
            invalidatesTags: ["notes"]
        }),

        editNote: builder.mutation({
            query: ( {noteId, UpdatedNote} ) => ({
                url: `update_note/${noteId}`,
                method: "PUT",
                body: UpdatedNote
            }),
            invalidatesTags: ["notes"]
        }),

        deleteNote : builder.mutation({
            query: (id) => ({
                url: `delete_note/${id}`,
                method: "DELETE"
            })
        })
})

})

export const { useFetcNotesQuery, useAddNoteMutation, useEditNoteMutation, useDeleteNoteMutation } = NoteSlice
export default NoteSlice.reducer