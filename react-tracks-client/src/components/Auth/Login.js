import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import VerifiedUserTwoTone from "@material-ui/icons/VerifiedUserTwoTone";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Lock from "@material-ui/icons/Lock";
import { Mutation } from "react-apollo";
import Error from "../Shared/Error";
import { DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import gql from "graphql-tag";
// import { ApolloClient } from "apollo-boost";



const Login = ({ classes, setNewUser }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event, tokenAuth, client) => {
    console.log(typeof tokenAuth);

    event.preventDefault();
    const ret = await tokenAuth();
    localStorage.setItem('authToken', ret.data.tokenAuth.token);
    client.writeData({ data: { isLoggedIn: true } });
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Lock />
        </Avatar>
        <Typography variant="title">
          Log in as existing user
        </Typography>
        <Mutation mutation={LOGIN_MUTATION}
          variables={{ username, password }}
          onCompleted={data => {
            console.log(data);
          }}>
          {
            (tokenAuth, { loading, error, called, client }) => {
              return (
                <form onSubmit={event => handleSubmit(event, tokenAuth, client)} className={classes.form}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input id="username" onChange={event => setUsername(event.target.value)}></Input>
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input id="password" type="password" onChange={event => setPassword(event.target.value)}></Input>
                  </FormControl>
                  <Button type="submit" classes={classes.submit} disabled={loading || !username.trim() || !password.trim()} fullWidth variant="contained" color="primary">{loading ? "Log in .." : "Logged in"}</Button>
                  <Button onClick={() => setNewUser(true)} type="submit" fullWidth variant="outlined" color="secondary">Register</Button>

                  {error && <Error error={error}></Error>}

                </form>
              )
            }
          }
        </Mutation>
      </Paper>
    </div>
  )
};

const LOGIN_MUTATION = gql`
mutation ($username: String!, $password: String!) {
  tokenAuth(username: $username, password: $password) {
    token
  }
}  
`

const styles = theme => ({
  root: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up("md")]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing.unit * 2
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.secondary.main
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(Login);
