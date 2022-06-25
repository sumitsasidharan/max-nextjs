import { useRouter } from 'next/router';
import { Fragment } from 'react';
import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventSummary from '../../components/event-detail/event-summary';
import ErrorAlert from '../../components/ui/error-alert';
// import { getEventById } from '../../dummy-data';
import { getEventById, getFeaturedEvents } from '../../helpers/api-util';

function EventDetailPage(props) {
   // const router = useRouter();
   // const eventId = router.query.eventId;
   // const event = getEventById(eventId);

   const event = props.selectedEvent;

   // if (!event) {
   //    return (
   //       <ErrorAlert>
   //          <h1>no event found!</h1>
   //       </ErrorAlert>
   //    );
   // }

   if (!event) {
      return (
         <div className="center">
            <h1>Loading...</h1>
         </div>
      )
   }

   return (
      <Fragment>
         <EventSummary title={event.title} />
         <EventLogistics
            date={event.date}
            address={event.location}
            image={event.image}
            imageAlt={event.title}
         />
         <EventContent>
            <p>{event.description}</p>
         </EventContent>
      </Fragment>
   );
}

export async function getStaticProps(context) {
   const eventId = context.params.eventId

   const event = await getEventById(eventId);

   return {
      props: {
         selectedEvent: event
      },
      revalidate: 30
   }
}

export async function getStaticPaths() {
   const events = await getFeaturedEvents();

   const paths = events.map(event => ({params: {eventId: event.id}}));

   return {
      paths: paths,
      fallback: true  // do prefetch event if the id is not in paths
   }
}

export default EventDetailPage;