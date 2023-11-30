import getUser from '@/app/actions/getUser';
import EditProfilePage from './_components/EditProfilePage';

const EditProfile = async () => {
  const user = await getUser();

  return (
    <>
      <EditProfilePage user={user!} />
    </>
  );
};

export default EditProfile;
