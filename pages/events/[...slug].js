import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import useSWR from 'swr';
import Head from 'next/head';

import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
// import { getFilteredEvents } from '../../dummy-data';
import { getFilteredEvents } from '../../helpers/api-util';

function FilteredEventsPage(props) {
   const [loadedEvents, setLoadedEvents] = useState();
   const router = useRouter();

   const filterData = router.query.slug;

   const { data, error } = useSWR(
      'https://nextjs-max-events-default-rtdb.asia-southeast1.firebasedatabase.app/events.json'
   );

   useEffect(() => {
      if (data) {
         const events = [];

         for (const key in data) {
            events.push({
               id: key,
               ...data[key],
            });
         }

         setLoadedEvents(events);
      }
   }, [data]);

   const pageHeadData = (
      <Head>
         <title>Filtered Events</title>
         <meta
            name="description"
            content={`a list of filtered events.`}
         />
      </Head>
   );
   
   // THE COMPONENT IS RENDERED TWICE, SO CHECKING IF FILTERDATA IS UNDEFINED OR FALSY AT FIRST RENDER
   if (!loadedEvents) {
      return (
         <Fragment>
            {pageHeadData}
            <p className="center">Loading...</p>;
         </Fragment>
      );
   }

   // WHEN COMPONENT IS RENDERED FOR THE 2ND TIME
   const filteredYear = filterData[0];
   const filteredMonth = filterData[1];

   const numYear = +filteredYear;
   const numMonth = +filteredMonth;

   pageHeadData = (
      <Head>
         <title>Filtered Events</title>
         <meta
            name="description"
            content={`all events for ${numMonth}/${numYear}`}
         />
      </Head>
   );

   //  IN CASE YEAR OR MONTH AREN'T NUMBERS
   if (props.hasError) {
      return (
         <Fragment>
            {pageHeadData}
            <ErrorAlert>
               <h2 className="center">
                  Invalid filter. Please adjust your values!
               </h2>
            </ErrorAlert>
            <div className="center">
               <Button link="/events">show all events</Button>
            </div>
         </Fragment>
      );
   }

   const filteredEvents = props.events;

   // CHECK IF filteredEvents IS AN EMPTY ARRAY OR UNDEFINED
   if (!filteredEvents || filteredEvents.length === 0) {
      return (
         <Fragment>
            {pageHeadData}
            <ErrorAlert>
               <h1 className="center">
                  No events found for the chosen filter!
               </h1>
            </ErrorAlert>
            <div className="center">
               <Button link="/events">show all events</Button>
            </div>
         </Fragment>
      );
   }

   const date = new Date(props.date.year, props.date.month - 1);

   return (
      <Fragment>
         {pageHeadData}

         <ResultsTitle date={date} />
         <EventList items={filteredEvents} />
      </Fragment>
   );
}

export async function getStaticProps(context) {
   const { params } = context;
   const filterData = params.slug;

   const filteredYear = filterData[0];
   const filteredMonth = filterData[1];

   const numYear = +filteredYear;
   const numMonth = +filteredMonth;

   //  IN CASE YEAR OR MONTH AREN'T NUMBERS
   // ERROR HANDLING ON SERVER SIDE
   if (
      isNaN(numYear) ||
      isNaN(numMonth) ||
      numYear > 2030 ||
      numYear < 2022 ||
      numMonth < 1 ||
      numMonth > 12
   ) {
      return {
         props: { hasError: true },
         // notFound: true, // 404 page
         // redirect: {
         //    destination: '/error'
         // }
      };
   }

   const filteredEvents = await getFilteredEvents({
      year: numYear,
      month: numMonth,
   });

   return {
      props: {
         events: filteredEvents,
         date: {
            year: numYear,
            month: numMonth,
         },
      },
   };
}

export default FilteredEventsPage;
