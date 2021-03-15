import React, { useContext } from 'react';
import { Button, Card, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import MyPopup from '../util/MyPopup';

function ArticleCard({post: { body, title, createdAt, id, username, likeCount, commentCount, likes }}) {

    const { user } = useContext(AuthContext);

    return (
        <Card fluid >
            <Card.Content header={title} />
            <Card.Content description={body} className="body-content" />
            <Card.Meta as={Link} to={`/posts/${id}`} style={{ marginLeft: "15px" }}>{moment(createdAt).fromNow(true)}</Card.Meta>
            <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <MyPopup content='Comment on post'>
                    <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
                        <Button color='blue' basic>
                            <Icon name='comments' />
                        </Button>
                        <Label basic color='blue' pointing='left'>
                            {commentCount}
                        </Label>
                    </Button>
                </MyPopup>    
                {user && user.username === username && <DeleteButton postId={id} />}
            </Card.Content>
        </Card>
    )
}

export default ArticleCard
