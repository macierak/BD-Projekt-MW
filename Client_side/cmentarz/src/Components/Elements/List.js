import React, { useState } from 'react';

const List = (props) => {
    let fKey = Object.keys(props.data)[0]
    let id =  Object.keys(props.data)[1]

    return  <option value={props.data[id]} >{props.data[fKey]}</option> 
};

export default List;
