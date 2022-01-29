import * as React from 'react';

import ProfileTemplate from '../components/templates/ProfileTemplate';

const config: { profileData: ProfileData } = {
  profileData: {
    username: 'HSemic',
    dateJoined: '03.11.1991',
    numberOfPosts: '10',
    numberOfComments: '20'
  }
};

const ProfilePage = (): React.ReactElement => {
  return <ProfileTemplate {...config.profileData} />;
};

export default ProfilePage;
