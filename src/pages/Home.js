import React, { useContext } from 'react'
import { Button, Grid, Header, Transition } from 'semantic-ui-react'
import { useQuery } from '@apollo/client';


import { FETCH_POSTS_QUERY } from '../util/graphql';
import ArticleCard from '../components/ArticleCard';
import { AuthContext } from '../context/auth';
import { Link } from 'react-router-dom';

function Home() {

    const { user } = useContext(AuthContext);
    const { loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS_QUERY);

    return (
        <div>
            <Header as='h1' style={{ textAlign: "center", marginBottom: "15px" }}>Latest Articles</Header>
            <hr /><br /><br />
            <Grid>
                <Grid.Row>
                    {user && (
                        <Grid.Column width={12}>
                            <Button as={Link} to='/postform' color="blue" className="create-post">Create a new Article</Button>
                        </Grid.Column>
                    )}
                    <br /><br />
                    { loading ? (
                        <h1>Loading Articles..</h1>
                    ) : (
                        <Transition.Group>
                            {posts && posts.sort((a,b) => a.likeCount > b.likeCount ? -1 : 1) && posts.map(post => (
                                <Grid.Column key={post.id} width={12}>
                                    <ArticleCard post={post} /><br />
                                </Grid.Column>
                            ))}
                        </Transition.Group>
                    )}
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default Home
