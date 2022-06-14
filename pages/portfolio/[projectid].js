import { useRouter} from 'next/router';

function PortfolioProjectPage() {
   const router = useRouter();

   console.log(router.pathname)
   console.log(router.asPath)
   console.log(router.query)
   
  return (
     <div>
        <h2>PortfolioProjectPage</h2>
        
     </div>
  );
}

export default PortfolioProjectPage