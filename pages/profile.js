import { getSession } from 'next-auth/react';

import UserProfile from '../components/profile/user-profile';

function ProfilePage() {
   // this  page and the UserProfile component will only be rendered if user is authenticated.
   return <UserProfile />;
}

export async function getServerSideProps(context) {
   // if user is authenticated, session wont be null
   const session = await getSession({ req: context.req});

   // no or null session means not authenticated
   if (!session) {
      return {
         redirect: {
            destination: '/auth',
            permanent: false // temporary redirect bcos user is not  logged in this time
         }
      }
   }

   return {
      props: { session }
   }
}

export default ProfilePage;