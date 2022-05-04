export default function Meta(post, disableImage) {
  const author = post?.extra?.author || "Urbit";
  const title = post?.title ? `${post.title} - ` : "";
  const description =
    post?.description || "Urbit is a personal server built from scratch.";
  const image =
    post?.extra?.image || "https://media.urbit.org/logo/urbit-logo-card.png";
  return (
    <>
      <link rel="icon" type="image/png" href="/images/favicon.ico" />
      <meta
        name="twitter:card"
        content="summary_large_image"
        key="twitter-card"
      />
      <meta name="twitter:site" content="@urbit" key="twitter-site" />
      <meta name="twitter:creator" content="@urbit" key="twitter-creator" />
      <meta name="og:title" content={`${title}urbit.org`} key="title" />
      <meta name="og:description" content={description} key="description" />
      <meta name="description" content={description} />
      <meta name="author" content={author} key="author" />
      {!disableImage && (
        <meta name="twitter:image" content={image} key="image" />
      )}
      <link
        rel="alternative"
        type="application/rss+xml"
        title="RSS"
        href="/rss.xml"
      />
    </>
  );
}
