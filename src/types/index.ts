export type HitType = {
    author: string,
    created_at: string,
    objectID: string,
    story_title: string,
    story_url: string,
}

export type HitsArray = Array<HitType>;

export type Favs = {
    [key: string]: HitType;
}
  
export type QueryResponse = {
    hits: HitsArray,
    nbPages: number,
}

export type DataResponseHitsAPI = {
    data: QueryResponse,
    loading: boolean,
    error: boolean
}