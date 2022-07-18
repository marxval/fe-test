import { HITS_PER_PAGE } from "../constants";
import { HitsArray, HitType, QueryResponse } from "../types";

/**
* Filter Data from API response and reduce info about each data item (Hit)  
*/
export function filterHitsFromResponse(data: QueryResponse):QueryResponse {
    const filteredHits = data.hits.filter((item) => {
      const { author, story_title, story_url, created_at, objectID } = item;
      const isValid = author && story_title && story_url && created_at && objectID;
      return isValid;
    })
    const reducedHits = filteredHits.map(({ author, story_title, story_url, created_at, objectID }) =>
      ({ author, story_title, story_url, created_at, objectID }))
  
    return { ...data, hits: reducedHits };
};

/**
* Return difference in minutes/hours/days between two dates
*/
export function diffDates(dt2: Date, dt1: Date):string {
  let minutesAgo = (dt2.getTime() - dt1.getTime()) / 1000;
  minutesAgo /= (60);
  minutesAgo = Math.abs(Math.round(minutesAgo));

  if (minutesAgo >= 60) {
      const hoursAgo = Math.round(minutesAgo / 24);
      if (hoursAgo >= 24) {
          const diffDays = Math.round(hoursAgo / 24);
          return getTimeString(diffDays, 'day');
      } else {
          return getTimeString(hoursAgo, 'hour');
      }
  } else {
      return getTimeString(minutesAgo, 'minute');
  }
}

/**
* Return string in plural or singular for time units
*/
function getTimeString(time: number, unit: string) :string {
  return `${time} ${unit}${time === 1 ? '' : 's'} ago`
}

/**
* Get list of favs sorted by date and current page
*/
export function getHitsForFav(favsList: HitsArray, pageFavs: number){
  const sortedList = favsList.sort((a: HitType, b: HitType) => {
    return (new Date(a.created_at) < new Date(b.created_at)) ? 1 : -1;
  })
  const initalIndex = pageFavs * HITS_PER_PAGE;
  const lastIndex = initalIndex + HITS_PER_PAGE;
  return sortedList.slice(initalIndex, lastIndex);
}

/**
* Get an array fill of numbers between a given range
*/
export function range(start: number, end: number) {
  return Array(end - start + 1).fill('').map((_, idx) => start + idx)
}

/**
* Get last page num of favs array
*/
export const getLastPageForFavs = (totalFavs: number) => {
  const isEmpty = !totalFavs;
  return isEmpty ? 0 : Math.ceil(totalFavs / HITS_PER_PAGE)
}