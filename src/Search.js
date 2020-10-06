import React from "react";
import axios from "axios";
import {
  usePaginatedQuery,
  useQueryCache,
  QueryCache,
  ReactQueryCacheProvider
} from "react-query";

const queryCache = new QueryCache();

export default function Search() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Todos />
    </ReactQueryCacheProvider>
  );
}

  function Todos() {
    const [page, setPage] = React.useState(0)
  
    const fetchProjects = (key, page = 0) => fetch('https://restcountries.eu/rest/v2/all' )
 
    const {
      isLoading,
      isError,
      error,
      resolvedData,
      latestData,
      isFetching,
    } = usePaginatedQuery(['projects', page], fetchProjects)
    console.log(latestData);
    return (
      
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : (
          // `resolvedData` will either resolve to the latest page's data
          // or if fetching a new page, the last successful page's data
          <div>
            {resolvedData.projects.map(project => (
              <p key={project.id}>{project.name}</p>
            ))}
          </div>
        )}
        <span>Current Page: {page + 1}</span>
        <button
          onClick={() => setPage(old => Math.max(old - 1, 0))}
          disabled={page === 0}
        >
          Previous Page
        </button>{' '}
        <button
          onClick={() =>
            // Here, we use `latestData` so the Next Page
            // button isn't relying on potentially old data
            setPage(old => (!latestData || !latestData.hasMore ? old : old + 1))
          }
          disabled={!latestData || !latestData.hasMore}
        >
          Next Page
        </button>
        {
          // Since the last page's data potentially sticks around between page requests,
          // we can use `isFetching` to show a background loading
          // indicator since our `status === 'loading'` state won't be triggered
          isFetching ? <span> Loading...</span> : null
        }{' '}
      </div>
    )
  }
