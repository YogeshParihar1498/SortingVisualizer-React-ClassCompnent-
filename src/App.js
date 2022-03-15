import { createContext } from 'react';
import Reat, {Component} from 'react';
import Bar from'./components/Bar';
import './App.css';
import BubbleSort from './algorithms/Bs';

//icons

import Play from "@module-ui/icons/PlayCircleOutLineRounded";
import Forward from '@materila-ui/icons/SkipNextRounded';
import Backward from '@materila-ui/icons/SkipPreviousRounded';
import RotateLeft from '@materila-ui/icons/RotateLeft';

class App  extends Component {
  state = {
    array:[],
    arraySteps:[],
    colorKey:[],
    colorSteps:[],
    currentSteps:0,
    count:10,
    delay:100,
    algorithm:'Bubble Sort',
    timeouts:[],


    };
   ALGORITHMs = {
     'Bubble Sort' : BubbleSort,

   }
    componentDidMount(){
      this.generateRandomArray();
    }

    generateSteps = () => {
      let array=this.state.array.slice();
      let steps= this.state.arraySteps.slice();
      let colorSteps=this.state.colorSteps.slice();
        
      this.ALGORITHMS[this.state.algorithm](array,0,steps,colorSteps);
      this.setState({
        arraySteps:steps,
        colorSteps:colorSteps
      });
     
    };

    clearTimeouts= () =>{
      this.state.timeouts.forEach(timeout) => clearTimeout (timeout));
      this.setState({
        timeouts: [] ,
      });
        
      
    };

    clearColorKey = () => {
      let blankKey= new Array(this.state.count).fill(0);
           this.setState({
             colorKey: blankKey;
             colorSteps:[blankKey]
           });
    };

    generateRandomNumber=(min , max) => {

      return Math.floor(Math.random() * (max-min)+min);
    };
    
    generateRandomArray= () => {
      this.clearTimeouts();
      this.clearColorKey()
          const count=this.state.count;
          const temp = [];

          for(let i=0;i<count;i++){
            temp.push(this.generateRandomNumber(50,200));
          }

          this.setState({
            array:temp,
            arraySteps:[temp],
            currentSteps:0,
          },() => {
            this.generateSteps();
          
          });
  


    } ;

    changeArray= (index,value) =>{
      let arr = this.state.array;
      arr[index]=value;
      this.setState({
        array: arr,
        arraySteps:[arr],
        currentSteps:0,
      }, () => {
        this.generateSteps();
      });
    } ;

    previousStep = () =>{
     let currentSteps=this.state.currentSteps;
     if(currentSteps === 0) return;
     currentSteps -=1;
     this.getState({
       currentSteps= currentSteps;
       array: this.state.arraySteps[currentSteps],
       colorKey:this.state.colorSteps[currentSteps]
     });
    };
    nextStep = () =>{
      let currentSteps=this.state.currentSteps;
     if(currentSteps >= this.state.arraySteps.length -1) return;
     currentSteps +=1;
     this.getState({
       currentSteps= currentSteps;
       array: this.state.arraySteps[currentSteps],
       colorKey:this.state.colorSteps[currentSteps]
     });
    };

    start = () =>
    {
      let steps=this.state.arraySteps;
      let colorSteps=this.state.colorSteps;
    this.clearTimeouts();


      let timeouts = [];
      let i= 0;
       while(i<steps.length - this.state.currentSteps){
        let timeout = setTimeout(() => {
          let currentSteps=this.state.currentSteps;
          this.setState({
            array: steps[currentSteps],
            colorKey: colorSteps[currentSteps],
            currentSteps=currentSteps+1;
          });
          timeouts.push(timeout)
        },this,state.delay * i);
        i ++;
       }
       this.setState({
         timeouts: timeouts
       })
    };
  render() { 
    let bars=this.state.array.map(value,index) => (
      <Bar 
      key={index} 
      index={index}
       length={value} 
       color={this.state.colorKey[index]}
       changeArray={this.changeArray}

        />
        
    ));

    let playButton;

    if(this.state.arraySteps.length === this.state.currentSteps){
      playButton={
        <button className="controller" onClick={this.generateRandomArray}>
        <RotateLeft />
        </button>
      }
    }
    esle{
      {
        playButton={
          <button className="controller" onClick={this.start}>
          <Play/>
          </button>
        };
     
    }

    return <div className='app'>
      
      <div className='frame'>
        <div className='barsDiv container card'>{bars}</div>
      </div>
      <div className='control-pannel'>
        <div className='control-buttons'>
        <button className="controller" onClick={this.previousStep}>
          <Backward/>
          </button>{playButton}
          <button className="controller" onClick= {this.nextStep}>
          <Forward/>
          </button>
        </div>
      </div>
      <div className='pannel'></div>
    </div>;
  }
}
 


export default App;

