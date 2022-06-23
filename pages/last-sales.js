import { useEffect, useState } from 'react';

function LastSalesPage() {
   const [users, setUsers] = useState();
   const [isLoading, setIsLoading] = useState(false);
   console.log(users);
   useEffect(() => {
      setIsLoading(true);
      fetch('https://jsonplaceholder.typicode.com/users')
         .then((response) => response.json())
         .then((data) => {
            setUsers(data);
            setIsLoading(false);
         });
   }, []);

   // iterating through an object
   // const transformedSales = []
   // for (const key in data) {
   //    transformedSales.push({id: key, username: data[key].username})
   // }

   if (isLoading) {
      return <h1>Loading...</h1>;
   }

   if (!users) {
      return <h1>Still Loading.......</h1>;
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

export default LastSalesPage;
