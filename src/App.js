import React, { Component } from 'react';
import Header from "./Header";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      articles:[],
      date: '',
      subject: 'Marvel Comics',
      key: '',
      language: 'n'
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

    let url = 'https://newsapi.org/v2/everything?q='+this.state.subject+'&from='+this.state.date+'&language=e'+this.state.language+'&sortBy=publishedAt&apiKey=6375d648dfa245cf86fc6795b17b6a25';

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

      this.refetch();
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

    languageChange = () => {
      this.setState({language: 's'}, this.refetch );

      
    }

    languageChangeBack = () => {
      this.setState({
        language: 'n'}, this.refetch );


    }

    refetch = () =>{
      let url = 'https://newsapi.org/v2/everything?q='+this.state.subject+'&from='+this.state.date+'&language=e'+this.state.language+'&sortBy=publishedAt&apiKey=6375d648dfa245cf86fc6795b17b6a25';

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
              <br/>
              <button className="langButton" onClick={this.languageChange}>Espanol</button>
              <button className="langButton"  onClick={this.languageChangeBack}>English</button>
            </div>
            
            {this.state.articles.map((item) => {
              return(
                <div key={Math.random()} className="cards">
                    <div className="cards-top">
                      <h3 className="title">{item.title}</h3>
                      <h4 className="author">Written by {item.author}</h4>
                    </div>
                    <div className="img-container">
                      <img className="img-css" src={item.urlToImage} alt=""/>
                    </div>
                    <div className="cards-bottom">
                      <p>{item.description}</p>
                      <a href={item.url}>Read the full article here...</a>
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

