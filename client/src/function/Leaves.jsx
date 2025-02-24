import axios from 'axios'


export const listData = async() =>  {
    return await axios.get(import.meta.env.VITE_APP_API + '/getLeaf')
}

export const ShowOneData = async(leaf_id) =>  {
    return await axios.get(import.meta.env.VITE_APP_API + '/getLeaf/' + leaf_id)
}

export const updateData = async(leaf_id, data) =>  {
    return await axios.put(import.meta.env.VITE_APP_API + '/updateLeaf/' + leaf_id, data)
}

export const Create = async(data) =>  await axios.post(import.meta.env.VITE_APP_API + '/postLeaf', data)

export const Remove = async(leaf_id) =>  await axios.delete(import.meta.env.VITE_APP_API + '/removeLeaf/' + leaf_id)