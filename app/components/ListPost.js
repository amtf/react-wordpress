import React, { useEffect, useContext } from "react"
import StateContext from "../StateContext"
import { useImmer } from "use-immer"
import Axios from "axios"
import Page from "./Page"
import Post from "./Post"
import LoadingDotsIcon from "./LoadingDotIcon"

function ListPost() {
  const appState = useContext(StateContext)
  const [state, setState] = useImmer({
    isLoading: true,
    posts: [],
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Axios.get("wp-json/wp/v2/posts")
        setState((draft) => {
          draft.isLoading = false
          draft.posts = response.data
        })
      } catch (e) {
        console.log("There was a problem.")
      }
    }
    fetchData()
  }, [])

  if (state.isLoading) {
    return <LoadingDotsIcon />
  }

  return (
    <Page title="Your Post">
      <>
        <h2 className="text-center mb-4">The Latest Wordpress Posts</h2>
        <div className="list-group">
          {state.posts.map((post) => {
            return <Post post={post} key={post.id} />
          })}
        </div>
      </>
    </Page>
  )
}

export default ListPost
