import { useCallback, useState } from 'react';
import { Header,ToggleButton,Dropdown } from './components/common';
import { useLocalStorage,useData } from './hooks';
import { DEFAULT_QUERY,HITS_PER_PAGE,API_URL, INITAL_PAGE,QueryFilter,QUERIES_OPTIONS } from './constants/index';
import { QueryResponse } from './types';
import { filterHitsFromResponse } from './utils';
import './App.css';


function App() {

  const [query, setQuery] = useLocalStorage({ key: "apiQuery", fallbackState: DEFAULT_QUERY });
  const [apiPage, setApiPage] = useState<number>(INITAL_PAGE);
  const { data }: { data: QueryResponse } = useData({ 
    url: `${API_URL}?query=${query}&page=${apiPage}&hitsPerPage=${HITS_PER_PAGE}`,
    transformData: filterHitsFromResponse,
    defaultValue: { hits: [], nbPages: 0 }
  });
  const [filter, setFilter] = useState<QueryFilter>(QueryFilter.Default);
  const showFavs = filter === QueryFilter.Favs;

  const changeQuery = useCallback( (query: string) => {
    setApiPage(0);
    setQuery(query);
  },[setApiPage,setQuery]);


  return (
    <div className='App-Container'>
      <div className="App">
        <Header title='Hacker News'/>
        <ToggleButton options={Object.values(QueryFilter)} value={filter} setValue={setFilter} />
        <Dropdown options={QUERIES_OPTIONS} selected={query} setSelected={changeQuery} show={!showFavs} />
        
      </div>
    </div>
  );
}

export default App;
