import gql from 'graphql-tag';
import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Form } from 'semantic-ui-react';

import { useForm } from '../util/hooks';
import { AuthContext } from '../context/auth';

function Login(props) {
    const context = useContext(AuthContext);
    const [errors, setError] = useState({});

    const { onSubmit, onChange, values } = useForm(loginUserCallback, {
        username: '',
        password: ''
    });
    
    const[loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData }}){
            context.login(userData);
            console.log(userData);
            props.history.push('/');
        },
        onError(err){
            setError(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    })

    function loginUserCallback() {
        loginUser();
    };

    
    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''} style={{ width: "400px", margin: "auto" }}>
                <h1>Login</h1>
                <Form.Input 
                    label="Username"
                    placeholder="Username.."
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                />
                <Form.Input 
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Login
                </Button>
            </Form>
           {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(value => (
                            <li key = {value} >{value}</li>
                        ))}
                    </ul>
                </div>
           )}
        </div>
    )
}

const LOGIN_USER = gql`
  mutation login(
    $username: String!
    $password: String!
  ) {
    login(
        username: $username password: $password
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;


export default Login;
