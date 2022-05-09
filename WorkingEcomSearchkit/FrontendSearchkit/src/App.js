import './App.css';
import {  gql, useQuery } from '@apollo/client';
import { useSearchkitVariables, useSearchkit } from '@searchkit/client'
import React, { useState ,useEffect} from 'react'
import { withSearchkit, withSearchkitRouting } from '@searchkit/client'

const query = gql`
  query resultSet(
    $query: String
    $filters: [SKFiltersSet]
    $page: SKPageInput
    $sortBy: String
  ) {
    results(query: $query, filters: $filters) {
      summary {
        total
        appliedFilters {
          id
          identifier
          display
          label
          ... on DateRangeSelectedFilter {
            dateMin
            dateMax
            __typename
          }

          ... on ValueSelectedFilter {
            value
            __typename
          }
          __typename
        }
        sortOptions {
          id
          label
          __typename
        }
        query
        __typename
      }
      hits(page: $page, sortBy: $sortBy) {
        page {
          total
          totalPages
          pageNumber
          from
          size
          __typename
        }
        sortedBy

        items {
          ... on ResultHit {
            id
            fields {
              gender
              title
              image
              vendor
              price
              price_before_sale
              domain
              product_type
              updatedAt
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      facets {
        identifier
        type
        label
        display
        entries {
          label
          count
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;

const SearchInput = () => {
  const api = useSearchkit()
  const [value, setValue] = useState('')
  return (
    <form onSubmit={() => {
      api.setQuery(value)
      api.search()
    }}>
      <input onChange={(e) => setValue(e.target.value)} />
    </form>
    
  )
 
}

const Facet = ({facet}) =>{
  const api = useSearchkit()

  return (
    <div>
            <h1>All facets</h1>

      <h3>{facet.label}</h3>
      <h3>{facet.identifier}</h3>
    <ul>
      {facet.entries ? facet.entries.map((entry) => (
        <li 
        onClick={() => {
          api.toggleFilter({ identifier: facet.identifier, value: entry.label })
          api.search()
        }}
        
        >{entry.label} - {entry.count}</li>
      )): "waiting..."}
    </ul>
    </div>
  )
}


const Sort = ({sort}) =>{
  const api = useSearchkit()
  console.log(sort)

  return (
    <div>
            <h1>All Sorting</h1>

      <h4
              onClick={() => {
                api.setSortBy( sort.id )
                api.search()
              }}
      
      
      >{sort.id}</h4>



    <ul>
      {/* {facet.entries ? facet.entries.map((entry) => (
        <li 
        onClick={() => {
          api.toggleFilter({ identifier: facet.identifier, value: entry.label })
          api.search()
        }
      }
        
        >{entry.label} - {entry.count}</li>
      )): "waiting..."} */}
    </ul>
    </div>
  )
}






function App() {
  const variables = useSearchkitVariables()
  const { data, error,loading } = useQuery(query, { variables })
  console.log(data)
console.log (error)


  if(error){
    return (
      <div>something went wrong</div>
    )
  }
    
    

  if(loading){
    return (
      <div>loading ...</div>
    )
  }
    
  return (
    <div>
        <SearchInput/>
      {data.results.facets.map((facet,index) => (
        // <li key={index}>{facet}</li>
        <Facet facet={facet} />
      ))}

    {data.results.summary.sortOptions.map((sort,index) => (
        // <li key={index}>{facet}</li>
        <Sort sort={sort} />
      ))}
      <ul>
        {data.results.hits.items.map((hit) => {
          return(
            <li key={hit.fields.title}>{hit.fields.title} : {hit.fields.date_download} : fb {hit.fields.facebook_shares} : tw {hit.fields.twitter_shares} </li>
          )
        })}
      </ul>
    </div>
  )
      
}
export default withSearchkit(withSearchkitRouting(App))

// export default App;
