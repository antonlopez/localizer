import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

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
  const { inputValue, devId, text } =this.props;
  console.log(`${inputValue} devID: ${devId}`);
  let value = '';
  if(inputValue !== undefined){
    value = this.props.inputValue;
  }


    return (
      <Container done={value.length > 0}>
        <p>{text}</p>
        <input type="text" placeholder="Insert Translation" value={value} onChange={this.handleChange} />
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

p{
color:${props=> props.done ? '#00FF00' : '#FFF'};
}

`;



export default TextInputsContainer;
