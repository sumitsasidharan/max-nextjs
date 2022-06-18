import { useRouter } from 'next/router';
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
         <h2 className="center">Invalid filter. Please adjust your values!</h2>
      );
   }

   const filteredEvents = getFilteredEvents({
      year: numYear,
      month: numMonth,
   });

   // CHECK IF filteredEvents IS AN EMPTY ARRAY OR UNDEFINED
   if (!filteredEvents || filteredEvents.length === 0) {
      return <h1 className="center">No events found for the chosen filter!</h1>
   }

   return (
      <div>
         <h1>filtered events page</h1>
      </div>
   );
}

export default FilteredEventsPage;
