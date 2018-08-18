import React from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Landing extends React.Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div
            className="container"
            style={{
              position: "fixed",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            }}
          >
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">
                  <span
                    style={{
                      color: "#eece1a",
                      letterSpacing: "0.1rem"
                    }}
                  >
                    Devs
                  </span>{" "}
                  Social Networking
                </h1>
                <p className="lead">
                  {" "}
                  Create a developer profile/portfolio, share posts and get help
                  from other{" "}
                  <span style={{ color: "#eece1a" }}>developers</span>
                </p>
                <hr />
                <Link
                  to="/register"
                  className="btn btn-lg btn-warning mr-2"
                  style={{ width: "125px" }}
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="btn btn-lg btn-light"
                  style={{ width: "125px" }}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
