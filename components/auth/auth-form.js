import { useState, useRef } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

import classes from './auth-form.module.css';

async function createUser(email, password) {
   const response = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password}),
      headers: {
         'Content-Type': 'application/json'
      }
   });

   const data = await response.json();

   if (!response.ok) {
      throw new Error(data.message || 'Something went wrong!');
   }
}

function AuthForm() {
   const emailInputRef = useRef();
   const passwordInputRef = useRef();

   // for existing user, just log user in
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
     event.preventDefault();

     const enteredEmail = emailInputRef.current.value;
     const enteredPassword = passwordInputRef.current.value;

     // Add validation here

     if (isLogin) {
        // log user in, signin is an async func when redirect obj is passed
        const result = await signIn('credentials', {
           redirect: false,
           email: enteredEmail,
           password: enteredPassword
        });

      // success if error is null, if no error route to profile
      if (!result.error) {
         // set some auth state
         // window.location.href will cause to lose all state
         router.replace('/profile')
      }

     } else {
        // create new user
        try {
           const result = await createUser(enteredEmail, enteredPassword);
           console.log(result);
        } catch (error) {
           console.log(error);
        }
     }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>

      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input ref={emailInputRef} type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input ref={passwordInputRef} type='password' id='password' required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;