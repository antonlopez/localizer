// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import{ bindActionCreators } from 'redux';
import {zoomIn} from 'react-animations';
import styled, {keyframes} from 'styled-components';
import { Link } from 'react-router-dom';
import { MorphIcon, PlusButton } from 'react-svg-buttons';
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
    this.nextStage = this.nextStage.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value});
    this.props.saveLanguage(event.target.value); // get value from text input
  }

  componentWillMount() {
    this.props.deletePrevious();
  }

  nextStage(){
   const {filesExtracted, language, unzipFile, history} = this.props;
   let addFile = '';
   if (language && this.state.value.length > 0 ) {
     addFile = <FileSelector unzipFile={unzipFile} history={history} />
   }

   if (filesExtracted) {
    return (
      <div style={{position:'absolute', height:'100%', width:'100%', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
      <Link to="/translate"><MorphIcon type="arrowRight" size={220} thickness={6} color="	#00FF00" /></Link>
       <p>Start Translating!</p>
      </div>
    );
  }
  else {
    return(<MenuContainer>
      <img height="400" width="800" src={World} alt="world"/>
      <LanguageContainer>
        <input type="text" placeholder="Insert New Language" value={this.state.value || ''} onChange={this.handleChange} />
        {addFile}
    </LanguageContainer>

    </MenuContainer>);

  }

  }

  render() {
    const { unzipFile, language, history, loading, filesExtracted } = this.props;


    return (
      <Container>
        <div className={styles.container} data-tid="container">
          <h2>Localizer</h2>

        </div>
        {loading ?
          <Loading text={"Extracting File..."} />
          :
           this.nextStage()
 }


      </Container>
    );
  }
}

const zoomInAnimationHome = keyframes`${zoomIn}`;
const Container = styled.div``;

const NextContainer = styled.div`
position: absolute;
height: 100%;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
animation:${zoomInAnimationHome} .2s ease-in;
flex-direction: column;
  color:white;
  `;

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




const mapDispatchToProps = dispatch => {
  return bindActionCreators({ unzipFile, saveLanguage, deletePrevious }, dispatch);
};

const mapStateToProps = state => {
  const { loading, language, filesExtracted } = state.translator;
  return { loading, language, filesExtracted };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
