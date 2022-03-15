import React from 'react';
import {
  Card,
  Col,
  Form,
  Input
} from 'reactstrap';

const Comment = ({author, timestamp, text}) => (
  <>
    <div>
      <span className="comment-author">{author}</span>
      <span className="text-sm">{timestamp}</span>
    </div>
    <Card className="comment custom-shadow">
      <Col>
        <p>{text}</p>
      </Col>
    </Card>
  </>
)

const Comments = ({comments}) => {
  return (
    <Col className="comments-container">
      <div className="info-heading">
        Comments
      </div>
      <div className="comments">
        {comments.map(comment => (
          <Comment {...comment} key={comment.id}/>
        ))}
      </div>
      <Form>
        <Input
          className="form-control-alternative"
          rows="2"
          type="textarea"
          resize="none"
          placeholder="Leave a comment..."
        />
        <button className="btn btn-primary comment-btn">Comment</button>
      </Form>
    </Col>
  )
}

export default Comments;