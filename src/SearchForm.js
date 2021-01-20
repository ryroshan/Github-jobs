import React from 'react'
import { Form, Col } from 'react-bootstrap';
import './style.css';

function SearchForm({ params, onParamChange }) {
    return (
        <Form className='mb-4'> 
          <Form.Row>

                  {/* // Description search box */}

              <Form.Group as={Col}>
                  <Form.Label>Description</Form.Label>
                  <Form.Control onChange={onParamChange} value={params.description} name='description' type='text'/>
              </Form.Group>

              {/* // Location seaeching box   ********************* */}

              <Form.Group as={Col}>
                  <Form.Label>Location</Form.Label>
                  <Form.Control onChange={onParamChange} value={params.location} name='location' type='text'/>
              </Form.Group>
              
                    {/*checkbox for full time */}

              <Form.Group as={Col} xs='auto' className='ml-2'>
                  <Form.Check onChange={onParamChange} value={params.full_time} name='full_time' 
                  id='full-time' label='Only Full Time' type='checkbox' className='checkbox__form'/>
              </Form.Group>

          </Form.Row>
            
        </Form>
    )
}

export default SearchForm
