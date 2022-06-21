import path from 'path';
import fs from 'fs/promises';

import { Fragment } from 'react';

function ProductDetail(props) {
   const { loadedProduct } = props;

   // if fallback is 'blocking' in getstaticpaths, then below check isn't needed, nextjs will check if data is loaded/ fetched
   if (!loadedProduct) {
      return <p>Loading...</p>
   }

   return (
      <Fragment>
         <h1>{loadedProduct.title}</h1>
         <p>{loadedProduct.description}</p>
      </Fragment>
   );
}

async function getData() {
   const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
   const jsonData = await fs.readFile(filePath);
   const data = JSON.parse(jsonData);

   return data;
}

export async function getStaticProps(context) {
   const { params } = context;
   const productId = params.pid;

   const data = await getData();

   const product = data.products.find(product => product.id === productId);
   
   return {
      props: {
         loadedProduct: product
      },
   };
}

export async function getStaticPaths() {
   const data = await getData();

   const ids = data.products.map(product => product.id);

   const pathsWithParams = ids.map(id => ({params: { pid: id}}))

   return {
      paths: pathsWithParams
      
      fallback: 'blocking', // true option generates the page in real time when needed
   };
}

export default ProductDetail;
