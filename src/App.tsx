import { useState } from 'react';
import './App.css';
import { Header,ToggleButton } from './components/common';
import { useLocalStorage,useData } from './hooks';
import { DEFAULT_QUERY,HITS_PER_PAGE,API_URL, INITAL_PAGE,QueryFilter } from './constants/index';
import { QueryResponse } from './types';
import { filterHitsFromResponse } from './utils';


function App() {

  const [query, setQuery] = useLocalStorage({ key: "apiQuery", fallbackState: DEFAULT_QUERY });
  const [apiPage, setApiPage] = useState<number>(INITAL_PAGE);
  const { data }: { data: QueryResponse } = useData({ 
    url: `${API_URL}?query=${query}&page=${apiPage}&hitsPerPage=${HITS_PER_PAGE}`,
    transformData: filterHitsFromResponse,
    defaultValue: { hits: [], nbPages: 0 }
  });
  const [filter, setFilter] = useState<QueryFilter>(QueryFilter.Default);


  return (
    <div className='App-Container'>
      <div className="App">
        <Header title='Hacker News'/>
        <ToggleButton options={Object.values(QueryFilter)} value={filter} setValue={setFilter} />
      </div>
    </div>
  );
}

export default App;
