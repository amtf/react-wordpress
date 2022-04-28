import React, { useState, useReducer } from "react"
import ReactDOM from "react-dom"
import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useImmerReducer } from "use-immer"
import { useEffect } from "react"
import Header from "./components/Header"
import CreatePost from "./components/CreatePost"
import Axios from "axios"

function Main() {
  Axios.defaults.baseURL = "https://www.tinyboy.dev.cc"

  const initialState = {
    loggedIn: Boolean(localStorage.getItem("wordpressappToken")),
    user: {
      token: localStorage.getItem("wordpressappToken"),
      user_display_name: localStorage.getItem("wordpressappUsername"),
      avatar: localStorage.getItem("wordpressappAvatar"),
    },
  }

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true
        draft.user = action.data
        return
      case "logout":
        draft.loggedIn = false
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("wordpressappToken", state.user.token)
      localStorage.setItem("wordpressappUsername", state.user.user_display_name)
      localStorage.setItem("wordpressappAvatar", "")
    } else {
      localStorage.removeItem("wordpressappToken")
      localStorage.removeItem("wordpressappUsername")
      localStorage.removeItem("wordpressappAvatar")
    }
  }, [state.loggedIn])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/create-post" element={<CreatePost />} />
          </Routes>
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}
ReactDOM.render(<Main />, document.querySelector("#app"))
