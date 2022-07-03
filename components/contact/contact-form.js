import classes from './contact-form.module.css';

import React from 'react'

function ContactForm() {
  return (
     <section className={classes.form}>
        <h1>How can I help you?</h1>

        <form className={classes.contact}>
           <div className={classes.controls}>
              <div className={classes.control}>
                 <label htmlFor="email">Your Email</label>
                 <input type="email" id="email" required />
              </div>
              <div className={classes.control}>
                 <label htmlFor="name">Your Name</label>
                 <input type="text" id="name" required />
              </div>
           </div>

           <div className={classes.control}>
              <label htmlFor="message">Your Message</label>
              <textarea id="message" rows="5"></textarea>
           </div>

           <div className={classes.actions}>
            <button>send message</button>
           </div>
        </form>
     </section>
  );
}

export default ContactForm