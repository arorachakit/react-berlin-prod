import Head from "next/head";
// import styles from "../styles/Home.module.css";

import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";
import Layout from "../components/Layout";

export default function Home({ story, preview }) {
  story = useStoryblokState(story, {
    resolveRelations: ["popular-articles.articles"],
  }, preview);

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <header>
        <h1>{story ? story.name : "My Site"}</h1>
      </header> */}
      <Layout>
        <StoryblokComponent blok={story.content} />
      </Layout>
    </div>
  );
}

export async function getStaticProps({preview}) {
  let slug = "home";

  let sbParams = {
    version: "draft", // or 'published',
    resolve_relations: ["popular-articles.articles"],
  };

  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
      preview: preview || false
    },
    revalidate: 3600,
  };
}
