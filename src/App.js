import React from 'react';
import './App.css';
import Header from './Header';
import axios from 'axios';
import City from './City';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        value: "",
        cities:""
    }

   
  }

  inputValues = (event) =>{
    this.setState({value: event.target.value})   
  }

  getData = (e) =>{
    e.preventDefault();
    let zipcode = this.state.value;
    if(this.state.value.length ==5){
      axios.get("http://ctp-zip-api.herokuapp.com/zip/"+zipcode)
      .then( (response) =>{
        console.log(response.data)
          this.setState({cities: response.data})
      })
      .catch( (error) =>{
        
      });
    }

  }
  createCities(){
    let container = [];
    for(let i=0; i< this.state.cities.length; i++){
      let oneCity = this.state.cities[i];
      container.push(<City key={oneCity.RecordNumber} city={oneCity.City} cState={oneCity.State} location={oneCity.Location} population={oneCity.EstimatedPopulation} wages={oneCity.TotalWages} />  );

    }
    return container;
  }

  // componentDidMount(){
  //   this.timer = setInterval(()=>{
  //     this.getData();
  //   }, 500)
    
    
  // }

  // componentWillMount(){
  //   clearInterval(this.timer);
  // }

  // componentDidUpdate(){
  //   console.log("component did update"); 
  //   this.getData();
  // }

  render(){
    
    return (
      <div>
         <Header header="Zip Code Search" />
        
         <form className='input-getter-div' onSubmit={this.getData}>
            <label htmlFor="input-box">Zip code:</label>
            <input id="input-box" type="text" onChange={this.inputValues} value={this.state.value} placeholder="Try 10016 and hit enter" />
         </form>

         <div>{this.createCities()}</div>

         
      </div>
    )
  }
}

export default App;
