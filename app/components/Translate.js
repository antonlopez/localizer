// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import{ bindActionCreators } from 'redux';
import { zoomIn } from 'react-animations';
import styled, {keyframes} from 'styled-components';
import { Link } from 'react-router-dom';
import electron from 'electron';
import { MorphIcon, PlusButton, HomeButton } from 'react-svg-buttons'
const fs = electron.remote.require('fs');
import World from '../Assets/Images/world.png';
import styles from './Home.css';
import FileSelector from './FileSelector';
import { unzipFile, saveLanguage, saveTranslation, generateFile } from '../actions';
import TextInputsContainer from './TextInputs';
import Loading from './loading';
//import mockup from '../extracted/translateKeys.json';


type Props = {};

class Translate extends Component<Props> {
  props: Props;
  constructor(props) {
    super(props);
    this.state = { counter: 0, width: 0, height:0 };
    this.handleChange = this.handleChange.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  handleChange(event) {
    this.setState({ value: event.target.value});
    this.props.saveLanguage(event.target.value); // get value from text input
  }

  nextTranslation() {
    const { manifest, saveTranslation, translation, language, generateFile } = this.props;
    const { counter } = this.state;
    let result = {};

   if (counter + 1 < manifest.length ) {

    this.setState({ counter: this.state.counter + 1 });
  } else {
    //download
    result[language] = translation;
   generateFile(result, language);

  }


 }

  render() {
    const { unzipFile, language, files, manifest, saveTranslation, translation, generatingFile, fileGenerated } = this.props;
    const { counter, width } = this.state;
    let textButton = 'Next';
    let topText = 'You are translating into:';
    let arrowDirection = "arrowRight";
     if (counter + 1 === manifest.length) {
        textButton = 'Get File';
        arrowDirection = "arrowDown";
     }
     if(fileGenerated) {
    topText = 'You translated into:'
     }

    return (
      <Container>
        <div className={styles.container} data-tid="container">
          <h2>Localizer</h2>

        </div>
        <TranslatingContainer changeStyl={width < 1200 }><p>{topText} <p style={{color:'#00FF00'}}>{language}</p></p></TranslatingContainer>
        {generatingFile ? <Loading text={"Generating file..."} />
        :
        fileGenerated ?
        <FinalContainer>
          <Link to="/"><MorphIcon type="home" size={220} thickness={6} color="	#00FF00" /></Link>
          <p>Your file has been generated on Desktop!</p>
        </FinalContainer>
        :
        <MenuContainer>
          <Img src={manifest[counter].img_url} alt="world" />
          <UserInteractionContainer>
              <div>
                 {manifest[counter].text.map((tx,index) => <TextInputsContainer
                   ref = {this.textInputsContainer}
                   key={index}
                   counter={counter}
                   saveTranslation={saveTranslation}
                   translation={translation}
                   text={tx}
                   devId={index}
                   devKeys={manifest[counter].devKeys}
                   nextTranslation={()=>this.nextTranslation()}

                    />)}
                    <Button changeStyl={width < 1200 } onClick={()=> this.nextTranslation()} >{textButton} <MorphIcon type={arrowDirection} size={20} thickness={1} color="#FFF" /></Button>
              </div>


          </UserInteractionContainer>


        </MenuContainer>

      }

      </Container>
    );
  }
}


const zoomInAnimation = keyframes`${zoomIn}`
const Container = styled.div`

`;

const Img = styled.img`
 height: 65vh;
 width: 60wv;
`;


const Button = styled.button`
  position: absolute;
  top: 80%;
  left: ${props => props.changeStyl ? ' 900px' : '75%'};
  display: flex;
  align-items: center;
  justify-content:center;
  text-align: center;
  color: white;
  background: linear-gradient(to bottom, #56ab2f, #a8e063);
  height:50px;
  width:250px;
  font-size: 20px;
  font-weight: 100;
  border: none;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;

const FinalContainer = styled.div`
position: absolute;
height: 100%;
width: 100%;
top:0;
left:0;
display: flex;
align-items: center;
justify-content: center;
flex-direction:column;
animation: ${zoomInAnimation} .2s ease-in;
`;


const UserInteractionContainer = styled.div`
      width: 32%;

`;

const TranslatingContainer = styled.div`
    position: absolute;
    top:4%;
    left:${props => props.changeStyl ? ' 920px' : '80%'};

`;



const MenuContainer = styled.div`
display:flex;
justify-content: space-around;
padding-top:10%;
 height: 100%;
 width: 100%;
 display flex;
 flex-direction: row;
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

const NextContainer = styled.div`
  margin-left: 40px;
  `;

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ unzipFile, saveLanguage, saveTranslation, generateFile }, dispatch);
};

const mapStateToProps = state => {
  const { loading, language, manifest, translation, generatingFile, fileGenerated } = state.translator;
  return { loading, language, manifest, translation, generatingFile, fileGenerated };
}

export default connect(mapStateToProps, mapDispatchToProps)(Translate);
