import React, { useEffect, useState, useContext } from "react"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"
import { useNavigate } from "react-router-dom"
import Axios from "axios"
import Page from "./Page"

function CreatePost() {
  const [title, setTitle] = useState()
  const [body, setBody] = useState()
  const navigate = useNavigate()
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await Axios("wp-json/wp/v2/posts", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + appState.user.token,
        },
        data: {
          title,
          content: body,
          status: "publish",
        },
      })

      appDispatch({ type: "flashMessage", value: "Congrats, you created a new post." })

      navigate("/")
      console.log("New post is created")
    } catch (e) {
      console.log("There was a problem.")
    }
  }

  return (
    <Page title="Create Post">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input onChange={(e) => setTitle(e.target.value)} autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea onChange={(e) => setBody(e.target.value)} name="body" id="post-body" className="body-content tall-textarea form-control" type="text"></textarea>
        </div>

        <button className="btn btn-primary">Save New Post</button>
      </form>
    </Page>
  )
}

export default CreatePost
