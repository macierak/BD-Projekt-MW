import React from 'react'

const RaportResult = (props) => {
    if(props.found){
        let found = props.found
        let fKey = Object.keys(props.found)[0]
        let sKey = Object.keys(props.found)[1]

        
        return (
            <div>
                {found[fKey]} - {found[sKey]}
            </div>
            
        )
    }else{
        return (
            <div>
                
            </div>
            
        )
    }
}

export default RaportResult
