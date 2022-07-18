import React from "react";
import { HitsArray,HitType,Favs } from "../../types";
import { fav, notFav, time } from '../../assets';
import { diffDates } from "../../utils";
import './Hits.css'

type HitsProps = {
    items: HitsArray,
    favs: Favs,
    toggleFav: (key: HitType) => void,
    loading: boolean;
    error: boolean;
}


/**
 * Create a list of hits from API or favs in local storage
 */
export const Hits: React.FC<HitsProps> = ({ items,favs,toggleFav,loading,error }) => {

    /**
     * Add/Delete Fav from state
     */
    const handleClickOnFav = (item: HitType) => {
        toggleFav(item);
    }

    /**
     * Open hit url in another tab
     */
    const handleClickOnHit = (url: string) => {
        window.open(url);
    }

    return (
        <div className="Hits-Container">
            { error? <p>Error Retrieving News</p> : loading? <p>Loading Data</p>  :items.map((item) => {
                const { objectID, story_title, story_url, created_at, author } = item;
                const isFav = favs[objectID] !== undefined;

                const past = new Date(created_at);
                const now = new Date();
                const timeString = `${diffDates(past, now)} by ${author}`

                return (
                    <div className="Hit" key={objectID} id={objectID} onClick={(e) => { e.preventDefault(); handleClickOnHit(story_url) }} >
                        <div className="Hit-Description-Container">
                            <div className="Hit-Time">
                                <img src={time} alt={'Created at'} />
                                <span>{`${timeString}`}</span>
                            </div>
                            <span className="Hit-Title-Container">{`${story_title}`}</span>
                        </div>
                        <div onClick={(e) => { e.stopPropagation(); handleClickOnFav(item) }} className="Hit-Fav-Container">
                            <img src={isFav ? fav : notFav} alt={isFav ? 'Fav' : 'Not Fav'} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}