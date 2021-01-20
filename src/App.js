import { Container } from 'react-bootstrap';
import { useState } from 'react';
import useFetchJobs from './useFetchJobs';
import Job from './Job';
import JobsPaginaton from './JobsPaginaton';
import './style.css';
import SearchForm from './SearchForm';



function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, hasNextPage } = useFetchJobs(params, page);

  function handleParamChange(e){
    const param = e.target.name
    const value = e.target.value
    setPage(1);
    setParams(prev => {
      return {...prev, [param] : value}
    })
  }

  return (
    <div className='main__div'>
    <Container className=' bg-secondary' >
    <h1 className='mb-4'>Github Jobs</h1>
    <SearchForm params={params} onParamChange={handleParamChange}/>
      <JobsPaginaton page={page} setPage={setPage} hasNextPage={hasNextPage}/>
      {loading && <h1>Loading..</h1>} 
      {/* {error && <h1>Error.. try to refresh the page</h1>} */}   
      {jobs.map(job=>{
        return <Job key={job.id} job={job}/>
      })}
      <JobsPaginaton page={page} setPage={setPage} hasNextPage={hasNextPage}/>
    </Container>
    </div>
  );
}

export default App;


