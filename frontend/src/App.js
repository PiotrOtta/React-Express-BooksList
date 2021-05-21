import './App.css';
import BookList     from './BookList'
import Form         from './Form'
import SearchBook   from './SearchBook'
import axios        from 'axios';
import { useState, useEffect } from 'react'
import styled       from 'styled-components'

const WholePage = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  text-align: center;
  margin: auto 0;
  padding: 0;
`
const ColumnHTML = styled.div`
  min-width: 600px;
  width: 80%;
  max-width: 700px;
`
const ReactHTML = styled.h1`
  color: #e77;
  position: relative;
`
const StyledCompontentHTML = styled.span`
  color: #e93;
`
const FloatingText = styled.span`
  color: darkmagenta;
  font-size: small;
  position: absolute;
  width: fit-content;
  transform: translate(-70%, 240%);
`

function App() {
  const [ searchTitle,  setSearchTitle ]  = useState("")
  const [ searchAuthor, setsearchAuthor ] = useState("")
  const [ books, setbooks ] = useState( [] )
  const [ todelete, settodelete ] = useState([])
  useEffect( () => {
      axios.get( 'http://localhost:5000/get-books' ).then( response => {
      setbooks( response.data )
      } )
  }, [] )
  const resetBooksList = () => {
      axios.get( 'http://localhost:5000/get-books' ).then( response => {
      setbooks( response.data )
      } )
  }


  return (
    <WholePage>
      <ColumnHTML>
        <ReactHTML> React <StyledCompontentHTML>( Styled-Components )</StyledCompontentHTML> 
          <FloatingText>wykonane przez Piotra Otta</FloatingText> 
        </ReactHTML>
        <SearchBook setSearchTitle={setSearchTitle} setsearchAuthor={setsearchAuthor}/>
        <Form resetBooksList={resetBooksList} todelete={todelete} settodelete={settodelete}/>
        <BookList searchTitle={searchTitle} searchAuthor={searchAuthor} books={books} todelete={todelete} settodelete={settodelete}/>
      </ColumnHTML>
    </WholePage>
  );
}

export default App;
