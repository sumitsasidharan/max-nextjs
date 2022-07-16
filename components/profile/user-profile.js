// import { useSession, getSession } from 'next-auth/react';
// import { useEffect, useState } from 'react';

import ProfileForm from './profile-form';
import classes from './user-profile.module.css';

function UserProfile() {
   const [isLoading, setIsLoading] = useState(true);
   const [loadedSession, setLoadedSession] = useState();

   // const { data: session, status } = useSession();

   // useEffect(() => {
   //    getSession().then((session) => {
         
   //       if (!session) {
   //          window.location.href = '/auth';
   //       } else {
   //          // if we do have a sessin, set Loading to false
   //          setIsLoading(false);
   //       }
   //    });
   // }, []);

   // if (status === 'loading') {
   //    return <h1>Loading...</h1>
   // }
   // if (isLoading) {
   //    return <h1>Loading...</h1>;
   // }

   async function changePasswordHandler(passwordData) {
      const response = await fetch('/api/user/change-password', {
         method: 'PATCH',
         body: JSON.stringify(passwordData),
         headers: {
            'Content-Type': 'application/json'
         }
      })

      const data = await response.json();
   }

   return (
      <section className={classes.profile}>
         <h1>Your User Profile</h1>
         <ProfileForm onChangePassword={changePasswordHandler} />
      </section>
   );
}

export default UserProfile;
