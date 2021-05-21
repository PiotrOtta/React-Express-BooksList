import React, { useState } from 'react'
import styled from 'styled-components'

const SearchDiv = styled.div`
    position: relative;
    height: 25px;
    padding: 20px;
    border: 0px;
    border-radius: 10px;
    color: white;
    min-width: 400px;
    margin: 10px;
    background: linear-gradient(180deg, rgb(211, 211, 211) 30%,  rgb(143, 143, 143) 100%);
    `
const SearchText = styled.span`
    position: absolute;
    width: fit-content;
    left: 0;
    top: 0;
    padding: 5px 10px;
    border-radius: 10px;
    background: linear-gradient(180deg, rgb(211, 150, 30) 30%,  rgb(180, 143, 63) 100%);
    transform: translate(-20%, -50%);
    `
const InputHTML = styled.input`
    position: relative;
    padding: 5px 20px;
    border: 2px grey;
    border-radius: 10px;
`
const FloatDiv = styled.div`
    float: ${props => props.position ? 'left' : 'right'};
`

const SearchBook = ({setSearchTitle, setsearchAuthor}) => {
    const [ title, setTitle ]   = useState("")
    const [ author, setAuthor ] = useState("")
    const HandleSearchTitle = (elem) => {
        setTitle(elem)
        setSearchTitle(elem)
    }
    const HandleSearchAuthor = (elem) => {
        setAuthor(elem)
        setsearchAuthor(elem)
    }
    return (
        <SearchDiv>
            <SearchText> Wyszukaj książkę: </SearchText>
            <FloatDiv position>
                <label htmlFor="titleS">Tytuł: </label>
                <InputHTML 
                    id="titleS"
                    type="text" placeholder="Wpisz tytuł książki..."
                    value={title}
                    onChange={(e) => HandleSearchTitle(e.target.value)}
                    />
            </FloatDiv>
            <FloatDiv >
                <label htmlFor="authorS">Autor: </label>
                <InputHTML 
                    id="authorS"
                    type="text" placeholder="Wpisz autora książki..."
                    value={author}
                    onChange={(e) => HandleSearchAuthor(e.target.value)}
                    />
            </FloatDiv>
        </SearchDiv>
    )
}

export default SearchBook
