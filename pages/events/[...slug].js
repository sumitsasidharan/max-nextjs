import { useRouter } from 'next/router';
import { Fragment } from 'react';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import { getFilteredEvents } from '../../dummy-data';

function FilteredEventsPage() {
   const router = useRouter();

   const filterData = router.query.slug;

   // THE COMPONENT IS RENDERED TWICE, SO CHECKING IF FILTERDATA IS UNDEFINED OR FALSY
   if (!filterData) {
      return <p className="center">Loading...</p>;
   }

   // WHEN COMPONENT IS RENDERED FOR THE 2ND TIME
   const filteredYear = filterData[0];
   const filteredMonth = filterData[1];

   const numYear = +filteredYear;
   const numMonth = +filteredMonth;

   //  IN CASE YEAR OR MONTH AREN'T NUMBERS
   if (
      isNaN(numYear) ||
      isNaN(numMonth) ||
      numYear > 2030 ||
      numYear < 2022 ||
      numMonth < 1 ||
      numMonth > 12
   ) {
      return (
         <Fragment>
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

   const filteredEvents = getFilteredEvents({
      year: numYear,
      month: numMonth,
   });

   // CHECK IF filteredEvents IS AN EMPTY ARRAY OR UNDEFINED
   if (!filteredEvents || filteredEvents.length === 0) {
      return (
         <Fragment>
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

   const date = new Date(numYear, numMonth - 1);

   return (
      <Fragment>
         <ResultsTitle date={date} />
         <EventList items={filteredEvents} />
      </Fragment>
   );
}

export default FilteredEventsPage;
