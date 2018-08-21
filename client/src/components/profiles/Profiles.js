import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profileActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Profiles extends React.Component {
  state = {
    searchName: "",
    searchLocation: ""
  };

  componentDidMount() {
    this.props.getProfiles();
  }

  onChangeHandler = e => {
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
        const { searchName, searchLocation } = this.state;

        // Searching function
        profileItems = profiles.filter(
          profile =>
            profile.handle.toLowerCase().indexOf(searchName.toLowerCase()) !==
              -1 &&
            profile.location
              .toLowerCase()
              .indexOf(searchLocation.toLocaleLowerCase()) !== -1
        );

        // Loading data function
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
              <div className="row">
                <div className="col">
                  {/* <i className="fa fa-search" /> */}
                  <TextFieldGroup
                    placeholder="Enter name of a developer that you are looking..."
                    name="searchName"
                    type="text"
                    value={this.state.searchName}
                    onChange={this.onChangeHandler}
                  />
                </div>
                <div className="col">
                  <TextFieldGroup
                    placeholder="Enter location..."
                    name="searchLocation"
                    type="text"
                    value={this.state.searchLocation}
                    onChange={this.onChangeHandler}
                  />
                </div>
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
