import { getSession } from 'next-auth/react';

import UserProfile from '../components/profile/user-profile';

function ProfilePage() {
   return <UserProfile />;
}

export async function getServerSideProps(context) {
   // if user is authenticated, session wont be null
   const session = await getSession({ req: context.req});


}

export default ProfilePage;
// 229 , 3.40