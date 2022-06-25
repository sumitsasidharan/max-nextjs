import { useEffect, useState } from 'react';
import useSWR from 'swr';

function LastSalesPage(props) {
   const [users, setUsers] = useState(props.users);
   // const [isLoading, setIsLoading] = useState(false);

   const url = 'https://jsonplaceholder.typicode.com/users';

   // SERVER + CLIENT SIDE RENDERING
   const { data, error } = useSWR(url, (url) =>
      fetch(url).then((res) => res.json())
   );

   console.log(data);
   useEffect(() => {
      if (data) {
         setUsers(data);
      }
   }, [data]);

   // useEffect(() => {
   //    setIsLoading(true);
   //    fetch('https://jsonplaceholder.typicode.com/users')
   //       .then((response) => response.json())
   //       .then((data) => {
   //          setUsers(data);
   //          setIsLoading(false);
   //       });
   // }, []);

   // iterating through an object
   // const transformedSales = []
   // for (const key in data) {
   //    transformedSales.push({id: key, username: data[key].username})
   // }

   // if (isLoading) {
   //    return <h1>Loading...</h1>;
   // }

   // if (!users) {
   //    return <h1>Still Loading.......</h1>;
   // }

   if (error) {
      return <h1>failed to load...</h1>;
   }

   if (!data || !users) {
      return <h1>Loading...</h1>;
   }

   return (
      <ul>
         {users.map((user) => (
            <li key={user.id}>
               <h2>{user.name}</h2>
               <p>{user.website}</p>
               <p>{user.email}</p>
               <p>{user.url}</p>
            </li>
         ))}
      </ul>
   );
}

export async function getStaticProps() {
   const response = await fetch('https://jsonplaceholder.typicode.com/users');
   const data = await response.json();
         
   return {
      props: {
         users: data
      },
      revalidate: 10
   }
}

export default LastSalesPage;
