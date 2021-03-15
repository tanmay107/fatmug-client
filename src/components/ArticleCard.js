import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';


function ArticleCard({post: { body, title, createdAt, id, username, likeCount, commentCount, likes }}) {

    return (
        <Card fluid >
            <Card.Content header={title} />
            <Card.Content description={body} className="body-content" />
            <Card.Meta as={Link} to={`/posts/${id}`} style={{ marginLeft: "15px" }}>{moment(createdAt).fromNow(true)}</Card.Meta>
            <Card.Content extra>
                <Button as='div' labelPosition='right'>
                    <Button color='blue' basic>
                        <Icon name='heart' />
                        Like
                    </Button>
                    <Label as='a' basic color='blue' pointing='left'>
                        {likeCount}
                    </Label>
                </Button>
                <Button as='div' labelPosition='right'>
                    <Button color='blue' basic>
                        <Icon name='comments' />
                        Comments
                    </Button>
                    <Label as='a' basic color='blue' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
            </Card.Content>
        </Card>
    )
}

export default ArticleCard
