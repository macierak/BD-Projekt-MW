import React from 'react'

const SearchResult = (props) => {
    if(props.found){
        let found = props.found
        console.log(props.found)
        let data_urodzenia = new Date(found.data_urodzenia).toLocaleDateString()
        let data_śmierci = new Date(found.data_śmierci).toLocaleDateString()

        return (
            <div>
                <h6>{found.imie} {found.nazwisko}</h6>
                <h7>{data_urodzenia} - {data_śmierci}</h7>
                            
                <br/><h7><i>{found.cytat}</i></h7>
            </div>
            
        )
    }else{
        return (
            <div>
                
            </div>
            
        )
    }
    
}

export default SearchResult
