import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { 
    Remove, Create, listData
 } from '../function/Leaves'

const FormLeaves = () => {

    
    // jacascript
    const [data, setData] = useState([])
    const [form, setForm] = useState([])


    useEffect(() => {
        loadData()
    }, [])

    // ListData
    const loadData = async () => {
        listData()
            .then((res) => setData(res.data))
            .catch((err) => console.log(err))
    }

    // console.log(data)

    // ---------------- Create Data Start --------------
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    // Button Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        Create(form)
        .then(res => {
            console.log(res.data)
            loadData()
        })
        .catch((err) => console.log(err) ) 
        
    }
    // ---------------- Create Data End ----------------
    
    // ---------------- Delete Data Start --------------
    const handleRemove = async (leaf_id) => {
        Remove(leaf_id)
        .then((res) => {
            console.log(res.data)
            loadData()
        })
        .catch((err) => console.log(err))
    }
     // ---------------- Delete Data end ----------------

    return (
        <div>
            {/* HTML */}

            FormLeaves
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="leaf_id" >Leaf ID</label>
                    <input 
                        type="text" 
                        name='leaf_id' 
                        onChange={handleChange} 
                        placeholder='LeafID'
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="thai_name">Thai Name</label>
                    <input 
                        type="text" 
                        name='thai_name' 
                        onChange={handleChange} 
                        placeholder='ThaiName'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="local_name">Local Name</label>
                    <input 
                        type="text" 
                        name='local_name'
                        onChange={handleChange}  
                        placeholder='LocalName'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="descrip">Description</label>
                    <input 
                        type="text" 
                        name='descrip' 
                        onChange={handleChange} 
                        placeholder='Descrip'/>
                </div>
                <button type="submit">Submit</button>
            </form>


            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Thai Name</th>
                        <th scope="col">Local Name</th>
                        <th scope="col">Discription</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        data ? data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.leaf_id}</td>
                                <td>{item.thai_name}</td>
                                <td>{item.local_name}</td>
                                <td>{item.descrip}</td>
                                <td>
                                    <Link to={'/edit/' + item.leaf_id}>
                                        Edit
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => handleRemove(item.leaf_id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                            : null
                    }
                </tbody>
            </table>

        </div>
    )
}

export default FormLeaves
