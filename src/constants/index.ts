import { react,angular,vue } from "../assets";

export enum Query {
    React = 'React',
    Angular = 'Angular',
    Vue = 'Vue',
}

export enum QueryFilter {
    Default = 'All',
    Favs = 'My faves'
}

export const DEFAULT_QUERY = Query.React;
export const INITAL_PAGE = 0;
export const HITS_PER_PAGE = 8;
export const API_URL = 'https://hn.algolia.com/api/v1/search_by_date';

export const QUERIES_OPTIONS = [
    {
      name: Query.React,
      img: react
    },
    {
      name: Query.Angular,
      img: angular
    },
    {
      name: Query.Vue,
      img: vue
    },
]