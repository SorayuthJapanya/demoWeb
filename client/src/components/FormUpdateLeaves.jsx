import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { ShowOneData, updateData } from '../function/Leaves'

const FormUpdateLeaves = () => {

  const { leaf_id } = useParams()
  console.log(leaf_id)
  const navigate = useNavigate()

  const [data, setData] = useState({
    thai_name: "",
    lacal_name: "",
    descrip: ""
  })

  useEffect(() => {
    loadData(leaf_id)
  }, [])

  const loadData = async (leaf_id) => {
    try {
      const res = await ShowOneData(leaf_id)
      setData(res.data || {})
    } catch (err) {
      console.log('error fetching leaf Data:', err)
    }
  }

  const handleChange = (e) => {
          setData({
              ...data,
              [e.target.name]: e.target.value
          })
      }
      // Button Submit
      const handleSubmit = async (e) => {
          e.preventDefault();
          console.log(data)
          try {
            updateData(leaf_id, data)
            .then(res => {
                console.log(res.data)
                navigate('/')
            })
            .catch((err) => console.log(err) ) 
          } catch (error) {
            
          }
      }

  return (
    <div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="thai_name">Thai Name</label>
          <input
            type="text"
            name='thai_name'
            value={data.thai_name} 
            onChange={handleChange}
            placeholder='ThaiName' 
            />
            
        </div>
        <div className="mb-3">
          <label htmlFor="local_name">Local Name</label>
          <input
            type="text"
            name='local_name'
            onChange={handleChange}
            placeholder='LocalName' 
            value={data.local_name}
            />
        </div>
        <div className="mb-3">
          <label htmlFor="descrip">Description</label>
          <input
            type="text"
            name='descrip'
            onChange={handleChange}
            placeholder='Descrip' 
            value={data.descrip}
            />
        </div>
        <button type="submit">Submit</button>
      </form>

    </div>
  )
}

export default FormUpdateLeaves
