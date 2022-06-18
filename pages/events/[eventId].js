import { useRouter } from 'next/router';
import { getEventById } from '../../dummy-data';

function EventDetailPage() {
   const router = useRouter();
   
   const eventId = router.query.eventId;
   const event = getEventById(eventId);

   if (!event) {
      return (
         <h1>no event found!</h1>
      )
   }

   return (
      <div>
         <h1>Event Detail Page</h1>
         
      </div>
   );
}

export default EventDetailPage;