import React from "react";
import {zoomIn} from 'react-animations';
import styled, {keyframes} from 'styled-components';


export default class FileSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.translatePage = this.translatePage.bind(this);
  }

  handleChange(e) {
    const pathToZip =  e.target.files[0].path;
    this.props.unzipFile(pathToZip, this.translatePage);
  }

  translatePage() {
  }

  render() {
    return (
      <Container>
        <Label>
          <Input type="file" onChange={ (e) => this.handleChange(e) } />
          <i className="material-icons">note_add</i>
        </Label>
      </Container>
    );
  }
}

const zoomInAnimation = keyframes`${zoomIn}`;

const Container = styled.div`
  margin-top: 20px;
  animation: ${zoomInAnimation} .3s ease-in;
`;

const Input = styled.input`
    display: none;
`;
const Label = styled.label`
    padding: 12px 24px;
    cursor: pointer;
    background: linear-gradient(	#7FFF00, #32CD32);
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
    justify-content: space-around;
    border-radius: 2px;
    box-shadow: 0px 1px 1px rgba(0,0,0,0.5);

    i{
      font-size: 44px;
    }


`
