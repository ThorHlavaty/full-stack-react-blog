import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Header, Modal, Segment } from 'semantic-ui-react'

export default function Posts(props) {

  const [ posts, setPosts ] = useState([])
  const [ formOpen, setFormOpen] = useState(false)
  const [ title, setTitle ] = useState('')
  const [ published, setPublished ] = useState('') 
  const [ author, setAuthor ] = useState('')
  const [ content, setContent ] = useState('')

  // componentDidMount
  useEffect(() => {
    fetch('/api/v1/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
      })
  }, [])

  const handleFormSubmit = (e) => {
    fetch('/api/v1/posts', {
        method: 'POST',
        body: JSON.stringify({
            author: author,
            title: title,
            content: content,
            published: published
        }),
        headers: {
            'Content-Type' : 'application/JSON'
        }
    })
    .then(res =>res.json())
    .then(data => {
        setFormOpen(false)
        setPosts(posts.concat(data))
    })
  }

  const deletePost= (id) => {
    fetch(`/api/v1/post/${id}`, {
      method: 'DELETE'})
      .then(res => {
         setPosts(posts.filter(obj =>{
          return obj.id !== id
        }))
      })
  }

  return (
    <div>
      <Header as="h1">Posts</Header>
      <Segment vertical >
        { posts.map((post) => {
        return <div key={post.id} style={{ marginBottom: '15px' }}>
        <Segment>
            <Header as="h2"><Link to={`/post/${post.id}`}>{ post.title }</Link></Header>
            <Header size='small'>{ post.author }</Header>
            <p>{ post.content.slice(0, 200)}{ post.content.length > 200 && "..."}</p>
            { post.content.length > 200 && (
            <Link to={`post/${post.id}`}>Read More</Link>
            )}
            {props.loggedIn && (<button onClick={() => {deletePost(post.id)}}>Delete</button>)}
        </Segment>
        </div>
    }) }
    </Segment>
    <Modal
        onClose={() => setFormOpen(false)}
        onOpen={() => setFormOpen(true)}
        open={formOpen}
        trigger={<Button>Add New Post</Button>}
    >
        <Modal.Header>Add a new Post</Modal.Header>
        <Modal.Content>
            <Form id="newPostForm" onSubmit={handleFormSubmit}>
                <Form.Input required label="Title" type='text' value={title} onChange={(e) => {setTitle(e.target.value)}}></Form.Input>
                <Form.Input required label="Author" type='text' value={author} onChange={(e) => {setAuthor(e.target.value)}}></Form.Input>
                <Form.Input required label="Publish Date" type="datetime-local" value={published} onChange={(e) => {setPublished(e.target.value)}}></Form.Input>
                <Form.TextArea required label="Content" type='text' value={content} onChange={(e) => {setContent(e.target.value)}}></Form.TextArea>
            </Form>
        </Modal.Content>
        <Modal.Actions>
            <Button onClick={() => setFormOpen(false)}>Cancel</Button>
            <Button positive form="newPostForm">Submit</Button>
        </Modal.Actions>
    </Modal>
    </div>
  )
}