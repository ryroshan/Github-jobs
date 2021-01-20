import axios from 'axios'
import { useReducer, useEffect } from 'react'

const ACTIONS = {
    MAKE_REQUEST : 'make_request',
    GET_DATA: 'get_data',
    ERROR : 'error',
    UPDATE_HAS_NEXT_PAGE: 'update_has_next_page'
}

const BASE_URL = 'http://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json'

function reducer(state, action){
    switch(action.type) {
        case ACTIONS.MAKE_REQUEST:

        return {loading : true, jobs:[] }

        case ACTIONS.GET_DATA:

        return {...state, loading: false, jobs: action.payload.jobs }

        case ACTIONS.ERROR:

        return {...state, loading: false, error: action.payload.error, jobs:[]}

        case ACTIONS.UPDATE_HAS_NEXT_PAGE:

        return {...state, hasNextPage: action.payload.hasNextPage}

        default:
            return state
    }

}

export default function UserFetchJobs(params, page){
   const [state, dispatch] = useReducer(reducer, { jobs:[], loading: true});

   useEffect(()=>{
        // CancelToken #1
      const cancelToken1 = axios.CancelToken.source();
      dispatch({ type: ACTIONS.MAKE_REQUEST })
      axios.get(BASE_URL, {
          cancelToken: cancelToken1.token,
          params: { markdown: true, page: page, ...params}
        })
      .then(res =>{
          dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data }})
      }).catch(err =>{
          dispatch({ type: ACTIONS.ERROR, payload: {error : err}})
      })

        // CancelToken #2
      const cancelToken2 = axios.CancelToken.source();
      axios.get(BASE_URL, {
        cancelToken: cancelToken2.token,
        params: { markdown: true, page: page+1, ...params}
      })
      .then(res =>{
          dispatch({ type: ACTIONS.UPDATE_HAS_NEXT_PAGE, payload: { hasNextPage: res.data.length !== 0  }})
      }).catch(err =>{
          dispatch({ type: ACTIONS.ERROR, payload: {error : err}})
      })

      return ()=>{
        cancelToken1.cancel();
        cancelToken2.cancel();

      }

   }, [params, page]);

     return state
        // jobs: [],
        // loading: false,
        // error : false
        
    
}



