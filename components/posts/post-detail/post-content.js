import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

import classes from './post-content.module.css';
import PostHeader from './post-header';

const DUMMY_POST = {
   slug: 'getting-started-with-nextjs',
   title: 'Getting Started with NextJS',
   image: 'getting-started-nextjs.png',
   date: '2022-02-10',
   content: '# This is a first post',
};

function PostContent(props) {
   const { post } = props;

   const imagePath = `/images/posts/${post.slug}/${post.image}`;

   const customComponents = {
      img(image) {
         return (
            <Image
               src={`/images/posts/${post.slug}/${image.src}`}
               alt={image.alt}
               width={600}
               height={300}
            />
         );
      },
   };

   return (
      <article className={classes.content}>
         <PostHeader title={post.title} image={imagePath} />
         <ReactMarkdown components={customComponents}>
            {post.content}
         </ReactMarkdown>
      </article>
   );
}

export default PostContent;
