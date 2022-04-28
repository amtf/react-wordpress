import React, { useState, useReducer } from "react"
import ReactDOM from "react-dom"
import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useImmerReducer } from "use-immer"
import { useEffect } from "react"
import Axios from "axios"
import Header from "./components/Header"
import CreatePost from "./components/CreatePost"
import Profile from "./components/Profile"

import FlashMessages from "./components/FlashMessages"

function Main() {
  Axios.defaults.baseURL = "https://www.tinyboy.dev.cc"

  const initialState = {
    loggedIn: Boolean(localStorage.getItem("wordpressappToken")),
    flashMessages: [],
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
      case "flashMessage":
        draft.flashMessages.push(action.value)
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
          <FlashMessages messages={state.flashMessages} />
          <Header />
          <Routes>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/profile/:username" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}
ReactDOM.render(<Main />, document.querySelector("#app"))
