import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { Header, Comment, Segment } from 'semantic-ui-react';
import CommentForm from './CommentForm';

export default function Comments(props) {
    const { postId } = useParams();
    const [comments, setComments] = useState([])

    const banContent = (id, author, content) => {
        fetch(`/api/v1/comments/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                author: author,
                content: content,
                approved: (true ? false : true)
            }),
            headers: {
                'Content-Type' : 'application/JSON'
            }
        })
        .then(res =>res.json())
        .then((data) => {
            fetch(`/api/v1/posts/${postId}/comments`)
            .then(res => res.json())
            .then(data => {
                setComments(data)
            })
        
        })
    }

    useEffect(() => {
        fetch(`/api/v1/posts/${postId}/comments`)
        .then(res => res.json())
        .then(data => {
            setComments(data)
        })
    }, [postId])

    return (
        <div>
            <Header>Comments!</Header>
            {comments.map((comment) => { if(props.loggedIn === false && comment.approved === true){
                return <Segment key={comment.id}><Comment>
                <Comment.Content>
                  <Comment.Author as='a'>{comment.author}: </Comment.Author>
                  <Comment.Text>{comment.content}</Comment.Text>
                </Comment.Content>
              </Comment></Segment>} else if (props.loggedIn === true )  {
                  return <Segment key={comment.id}><Comment>
                <Comment.Content>
                  <Comment.Author as='a'>{comment.author}: </Comment.Author>
                  <Comment.Text>{comment.content}</Comment.Text>
                </Comment.Content>
              </Comment><button onClick={() => {banContent(comment.id, comment.author, comment.content)}}>Ban</button></Segment>}
            })}
            <CommentForm comments={comments} setComments={setComments} />
        </div>
    )
}
