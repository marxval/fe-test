export type HitType = {
    author: string,
    created_at: string,
    objectID: string,
    story_title: string,
    story_url: string,
}

export type HitsArray = Array<HitType>;

export type QueryResponse = {
    hits: HitsArray,
    nbPages: number,
}