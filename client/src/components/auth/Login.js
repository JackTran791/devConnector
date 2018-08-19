import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import { withAlert } from "react-alert";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.alert.show("Oh look, an alert!");
      this.props.history.push("/dashboard");
    } else {
      this.props.alert.show("Oh look, an error!");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <div className="card">
                <div className="card-body">
                  <h1 className="display-4 text-center text-dark">
                    <i className="fas fa-lock" /> Log{" "}
                    <span style={{ color: "#eece1a" }}>In</span>
                  </h1>
                  <p className="lead text-center">
                    Sign in to your DevConnector account
                  </p>
                  <form onSubmit={this.onSubmit}>
                    <label htmlFor="email" style={{ fontSize: "13px" }}>
                      Email
                    </label>
                    <TextFieldGroup
                      // placeholder="Email Address"
                      name="email"
                      type="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      error={errors.email}
                    />
                    <label htmlFor="password" style={{ fontSize: "13px" }}>
                      Password
                    </label>
                    <TextFieldGroup
                      // placeholder="Password"
                      name="password"
                      type="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      error={errors.password}
                    />
                    <input
                      type="submit"
                      className="btn btn-dark btn-block mt-4"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withAlert(Login));
