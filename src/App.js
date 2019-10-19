import React, { Component } from 'react';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      date: '',
      subject: 'Comics',
      key: '',
      language: 'n',
      saved: [],
      finalArticles: []
    };
  }

  componentDidMount() {
    //Get Date
    var tempDate = new Date();
    var today =
      tempDate.getFullYear() +
      '-' +
      (tempDate.getMonth() + 1) +
      '-' +
      tempDate.getDate();
    //Set Date
    this.setState({
      date: today
    });

    let url =
      'https://newsapi.org/v2/everything?q=' +
      this.state.subject +
      '&from=' +
      this.state.date +
      '&language=e' +
      this.state.language +
      '&sortBy=publishedAt&apiKey=6375d648dfa245cf86fc6795b17b6a25';

    this.setState({
      key: url
    });

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.setState({
          articles: myJson.articles
        });

        const getArticles = this.state.articles;
        const getLenght = this.state.articles.length;
        const newArticles = [];

        for (let i = 0; i < getLenght; i++) {
          let id = i;
          let getArr = getArticles[i];
          let author = getArr.author;
          let url = getArr.url;
          let description = getArr.description;
          let title = getArr.title;
          let urlToImage = getArr.urlToImage;
          newArticles.push({
            id,
            author,
            url,
            description,
            title,
            urlToImage
          });
        }

        this.setState({
          finalArticles: newArticles
        });
      });
  }

  handleSubmit = event => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value
    });

    this.refetch();
  };

  handleInputChange = event => {
    event.preventDefault();

    //Check To Make Sure VALUE Is Not White Space
    if (event.target.value.trim().length > 0) {
      //Sets Value And Removes White Space Infront Of Value
      this.setState({
        [event.target.name]: event.target.value.trim()
      });
    }
  };

  languageChange = () => {
    this.setState({ language: 's' }, this.refetch);
  };

  languageChangeBack = () => {
    this.setState(
      {
        language: 'n'
      },
      this.refetch
    );
  };

  refetch = () => {
    let url =
      'https://newsapi.org/v2/everything?q=' +
      this.state.subject +
      '&from=' +
      this.state.date +
      '&language=e' +
      this.state.language +
      '&sortBy=publishedAt&apiKey=6375d648dfa245cf86fc6795b17b6a25';

    this.setState({
      key: url
    });

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.setState({
          articles: myJson.articles
        });

        const getArticles = this.state.articles;
        const getLenght = this.state.articles.length;
        const newArticles = [];

        for (let i = 0; i < getLenght; i++) {
          let id = i;
          let getArr = getArticles[i];
          let author = getArr.author;
          let url = getArr.url;
          let description = getArr.description;
          let title = getArr.title;
          let urlToImage = getArr.urlToImage;
          newArticles.push({
            id,
            author,
            url,
            description,
            title,
            urlToImage
          });
        }

        this.setState({
          finalArticles: newArticles
        });
      });
  };

  saveArticle = x => {
    let saveArr = this.state.saved;
    let getArr = this.state.finalArticles[x];
    let id = this.state.saved.length + 100;
    let author = getArr.author;
    let url = getArr.url;
    let description = getArr.description;
    let title = getArr.title;
    let urlToImage = getArr.urlToImage;
    saveArr.push({
      id,
      author,
      url,
      description,
      title,
      urlToImage
    });
    this.setState({
      saved: saveArr
    });
  };

  removeArticle = x => {
    var getSaved = this.state.saved;
    this.state.saved.forEach(function(element) {
      if (element.id === x) {
        let posititon = getSaved.indexOf(element);
        getSaved.splice(posititon, 1);
      }
    });
    this.setState({
      saved: getSaved
    });
  };

  render() {
    const articlesMap = this.state.finalArticles.map(item => {
      return (
        <div key={item.id} className='col-md-4'>
          <div className='cards-img'>
            <a href={item.url}>
              <img className='img-css' src={item.urlToImage} alt='' />
            </a>
            <button
              className='add-button'
              onClick={() => this.saveArticle(item.id)}
            >
              +
            </button>
          </div>
          <div className='cards'>
            <h3 className='title'>{item.title}</h3>
            <h4 className='author'>Written by {item.author}</h4>

            <p>{item.description}</p>
            <a href={item.url}>Read the full article here...</a>
          </div>
        </div>
      );
    });
    return (
      <div className='App'>
        <Header
          changeLanguage={this.languageChange}
          changeLanguageBack={this.languageChangeBack}
          removeFromSaved={this.removeArticle}
          savedArticles={this.state.saved}
          searchBarSubmit={this.handleSubmit}
          searchBarChange={this.handleInputChange}
        />
        <div className='articles-top'>
          <div className='container'>
            <div className='row row-margin'>{articlesMap}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
