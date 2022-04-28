import React, { useEffect } from "react"
import { Link } from "react-router-dom"

function Post(props) {
  {
    const post = props.post
    const date = new Date(post.modified)
    const dateFormatted = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`
    // return (
    //   <Link onClick={props.onClick} to={`/post/${post._id}`} className="list-group-item list-group-item-action">
    //     <img className="avatar-tiny" src={post.author.avatar} /> <strong>{post.title}</strong>{" "}
    //     <span className="text-muted small">
    //       {!props.noAuthor && <>by {post.author.username}</>} on {dateFormatted}{" "}
    //     </span>
    //   </Link>
    // )
    return (
      <div className="list-group-item list-group-item-action" key={post.id}>
        <span>
          <strong>{post.title.rendered}</strong>
        </span>{" "}
        <span className="text-muted small">{dateFormatted}</span>
        <span></span>
      </div>
    )
  }
}

export default Post
