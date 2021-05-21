import React from 'react'
import styled from 'styled-components'

const BoxElement = styled.div`
    margin-top: 200px;
    &:first-child {
        margin-top: 0px;
    }
`
const BoxList = styled.div`
    display: flex;
    flex-direction: row;
    align-content: center;
    position: relative;
    margin: 10px;
    height: 20px;
    background: linear-gradient(180deg, rgb(211, 211, 211) 30%,  rgb(143, 143, 143) 100%);
    padding: 20px;
    border-radius: 20px;
    & p {
        margin: 0;
        position: absolute;
        font-size: x-large;
        left: 50%;
        top: 50%;
        color: white;
        -webkit-text-stroke: 0.2px black;
        transform: translate(-50%, -50%);
    }
    & span {
        position: absolute;
        right: 20px;
        top: 100%;
        transform: translate(0%, 0%);
    }
`
const ImageHolder = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    & img {
        border-radius: 15px;
        max-width: 150px;
        max-height: 241px;
    }
`
const CheckboxDivHtml = styled.div`
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translate(0%, -50%);
`
const LabelHtml = styled.label`
    transition: 300ms ease-in-out;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 0px 14px 14px 0px;
    background-color: ${props => props.stan ? 'white' : 'transparent'};
    color: ${props => props.stan ? 'red' : 'black'};
    border: ${props => props.stan ? '1px solid red' : '1px solid transparent'};
`

const BookList = ({ searchTitle, searchAuthor, books, todelete, settodelete}) => {    
    let booksFiltered = books
    if( searchTitle!=="") booksFiltered = booksFiltered.filter( elem => String(elem.title).includes(searchTitle) )
    if( searchAuthor!=="" ) booksFiltered = booksFiltered.filter( elem => String(elem.author).includes(searchAuthor) )
    const HandleToDelete = (id, stan) => {
        let temp = [...todelete]
        if( stan ) temp = [...todelete, {id: id, stan: true}]
        else temp = todelete.filter(item => item.id !== id)
        settodelete(temp)
    }
    const booksHTML = booksFiltered?.map( item => {
        let stan = todelete[todelete.findIndex(elem => elem.id === item.id.toString())]?.stan
        if(stan!==true) stan=false
        let htmlresponse = "Usunąć?"
        if( stan ) htmlresponse = "Do usunięcia."
        return (
            <BoxElement key={ item.id }>
                <BoxList>
                    <ImageHolder>
                        { (item.image !== "")? <img src={`${item.image}`} alt=""/> : <img src={ process.env.PUBLIC_URL + "/placeholder.png"} alt=""/> }
                    </ImageHolder>
                    <p> { item.title } </p>
                    <span> Autor: { item.author } </span>
                    <CheckboxDivHtml>
                        <input style={{display: "none"}} type="checkbox" checked={stan} id={item.id} value={item.id} onChange={e => HandleToDelete(e.target.value, e.target.checked)}/>
                        <LabelHtml stan={stan} htmlFor={item.id}>{htmlresponse}</LabelHtml>
                    </CheckboxDivHtml>
                </BoxList>
            </BoxElement>
        )
    } )

    return (
        <div>
            { ( booksHTML.length === 0 )? <BoxList><p>Brak elementów w bazie</p></BoxList> : null }
            { booksHTML }
        </div>
    )
}

export default BookList
