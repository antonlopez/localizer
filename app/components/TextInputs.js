import React, { Component } from 'react';
import styled from 'styled-components';

class TextInputsContainer extends Component {

  constructor(props) {
    super(props);
    this.state = { value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.resetValue = this.resetValue.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.counter !== nextProps.counter){
      this.setState({value: ''});
    }

  }


  handleChange(event) {
    this.setState({value: event.target.value});
    const translatedText = event.target.value;
    const { saveTranslation, devId, devKeys } = this.props;
    saveTranslation(devKeys[devId], translatedText);
  }

  resetValue () {
    //this.setState({value: 'Juan'});
    //debugger;
    //this.props.nextTranslation();
  }

render() {


    return (
      <Container>
        <p>{this.props.text}</p>
        <input type="text" placeholder="Insert Translation" value={this.state.value} onChange={this.handleChange} />
      </Container>
    );
}

};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;


input{
  height:50%;
}

`;



export default TextInputsContainer;
