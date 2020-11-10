import React, {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom';
import { Dimmer, Image, Loader, Segment, Header } from 'semantic-ui-react';
import CommentForm from './CommentForm';
import Comments from './Comments';
// import textImage from '../'

export default function PostDetail(props) {
    const [post, setPost ] = useState(null);
    const { postId } = useParams();
    
    useEffect(() => {
        fetch(`/api/v1/posts/${postId}`)
        .then(res => res.json())
        .then(data => {
            setPost(data);
        })    
    }, [postId])

    if (post == null) {
        return (
            <Segment>
                <Dimmer active>
                    <Loader>Loading</Loader>
                </Dimmer>
                {/* <Image src={textImage}></Image> */}
            </Segment>
        )
    }

    return (
        <div>
            <Segment>
              <Header as="h2">{ post.title }</Header>
              <Header size='small'>{ post.author }</Header>

              <p>{ post.content } </p>
              <Comments loggedIn={props.loggedIn}/>
              
            </Segment>
        </div>
    )
}
