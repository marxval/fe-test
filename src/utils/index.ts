import { QueryResponse } from "../types";

export const filterHitsFromResponse = (data: QueryResponse) => {
    const filteredHits = data.hits.filter((item) => {
      const { author, story_title, story_url, created_at, objectID } = item;
      const isValid = author && story_title && story_url && created_at && objectID;
      return isValid;
    })
    const reducedHits = filteredHits.map(({ author, story_title, story_url, created_at, objectID }) =>
      ({ author, story_title, story_url, created_at, objectID }))
  
    return { ...data, hits: reducedHits };
};