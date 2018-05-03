// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import{ bindActionCreators } from 'redux';
import {zoomIn} from 'react-animations';
import styled, {keyframes} from 'styled-components';
import { Link } from 'react-router-dom';
import { MorphIcon, PlusButton } from 'react-svg-buttons'
import World from '../Assets/Images/world.png'
import styles from './Home.css';
import FileSelector from './FileSelector';
import Loading from './loading';
import { unzipFile, saveLanguage, deletePrevious } from '../actions'


type Props = {};

class Home extends Component<Props> {
  props: Props;
  constructor(props) {
    super(props);
    this.state = { value: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value});
    this.props.saveLanguage(event.target.value); // get value from text input
  }

  componentWillMount() {
    this.props.deletePrevious();
  }

  render() {
    const { unzipFile, language, history, loading, filesExtracted } = this.props;
    let addFile = '';
    if (language && this.state.value.length > 0 ) {
      addFile = <FileSelector unzipFile={unzipFile} history={history} />
    }
    return (
      <Container>
        <div className={styles.container} data-tid="container">
          <h2>Localizer</h2>

        </div>
        {loading ?
          <Loading text={"Extracting File..."} />
          :
          filesExtracted ?
          <NextContainer>
            <Link to="/translate"><MorphIcon type="arrowRight" size={220} thickness={6} color="	#00FF00" /></Link>
             <p>Start Translating!</p>
          </NextContainer>
          :
          <MenuContainer>
          <img height="400" width="800" src={World} alt="world"/>
          <LanguageContainer>
            <input type="text" placeholder="Insert New Language" value={this.state.value || ''} onChange={this.handleChange} />
            {addFile}


          </LanguageContainer>

          </MenuContainer>
 }


      </Container>
    );
  }
}

const Container = styled.div``;

const MenuContainer = styled.div`
padding-top:6%;
 height: 100%;
 width: 100%;
 display flex;
 flex-direction: column;
 align-items: center;

 img{
   margin-top: 40px;
 }
`;

const LanguageContainer = styled.div`
  display: flex;
  width: 40%;
  justify-content: center;
  align-items: center;
  input{
    height: 20px;
    margin-right: 40px;
    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: red;
    opacity: .5; /* Firefox */
    text-align: center;
}
  }

`;
const zoomInAnimation = keyframes`${zoomIn}`;
const NextContainer = styled.div`
position: absolute;
height: 100%;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
animation:${zoomInAnimation} .2s ease-in;
flex-direction: column;
  color:white;
  `;

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ unzipFile, saveLanguage, deletePrevious }, dispatch);
};

const mapStateToProps = state => {
  const { loading, language, filesExtracted } = state.translator;
  return { loading, language, filesExtracted };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
