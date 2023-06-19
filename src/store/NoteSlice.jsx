import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const BASE_URL = "http://localhost:9000";

export const noteSlice = createApi({
    reducerPath: "note",
    baseQuery: fetchBaseQuery({
      baseUrl: BASE_URL,
    }),
    tagTypes: ["notes"],
    endpoints: (builder) => ({

        // Fetch Notes
        fetchBooks: builder.query({
          query: () => {
            return {
              url: "notes",
              method: "GET",
            };
          },
          providesTags: ["notes"]
        }),
        addNote: builder.mutation({
            query: (newNote) =>({
                url: "create_note",
                method: "POST",
                body: newNote
            }),
            invalidatesTags: ["notes"]
        }),

        editNote: builder.mutation({
            query: ({noteId,updatedNote}) =>({
                url: `update_note/${noteId}`,
                method: "PUT",
                body: updatedNote
            }),
            invalidatesTags:["notes"]
        }),

        deletNode: builder.mutation(({
            query: (noteId)=>({
                url: `delete_note/${noteId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["notes"]
        }))






    })
})

export const { useFetchBooksQuery, useAddNoteMutation, useEditNoteMutation , useDeletNodeMutation} = noteSlice;
export default noteSlice.reducer;