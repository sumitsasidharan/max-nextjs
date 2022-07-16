import { useRef } from 'react';
import classes from './profile-form.module.css';

function ProfileForm(props) {
   const oldPasswordRef = useRef();
   const newPasswordRef = useRef();
   

   function handlePasswordSubmit(event) {
      event.preventDefault();

      const entereredOldPassword = oldPasswordRef.current.value;
      const entereredNewPassword = newPasswordRef.current.value;

      // add validation

      props.onChangePassword({
         oldPassword: entereredOldPassword,
         newPassword: entereredNewPassword
      });
   }

  return (
     <form className={classes.form} onSubmit={handlePasswordSubmit}>
        <div className={classes.control}>
           <label htmlFor="new-password">New Password</label>
           <input ref={oldPasswordRef} type="password" id="new-password" />
        </div>
        <div className={classes.control}>
           <label htmlFor="old-password">Old Password</label>
           <input ref={newPasswordRef} type="password" id="old-password" />
        </div>
        <div className={classes.action}>
           <button>Change Password</button>
        </div>
     </form>
  );
}

export default ProfileForm;
