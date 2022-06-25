## Important points to consider

   1) It might be a good idea to use getStaticProps() in the main index page, and use revalidate to update the page every few hours.

   2) On single page type pages like EventId page here, it's better to fetch less or featured events, as the number of pre-fetched events could be in 1000s. So prefetch less data in getStaticPaths() & use fallback: true.