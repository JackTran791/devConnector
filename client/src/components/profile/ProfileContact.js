import React, { Component } from "react";

class ProfileContact extends Component {
  render() {
    return (
      <div className="container">
        <div className="contact">
          <h3>Email Us</h3>
          <form method="POST" action="send">
            <p>
              <label>Name</label>
              <input type="text" name="name" />
            </p>
            <p>
              <label>Company</label>
              <input type="text" name="company" />
            </p>
            <p>
              <label>Email Address</label>
              <input type="email" name="email" />
            </p>
            <p>
              <label>Phone Number</label>
              <input type="text" name="phone" />
            </p>
            <p className="full">
              <label>Message</label>
              <textarea name="message" rows="5" />
            </p>
            <p className="full">
              <button type="submit">Submit</button>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default ProfileContact;
