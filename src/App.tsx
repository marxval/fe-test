import { useCallback, useState } from 'react';
import { Header,ToggleButton,Dropdown, Pager } from './components/common';
import { Hits } from './components';
import { useLocalStorage,useData } from './hooks';
import { DEFAULT_QUERY,HITS_PER_PAGE,API_URL, INITAL_PAGE,QueryFilter,QUERIES_OPTIONS } from './constants/index';
import { Favs, HitsArray, HitType, DataResponseHitsAPI } from './types';
import { filterHitsFromResponse, getHitsForFav, getLastPageForFavs } from './utils';
import './App.css';


function App() {

  // favs and query state persisted in local storage
  const [favs, setFavs] = useLocalStorage({ key: 'favs', fallbackState: {} });
  const [query, setQuery] = useLocalStorage({ key: "apiQuery", fallbackState: DEFAULT_QUERY });

  // two page states to paginate through API and favs
  const [apiPage, setApiPage] = useState<number>(INITAL_PAGE);
  const [pageFavs, setPageFavs] = useState<number>(INITAL_PAGE);

  // Get data or error state from api according to query and number of page
  const { data,loading,error }: DataResponseHitsAPI = useData({ 
    url: `${API_URL}?query=${query}&page=${apiPage}&hitsPerPage=${HITS_PER_PAGE}`,
    transformData: filterHitsFromResponse,
    defaultValue: { hits: [], nbPages: 0 }
  });

  const [filter, setFilter] = useState<QueryFilter>(QueryFilter.Default);
  const showFavs = filter === QueryFilter.Favs;

  const favsArray = Object.values(favs) as HitsArray;
  const hits = showFavs ? getHitsForFav(favsArray, pageFavs) : data.hits;
  const lastPage = showFavs ? getLastPageForFavs(favsArray.length) : data.nbPages;

  /**
  * Change query to automatically update API data  
  */
  const changeQuery = useCallback( (query: string) => {
    setApiPage(0);
    setQuery(query);
  },[setApiPage,setQuery]);

  /**
   * Add or delete hit to favs                                                                                                                                                                                                   
   */
  const toggleFavByID = useCallback((item: HitType) => {
    setFavs((favs: Favs) => {
    const key = item.objectID;                                             
      const notInFavs = favs[key] === undefined;
      if (notInFavs) {
        return { ...favs, [key]: item };
      } else {
        delete favs[key];
        return { ...favs };
      }
    })
  }, [setFavs])


  return (
    <div className='App-Container'>
      <div className="App">
        <Header title='Hacker News'/>
        <ToggleButton options={Object.values(QueryFilter)} value={filter} setValue={setFilter} />
        <Dropdown options={QUERIES_OPTIONS} selected={query} setSelected={changeQuery} show={!showFavs} />
        <Hits items={hits} favs={favs} toggleFav={toggleFavByID} loading={loading} error={error}/>
        <Pager currentPage={showFavs ? pageFavs : apiPage} setPage={showFavs? setPageFavs : setApiPage} lastPage={lastPage} />
      </div>
    </div>
  );
}

export default App;
