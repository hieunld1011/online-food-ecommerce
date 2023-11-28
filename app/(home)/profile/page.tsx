import getUser from '@/app/actions/getUser';
import ProfilePage from './_components/ProfilePage';

const Profile = async () => {
  const user = await getUser();

  return (
    <>
      <ProfilePage user={user!} />
    </>
  );
};

export default Profile;
