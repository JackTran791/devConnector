import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profileActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Profiles extends React.Component {
  state = {
    search: ""
  };

  componentDidMount() {
    this.props.getProfiles();
  }

  onChangeSearchHandler = e => {
    this.setState({
      [e.target.name]: e.target.value.substr(0, 20)
    });
  };

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        const { search } = this.state;
        console.log(search);

        profileItems = profiles.filter(
          profile =>
            profile.handle.toLowerCase().indexOf(search.toLowerCase()) !== -1
        );

        profileItems = profileItems.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">
                Developer <span style={{ color: "#eece1a" }}>Profiles</span>
              </h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              <div>
                {/* <i className="fa fa-search" /> */}
                <TextFieldGroup
                  placeholder="Enter name of a developer that you are looking..."
                  name="search"
                  type="text"
                  value={this.state.search}
                  onChange={this.onChangeSearchHandler}
                  style={{
                    width: "500px"
                  }}
                />
              </div>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
