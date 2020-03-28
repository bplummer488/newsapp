import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import backupImage from './images/backupImage.gif';
import bgImage from './images/awesome.gif';
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
    let checkLocal;

    if (localStorage.getItem('local') !== null || '') {
      checkLocal = localStorage.getItem('local');
      let localArr = checkLocal.split(',');
      let getSaved = [];
      localArr.forEach(function(element, i) {
        if (i % 2) {
          let item = {
            id: i + Math.random() * 100,
            url: localArr[i - 1],
            title: element
          };
          getSaved.push(item);
        }
      });
      this.setState({
        saved: getSaved
      });
    } else {
      localStorage.removeItem('local');
    }

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
    let id = this.state.saved.length + Math.random() * 100;
    let url = getArr.url;
    let title = getArr.title;
    saveArr.push({
      id,
      url,
      title
    });
    this.setState({
      saved: saveArr
    });

    let getLocal;
    let localArr;
    let checkTitle = title.split(',');
    let getTitle = checkTitle.join('');
    let pushArr = [getTitle, url];

    if (localStorage.getItem('local') !== null || '') {
      getLocal = localStorage.getItem('local');
      localArr = getLocal.split(',');
    } else {
      localStorage.removeItem('local');
      localArr = [];
    }

    pushArr.forEach(function(element) {
      localArr.push(element);
    });

    localStorage.setItem('local', localArr);
  };

  removeArticle = x => {
    let getSaved = this.state.saved;
    let getLocal = localStorage.getItem('local').split(',');
    this.state.saved.forEach(function(element) {
      if (element.id === x) {
        let posititon = getSaved.indexOf(element);
        getSaved.splice(posititon, 1);
        getLocal.splice(posititon * 2, 2);
      }
    });
    this.setState({
      saved: getSaved
    });

    localStorage.setItem('local', getLocal);
  };

  render() {
    const articlesMap = this.state.finalArticles.map(item => {
      let image = item.urlToImage !== null ? item.urlToImage : backupImage;
      let className;
      let first;
      let second;

      let style = {
        color: 'white',
        background: 'black'
      };

      let firstbutton = {
        marginBottom: '10px'
      };

      if (item.id === 0) {
        className = 'col-md-8';
        first = <h4 className='title'>{item.title}</h4>;
        second = (
          <a href={item.url}>
            <img className='img-css' src={image} alt='' />
          </a>
        );
      } else if (item.id === 5) {
        className = 'col-md-6';
      } else if (item.id === 6) {
        className = 'col-md-6';
      } else if (item.id === 11) {
        className = 'col-md-8';
      } else if (item.id === 15) {
        className = 'col-md-6';
      } else if (item.id === 16) {
        className = 'col-md-6';
      } else {
        className = 'col-md-4';
        second = <h4 className='title'>{item.title}</h4>;
        first = (
          <a href={item.url}>
            <img className='img-css' src={image} alt='' />
          </a>
        );
      }
      return (
        <div key={item.id} className={className}>
          <div className='cards-img' style={style}>
            {first}
            <button
              className='add-button'
              style={firstbutton}
              onClick={() => this.saveArticle(item.id)}
            >
              +
            </button>
          </div>
          <div className='cards'>
            {second}
            <p className='description'>{item.description}</p>
            <a className='card-link' href={item.url}>
              Read the full article here...
            </a>
          </div>
        </div>
      );
    });
    return (
      <div>
        <div className='main-scroll'>
          <Header
            changeLanguage={this.languageChange}
            changeLanguageBack={this.languageChangeBack}
            removeFromSaved={this.removeArticle}
            savedArticles={this.state.saved}
            searchBarSubmit={this.handleSubmit}
            searchBarChange={this.handleInputChange}
          />
          <div className='center-bg'>
            <div className='fixed halftone'>
              <img className='bg-image' src={bgImage} alt='background' />
            </div>
          </div>
          <div className='articles-top'>
            <div className='container'>
              <div className='row row-margin'>{articlesMap}</div>
            </div>
          </div>
          <div className='articles-bottom'></div>
        </div>
      </div>
    );
  }
}

export default App;
