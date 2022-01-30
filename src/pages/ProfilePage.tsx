import * as React from 'react';

import ProfileTemplate from '../components/templates/ProfileTemplate';

import { useSelector } from 'react-redux';
import { RootState } from '../app/_redux/reducers/rootReducer';

const config: { profileData: ProfileData } = {
  profileData: {
    username: 'HSemic',
    dateJoined: '03.11.1991',
    numberOfPosts: '10',
    numberOfComments: '20'
  }
};

const ProfilePage = (): React.ReactElement => {
  const { loggedInUser } = useSelector((state: RootState) => state.user);

  if (!loggedInUser) return <></>;

  return <ProfileTemplate userData={loggedInUser} />;
};

export default ProfilePage;
