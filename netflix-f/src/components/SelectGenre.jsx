import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { fetchDataByGenre } from '../store'

export default function SelectGenre({ genres, type }) {
  const dispatch = useDispatch()

  return (
    <Container>
      <select className='flex' onChange={e => {
        dispatch(fetchDataByGenre({genre: e.target.value, type} ))
      }}>
        {
          genres.map((genre) => {
            return (<option value={genre.id} key={genre.id}>{genre.name}</option>)
          })
        }
      </select>
    </Container>
  )
}

const Container = styled.div`
  select{
    margin-left: 5rem;
    cursor: pointer;
    font-size: 1.4rem;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
  }
`;