import React, { Component } from 'react';
import Header from "./Header";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      articles:[],
      date: '',
      subject: 'Marvel Comics',
      key: ''
    };
  }

  

  componentDidMount(){

    //Get Date
    var tempDate = new Date();
    var today = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate();
    //Set Date
    this.setState({
      date: today 
    });

    let url = 'https://newsapi.org/v2/everything?q='+this.state.subject+'&from='+this.state.date+'&sortBy=publishedAt&apiKey=6375d648dfa245cf86fc6795b17b6a25';

    this.setState({
      key: url 
    });

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        this.setState({ 
          articles: myJson.articles
        });
      });
    }
    
    
    handleSubmit = (event) => {

      event.preventDefault();
      
      this.setState({
        [event.target.name]: event.target.value
      })

      let url = 'https://newsapi.org/v2/everything?q='+this.state.subject+'&from='+this.state.date+'&sortBy=publishedAt&apiKey=6375d648dfa245cf86fc6795b17b6a25';

      this.setState({
        key: url 
      });

      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          this.setState({ 
            articles: myJson.articles
          });
        });
    }

    handleInputChange = (event) => {
      event.preventDefault();

      //Check To Make Sure VALUE Is Not White Space
      if(event.target.value.trim().length > 0){

        //Sets Value And Removes White Space Infront Of Value
        this.setState({
          [event.target.name]: event.target.value.trim()
        });
      }
    }

  render() {
    return (
      <div className="App">
        <Header />
          <div className="container">
            <div className="form-container">
              <form onSubmit={this.handleSubmit}>
                  <input type='text' placeholder='Search' name='subject' onChange={this.handleInputChange}/>
                  <button>></button>
              </form>
            </div>
            
            {this.state.articles.map((item) => {
              return(
                <div key={Math.random()} className="cards">
                  <div key={Math.random()}>
                    <div key={Math.random()} className="cards-top">
                      <h2 key={Math.random()} className="title">{item.title}</h2>
                      <h4 key={Math.random()} className="author">Written by {item.author}</h4>
                      <p key={Math.random()} className="date">{this.state.date}</p>
                    </div>
                    <div key={Math.random()} className="img-container">
                      <img key={Math.random()} className="img-css" src={item.urlToImage} alt=""/>
                    </div>
                    <div key={Math.random()} className="cards-bottom">
                      <p key={Math.random()}>{item.description}</p>
                      <a key={Math.random()} href={item.url}>Read the full article here...</a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    )
  }
}

export default App

