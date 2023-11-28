import getUser from '@/app/actions/getUser';
import EditProfilePage from './_components/EditProfilePage';
import bcrypt from 'bcrypt';

const EditProfile = async () => {
  const user = await getUser();

  return (
    <>
      <EditProfilePage user={user!} />
    </>
  );
};

export default EditProfile;
