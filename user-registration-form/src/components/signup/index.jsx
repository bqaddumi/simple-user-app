import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { addUser } from '../../requestBody';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  successMessage: {
    color: "green"
  },
  errorMessage: {
    color: "red"
  },
  borderErrorColor: {
    borderColor: 'red'
  }
}));

export default function SignUp() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [resMessage, setResMessage] = React.useState('');
  const classes = useStyles();

  const emptyFeilds = firstName === '' || lastName === '' || email === '';

  const resetFeilds = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
  }

  const onSubmitClicked = (e) => {
    e.preventDefault();
    console.log(firstName, lastName, email);
    const requestBody = addUser(firstName, lastName, email);

    !emptyFeilds ?
      fetch('http://localhost:3002/users', {
        method: 'POST',
        body: JSON.stringify({
          "firstName": firstName,
          "lastName": lastName,
          "email": email
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error('Failed!');
          }
          return res.json();
        })
        .then(resData => {
          setResMessage('User is added successfully')
        })
        .catch(err => {
          setResMessage('request error');
          console.log(err);
        }) :
      setResMessage('*Please fill required fields')

    resetFeilds();
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Grid>
          </Grid>
          <Button
            onClick={onSubmitClicked}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
        {<Typography className={resMessage === 'User is added successfully' ? classes.successMessage : classes.errorMessage}> {resMessage}</Typography>}
      </div>
    </Container>
  );
}
