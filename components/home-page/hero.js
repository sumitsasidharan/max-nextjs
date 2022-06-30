import Image from 'next/image';
import classes from './hero.module.css';

function Hero() {
   return (
      <section className={classes.hero}>
         <div className={classes.image}>
            <Image
               src="/images/site/profile.jpg"
               alt="an image showing sumit"
               width={300}
               height={300}
            />
         </div>

         <h1>Hi, I'am Sumit</h1>
         <p>
            I blog about frontend web development tools like reactjs, nexxtjs,
            javascript, etc.
         </p>
      </section>
   );
}

export default Hero;
