import Head from 'next/head';
import EventList from '../components/events/event-list';
// import { getFeaturedEvents } from '../dummy-data';
import { getFeaturedEvents } from '../helpers/api-util';

function HomePage(props) {
   // const featuredEvents = getFeaturedEvents();   

  return (
     <div>
      <Head>
         <title>NextJS Events</title>
         <meta name='description' content='find great events' />
      </Head>
        <EventList items={props.events} />
     </div>
  );
}

export async function getStaticProps() {
   const featuredEvents = await getFeaturedEvents();

   return {
      props: {
         events: featuredEvents
      },
      revalidate: 1800
   }
}

export default HomePage