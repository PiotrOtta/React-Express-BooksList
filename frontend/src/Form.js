import React, { useState }  from 'react'
import axios                from 'axios';
import styled               from 'styled-components'

const ShowAddBook = styled.button`
    position: relative;
    margin: 10px;
    padding: 10px 15px;
    border: 0px;
    border-radius: 15px;
    color: white;
    font-weight: bold;
    -webkit-text-stroke: 0.05px black;
    background: ${ props => props.pokaz ? 'linear-gradient(180deg, rgb(20, 211, 20) 30%,  rgb(143, 255, 143) 100%);' : 'linear-gradient(180deg, rgb(211, 211, 211) 30%,  rgb(143, 143, 143) 100%);'};
    border-bottom: 1px solid black;
    float:right;
    &::before {
        transition: 0.5s ease-in-out;
        word-break: keep-all;
        /* opacity: ${props => props.pokaz ? '100%' : '0%'}; */
        visibility: ${props => props.pokaz ? 'visible' : 'hidden'};
        padding: inherit;
        padding: ${props => props.pokaz ? '10px 25px' : '10px 0px'};
        border: inherit;
        border-radius: inherit;
        width: 100px;
        content: 'panel aktywny';
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
        background: linear-gradient(180deg, rgb(40, 160, 120) 30%,  rgb(123, 155, 173) 100%);
        transform: translate(${props => props.pokaz ? '-85%, 0%' : '0%, 0%'});
    }
    `
const DeleteButton = styled.button`
    transition: 300ms ease-in-out;
    margin: 10px;
    padding: 10px;
    border: 0px;
    border-radius: 10px;
    opacity: ${props => props.pokaz ? '100%' : '0%'};
    color: white;
    font-weight: bold;
    -webkit-text-stroke: 0.05px black;
    background: linear-gradient(180deg, rgb(211, 50, 20) 30%,  rgb(143, 30, 13) 100%);
    border-bottom: 1px solid black;
    float:left;
    `
const FormDiv = styled.div`
    position: relative;
    float:right;
    transition: 0.5s ease-in-out;
    padding: ${props => props.pokaz ? '20px' : '0px'};
    border: 0px;
    border-radius: 10px;
    color: white;
    min-width: 400px;
    margin: 10px;
    background: linear-gradient(180deg, rgb(211, 211, 211) 30%,  rgb(143, 143, 143) 100%);
    opacity: ${props => props.pokaz ? '100%' : '0%'};
    height: ${props => props.pokaz ? '75px' : '0px'};
    transform: translate(${props => props.pokaz ? '0%' : '-50%'}, 0);
    & button {
        margin: 10px 0;
        padding: 10px;
        border: 0px;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        -webkit-text-stroke: 0.05px black;
        background-color: greenyellow;
        color: black;
        border-bottom: 1px solid black;
        transition: 250ms ease-in-out;
    }
    & button:hover {
        background-color: green;
        color: white;
    }
    `
const FormText = styled.span`
    position: absolute;
    width: fit-content;
    left: 0;
    top: 0;
    z-index: 2;
    padding: 5px 10px;
    border-radius: 10px;
    background: linear-gradient(180deg, rgb(40, 160, 120) 30%,  rgb(123, 155, 173) 100%);
    transform: translate(-20%, -50%);
    `
const OverFlowControl = styled.div`
    width: inherit;
    height: inherit;
    overflow: hidden;
`
const InputHTML = styled.input`
    position: relative;
    padding: 5px 20px;
    border: 2px grey;
    border-radius: 10px;
`
const InputFileHTML = styled.input`
    float: left;
    margin: 20px 0;
`
const OkladkaHTML = styled.div`
    transition: 500ms ease-in-out;
    position: absolute;
    width: 90px;
    left: 0;
    opacity: ${props => props.czyStyl ? '100%' : '0%'};
    transform: translate( -110%, 0%);
    &::before{
        content: 'Podgląd';
        position:absolute;
        left: 0;
        top: 0;
        padding: 3px 10px;
        font-size: small;
        border-radius: 10px;
        background-color: coral;
        transform: translate(-20%, -50%);
    }
    & img {
        max-width: 90px;
        transform-origin: top;
    }

`
const FloatDiv = styled.div`
    float: ${props => props.position ? 'left' : 'right'};
`

const Form = ( {resetBooksList, todelete, settodelete} ) => {
    const [ title, setTitle ]   = useState("")
    const [ author, setAuthor ] = useState("")
    const [ image, setImage ]   = useState("")
    const fileToDataUri = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result)
        };
        reader.readAsDataURL(file);
        })
    const HandleImage = (file) => {
        if(!file) { setImage(""); return; }
        fileToDataUri(file).then(dataUri => { setImage(dataUri) })
        }
    const HandleSubmit = (e) => {
        e.preventDefault()
        axios.post( 'http://localhost:5000/get-books', { title, author, image } ).then( response => { 
        resetBooksList() 
        setTitle("")
        setAuthor("")
        setImage("")
        document.getElementById("image").value = "";
        } )
    }
    const HandleDelete = (e) => {
        e.preventDefault()
        axios.delete( 'http://localhost:5000/get-books', { data: todelete } ).then( response => { 
        settodelete([])
        resetBooksList() 
        } )
    }

    const [ visibility, setvisibility ]   = useState(false)
    return (
        <div>
            <ShowAddBook pokaz={visibility} onClick={ () => setvisibility(!visibility) }> Dodaj książkę </ShowAddBook>
            <DeleteButton pokaz={todelete.length>0} onClick={HandleDelete }>Usuń</DeleteButton>
            <FormDiv pokaz={visibility}>
            <FormText> Dodaj książkę: </FormText>
            <OkladkaHTML czyStyl={(image === "")? false : true}>
                { (image === "")?null : <img width="100" src={`${image}`} alt=""/>}
            </OkladkaHTML>
                <OverFlowControl>
                    <FloatDiv position>
                        <label htmlFor="title">Tytuł: </label>
                        <InputHTML 
                            id="title"
                            type="text" placeholder="Wpisz tytuł książki..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            />
                    </FloatDiv>
                    <FloatDiv>
                        <label htmlFor="author">Autor: </label>
                        <InputHTML 
                            id="author"
                            type="text" placeholder="Wpisz autora książki..."
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            />
                    </FloatDiv>
                    <FloatDiv position>
                        <InputFileHTML 
                            type="file"
                            id="image" name="image" 
                            onChange={(event) => HandleImage(event.target.files[0] || null)}
                            accept="image/png, image/jpeg" />
                    </FloatDiv>
                    <FloatDiv >
                        <button onClick={HandleSubmit}> Dodaj książkę </button>
                    </FloatDiv>
                </OverFlowControl>
            </FormDiv>
        </div>
    )
}

export default Form
