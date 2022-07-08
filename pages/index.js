import { Fragment } from 'react';
import Head from 'next/head'

import FeaturedPosts from '../components/home-page/featured-posts';
import Hero from '../components/home-page/hero';
import { getFeaturedPosts } from '../lib/posts-util';

// const DUMMY_POSTS = [
//    {
//       slug: 'getting-started-with-nextjs',
//       title: 'Getting Started with NextJS',
//       image: 'getting-started-nextjs.png',
//       excerpt:
//          'NextJS is a React framework production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR',
//       date: '2022-02-10',
//    },
//    {
//       slug: 'getting-started-with-nextjs2',
//       title: 'Getting Started with NextJS',
//       image: 'getting-started-nextjs.png',
//       excerpt:
//          'NextJS is a React framework production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR',
//       date: '2022-02-10',
//    },
//    {
//       slug: 'getting-started-with-nextjs3',
//       title: 'Getting Started with NextJS',
//       image: 'getting-started-nextjs.png',
//       excerpt:
//          'NextJS is a React framework production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR',
//       date: '2022-02-10',
//    },
//    {
//       slug: 'getting-started-with-nextjs4',
//       title: 'Getting Started with NextJS',
//       image: 'getting-started-nextjs.png',
//       excerpt:
//          'NextJS is a React framework production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR',
//       date: '2022-02-10',
//    },
// ];


function HomePage(props) {
   return (
      <Fragment>
         <Head>
            <title>Sumit's Blog</title>
            <meta name='description' content='I post about programming and web development' />
         </Head>
         <Hero />
         <FeaturedPosts posts={props.posts} />
      </Fragment>
   );
}

export function getStaticProps() {
   const featuredPosts = getFeaturedPosts()

   return {
      props: {
         posts: featuredPosts
      },
      revalidate: 10
   }
}

export default HomePage;
