import path from 'path';
import fs from 'fs/promises';

function HomePage(props) {
   const { products } = props;

  return (
    <ul>
      { products.map(product => <li key={product.id}>{product.title}</li>)}
    </ul>
  );
}

export async function getStaticProps() {
   console.log(process.cwd())
   const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
   const jsonData = await fs.readFile(filePath);
   const data = JSON.parse(jsonData);

   // REDIRECT IF NO DATA
   if (!data) {
      return {
         redirect: {
            destination: '/no-data'
         }
      }
   }

   if (data.products.length === 0) {
      return { notFound: true}
   }

   return {
      props: {
         products: data.products
      },
      revalidate: 10,
      
   }
}

export default HomePage;
