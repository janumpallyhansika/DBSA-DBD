import {
  User,
  Mail,
  MapPin,
  Shield,
} from 'lucide-react';

import './Profile.css';

function Profile() {
  return (
    <div className="page-inner profile-page">

      <div className="profile-heading">
        <span>ACCOUNT</span>
        <h1>Profile & Settings</h1>
        <p>
          Manage your account and travel preferences.
        </p>
      </div>

      <div className="profile-layout">

        <div className="profile-card card">

          <div className="large-avatar">
            H
          </div>

          <h2>Hansika</h2>

          <p>Traveler</p>

          <button className="secondary-button">
            Edit Profile
          </button>

        </div>

        <div className="settings-card card">

          <h3>Personal Information</h3>

          <div className="profile-field">
            <User size={17} />
            <div>
              <span>Name</span>
              <strong>Hansika</strong>
            </div>
          </div>

          <div className="profile-field">
            <Mail size={17} />
            <div>
              <span>Email</span>
              <strong>traveler@example.com</strong>
            </div>
          </div>

          <div className="profile-field">
            <MapPin size={17} />
            <div>
              <span>Starting Location</span>
              <strong>Hyderabad, India</strong>
            </div>
          </div>

          <div className="profile-field">
            <Shield size={17} />
            <div>
              <span>Authentication</span>
              <strong>Email & Google</strong>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;