import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import KFAccountInput from '../KFAccountInput';
import { loginUser } from '../../common/actions/authActions';
import { connect } from 'react-redux';
import { compose } from "redux";

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  underlineStyle: {
    color: 'gray',
    textDecoration: 'underline'
  },
  buttonStyle: {
    flex: 1,// extend as much as it can
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  },
  loginTitle: {
    fontSize: '42px',
    fontWeight: 'normal',
    color: '#424242',
    marginTop: '40px'
},
  loginBtn: {
      width: '200px',
      height: '44px',
      fontSize: '15px',
      fontWeight: 'normal',
      marginTop: '20px',
      letterSpacing: '1px'
  },
  newHere: {
    color: 'gray', 
    textDecoration: 'underline', 
    marginTop: '10px'
  }
});

/**
 * Log in with email and password.
 * Support ENTER key in password box.
 */
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }
  /**
   if the user has already logged in, redirect to home page.
   */
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
    // TODO: HUD hint
  }

  /**
   *  @todo: how to use 'this' in getDerivedStateFromProps
   // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.auth.isAuthenticated) {
  //     props.history.push('/welcome');
  //   }

  //   if (nextProps.errors) {
  //     return{ errors: nextProps.errors };
  //   }
  // }
   * @param nextProps
   * @param nextState
   */
  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit(e) {
    e.preventDefault();
    const userData = {
			email: this.state.email,
			password: this.state.password,
		};
    this.props.loginUser(userData);
  };

  handleEnter(e) {
    if(e.keyCode === 13) {
      this.handleSubmit(e)
    }
  };

  render() {
    const { email, password, errors } = this.state;
    const { classes } = this.props;

      return (
        <div className={classes.container} style={{minHeight:'360px'}}>
          <h1 className={classes.loginTitle}>Log in</h1>

          <KFAccountInput
            name={"Email"}
            className={classes.formControl}
                   error={errors.email}
                   id={"email"}
                   value={email}
                   type={"email"}
                   onChange={this.handleChange}
          />

          <KFAccountInput
            name={"Password"}
            className={classes.formControl}
            error={errors.password}
            id={"password"}
            value={password}
            type={"password"}
            onChange={this.handleChange}
            onKeyDown={this.handleEnter}
          />

          <Button 
          className={classes.loginBtn}
          variant="contained" 
          color="primary" 
          onClick={this.handleSubmit}>
          Sign in
          </Button>
          <a href="/register"><div className={classes.newHere}>New here?</div></a>
        </div>
      )
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { loginUser }),
)(LoginForm);