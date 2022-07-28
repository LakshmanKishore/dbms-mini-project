import React from 'react';
import { useParams } from "react-router-dom";
// https://blog.logrocket.com/react-router-dom-tutorial-examples/
// const {id} = useParams();

// This component is just used for testing.....

export default function About() {
  let params = useParams();
  return <h2>About: {params.id}</h2>;
}
