import { Fragment, useState } from 'react';
import { buildFeedbackPath, extractFeedback } from '../api/feedback';

function FeedbackPage(props) {
   const [feedbackData, setFeedbackData] = useState();

   function loadFeedbackHandler(id) {
      fetch('/api/feedback/' + id)
         .then((response) => response.json())
         .then((data) => setFeedbackData(data.feedback));
   }

   return (
      <Fragment>
         {feedbackData && <p>{feedbackData.email}</p>}
         <ul>
            {props.feedbackItems.map((item) => (
               <li key={item.id}>
                  {item.text}
                  <button onClick={loadFeedbackHandler.bind(null, item.id)}>
                     show details
                  </button>
               </li>
            ))}
         </ul>
      </Fragment>
   );
}

// since we're getting data from our own or the same server, there's no need to 'fetch' the data using http requests, just get the data directly, which would be faster and efficient.
export async function getStaticProps() {
   const filePath = buildFeedbackPath();
   const data = extractFeedback(filePath);

   return {
      props: {
         feedbackItems: data,
      },
   };
}

export default FeedbackPage;
