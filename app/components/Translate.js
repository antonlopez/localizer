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

   previousTranslation() {
       const { counter, width } = this.state;
       const{manifest} = this.props;

       if (counter  > 0 ) {

        this.setState({ counter: this.state.counter - 1 });
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
     const devKeys = manifest[counter].devKeys;

    return (
      <Container>
        <div className={styles.container} data-tid="container">
          <h2>Localizer</h2>

        </div>
        <TranslatingContainer changeStyl={width < 1200 }><p>{topText} <p style={{color:'#00FF00'}}>{language}</p></p></TranslatingContainer>
        {generatingFile ? <Loading text={"Generating file..."} />
        :
        fileGenerated ?
        <div style={{position:'absolute', height:'100%', width:'100%', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
          <Link to="/"><MorphIcon type="home" size={220} thickness={6} color="	#00FF00" /></Link>
          <p>Your file has been generated on Desktop!</p>
        </div>
        :
        <MenuContainer>
          <Img src={manifest[counter].img_url} alt="world" />
          <UserInteractionContainer>
              <div>
                 {manifest[counter].text.map((tx,index) => <TextInputsContainer
                   key={index}
                   counter={counter}
                   inputValue={ translation ? translation[devKeys[index]] : null }
                   saveTranslation={saveTranslation}
                   translation={translation}
                   text={tx}
                   devId={index}
                   devKeys={devKeys}
                   nextTranslation={()=>this.nextTranslation()}

                    />)}
                    <Button changeStyl={width < 1200 } onClick={()=> this.nextTranslation()} >{textButton} <MorphIcon type={arrowDirection} size={20} thickness={1} color="#FFF" /></Button>
                    {counter > 0 ?<BackButton  onClick={()=> this.previousTranslation()} ><MorphIcon type="arrowLeft" size={20} thickness={1} color="#FFF" /> Back </BackButton>: ''}
              </div>


          </UserInteractionContainer>


        </MenuContainer>

      }

      </Container>
    );
  }
}


const zoomInAnimationTranslate = keyframes`${zoomIn}`
const Container = styled.div`

`;

const Img = styled.img`
 height: 65vh;
 width: 60wv;
`;


const Button = styled.button`
  position: absolute;
  top: 80%;
  left: ${props => props.changeStyl ? ' 900px' : '85%'};
  display: flex;
  align-items: center;
  justify-content:center;
  text-align: center;
  color: white;
  border: 2px solid black;
  background-color: transparent;
  border-color: #32CD32;
  height:50px;
  width:150px;
  font-size: 20px;
  font-weight: 100;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  outline:none;
  :hover{
    background-color: #32CD32;
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 80%;
  left: ${props => props.changeStyl ? ' 900px' : '70%'};
  display: flex;
  align-items: center;
  justify-content:center;
  text-align: center;
  color: white;
  background-color: transparent;
  height:50px;
  width:150px;
  font-size: 20px;
  font-weight: 100;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  outline:none;
  border: 2px solid black;
  border-color: #DC143C;
  :hover{
    background-color: #DC143C;
  }
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
animation: ${zoomInAnimationTranslate} .2s ease-in;
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


const mapDispatchToProps = dispatch => {
  return bindActionCreators({ unzipFile, saveLanguage, saveTranslation, generateFile }, dispatch);
};

const mapStateToProps = state => {
  const { loading, language, manifest, translation, generatingFile, fileGenerated  } = state.translator;
  return { loading, language, manifest, translation, generatingFile, fileGenerated };
}

export default connect(mapStateToProps, mapDispatchToProps)(Translate);
