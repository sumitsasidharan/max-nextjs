import { useRef, useState } from 'react';

function HomePage() {
   const [feedbackItems, setFeedbackItems] = useState([
      { id: 101, text: 'another one bites the dust' },
   ]);

   const emailInputRef = useRef();
   const feedbackInputRef = useRef();

   function submitHandler(event) {
      event.preventDefault();

      const enteredEmail = emailInputRef.current.value;
      const enteredFeedback = feedbackInputRef.current.value;

      const reqBody = {
         email: enteredEmail,
         text: enteredFeedback,
      };

      fetch('/api/feedback', {
         method: 'POST',
         body: JSON.stringify(reqBody),
         headers: {
            'Content-Type': 'application/json',
         },
      })
         .then((response) => response.json())
         .then((data) => console.log(data));
   }

   function loadFeedbackHandler() {
      fetch('/api/feedback')
         .then((response) => response.json())
         .then((data) => setFeedbackItems(data.feedback));
   }

   return (
      <div>
         <h1>The Home Page</h1>

         <form onSubmit={submitHandler}>
            <div>
               <label htmlFor="email">your email address</label>
               <input ref={emailInputRef} type="email" id="email" />
            </div>
            <div>
               <label htmlFor="feedback">your feedback</label>
               <textarea
                  ref={feedbackInputRef}
                  name="feedback"
                  id="feedback"
                  rows="5"></textarea>
            </div>

            <button>send feedback</button>
         </form>

         <button onClick={loadFeedbackHandler}>load feedback</button>
         <ul>
            {feedbackItems.map((item) => (
               <li key={item.id}>{item.text}</li>
            ))}
         </ul>
      </div>
   );
}

export default HomePage;
