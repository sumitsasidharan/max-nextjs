import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';

import classes from './post-content.module.css';
import PostHeader from './post-header';

// first argument 'javascript' is the identifier used in markdown md file
SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('css', css);

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

      // react-syntax-highlighter for highlighting code
      code(code) {
         const { className, children } = code;
         const language = className.split('-')[1]; // className is something like language-js => We need the "js" part here
         return (
            <SyntaxHighlighter
               style={atomDark}
               language={language}
               children={children}
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
