import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Form, Modal } from 'semantic-ui-react'

export default function CommentForm(props) {
    const [ formOpen, setFormOpen] = useState(false)
    const [ author, setAuthor ] = useState('')
    const [ content, setContent ] = useState('')
    const { postId } = useParams();
    const { comments, setComments } = props

    const handleFormSubmit = (e) => {
    fetch(`/api/v1/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify({
            author: author,
            content: content,
            approved: true
        }),
        headers: {
            'Content-Type' : 'application/JSON'
        }
    })
    .then(res =>res.json())
    .then((data) => {
        setFormOpen(false)
        setComments(comments.concat(data.comment))
        
    })
  }

    return (
        <div>
            <Modal
        onClose={() => setFormOpen(false)}
        onOpen={() => setFormOpen(true)}
        open={formOpen}
        trigger={<Button>Add a new Comment!</Button>}
    >
        <Modal.Header>Add a new Comment!</Modal.Header>
        <Modal.Content>
            <Form id="newCommentForm" onSubmit={handleFormSubmit}>
                <Form.Input required label="Author" type='text' value={author} onChange={(e) => {setAuthor(e.target.value)}}></Form.Input>
                <Form.TextArea required label="Content" type='text' value={content} onChange={(e) => {setContent(e.target.value)}}></Form.TextArea>
            </Form>
        </Modal.Content>
        <Modal.Actions>
            <Button onClick={() => setFormOpen(false)}>Cancel</Button>
            <Button positive form="newCommentForm" >Submit</Button>
        </Modal.Actions>
    </Modal>
        </div>
    )
}
