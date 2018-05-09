import React from "react";
import {zoomIn} from 'react-animations';
import styled, {keyframes} from 'styled-components';
import { PlusButton } from 'react-svg-buttons'


export default class FileSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const pathToZip =  e.target.files[0].path;
    this.props.unzipFile(pathToZip);
  }

  render() {
    return (
      <Container>
        <Label>
          <Input type="file" accept=".zip" onChange={ (e) => this.handleChange(e) } />
          <PlusButton size={90} color="#00FF00" thickness={2} />
        </Label>
      </Container>
    );
  }
}

const zoomInAnimation = keyframes`${zoomIn}`;

const Container = styled.div`
  margin-top: 20px;
  animation: ${zoomInAnimation} .3s ease-in;
  background-color: transparent;
`;

const Input = styled.input`
    display: none;
`;
const Label = styled.label`
    padding: 12px 24px;
    cursor: pointer;
    background-color: transparent;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
    justify-content: space-around;
    border-radius: 2px;


    i{
      font-size: 44px;
    }


`
