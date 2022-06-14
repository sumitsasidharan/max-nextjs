import Link from 'next/link';

function ClientsPage() {
   const clients = [
      {id: 'sumit', name: 'sumit sasidharan'},
      {id: 'ponnu', name: 'ponnu jalan'},
      {id: 'jessica', name: 'jessica nair'},
   ]
  return (
     <div>
        <h1>The Clients Page</h1>
        <ul>
         {clients.map(client => {
            return (
               <li key={client.id}>
                  <Link href={`/clients/${client.id}`}>{client.name}</Link>
               </li>
            );
         })}
        </ul>
     </div>
  );
}

export default ClientsPage;