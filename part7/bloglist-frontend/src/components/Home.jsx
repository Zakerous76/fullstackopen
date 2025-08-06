import React from "react"

const Home = () => {
  return (
    <div>
      {user === null ? (
        <div className="login-form">
          <NotificationComponent />

          <h2>Log in to application</h2>
          <LoginForm />
        </div>
      ) : (
        <div className="create-blog-form">
          <NotificationComponent />

          <h2>blogs</h2>

          <p>
            {user.name} is logged in{" "}
            <button
              onClick={() => {
                dispatch(setUser(null))
                window.localStorage.removeItem(config.localStorageUserKey)
              }}
            >
              Log out
            </button>
          </p>
          <Togglable buttonLabel="New Note" ref={toggleNewNoteVisibility}>
            {/* already did that: 5.6 Blog List Frontend, step 6 */}
            <BlogForm toggleNewNoteVisibility={toggleNewNoteVisibility} />
          </Togglable>
        </div>
      )}

      <div className="blog-list">
        {blogs.map((blog) => {
          try {
            return <Blog key={blog.id} blog={blog} />
          } catch (error) {
            console.log(error)
          }
        })}
      </div>
    </div>
  )
}

export default Home
