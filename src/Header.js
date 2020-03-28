import React, { Component } from 'react';

class Header extends Component {
  state = {
    clicked: false,
    savedclicked: false
  };

  showMenu = () => {
    if (this.state.clicked === false) {
      this.setState({
        clicked: true
      });
    } else {
      this.setState({
        clicked: false
      });
    }
  };

  showSaved = () => {
    if (this.state.savedclicked === false) {
      this.setState({
        savedclicked: true
      });
    } else {
      this.setState({
        savedclicked: false
      });
    }
  };

  render() {
    var navclassName = this.state.clicked
      ? 'nav-dropdown-show main-nav'
      : 'nav-dropdown';
    var savedclassName = this.state.savedclicked
      ? 'nav-dropdown-show scroll'
      : 'nav-dropdown scroll';
    var numberOfSaved = this.props.savedArticles.length;
    const articlesMap = this.props.savedArticles.map(item => {
      return (
        <div key={item.id} className='saved-contained'>
          <div className='saved-card'>
            <button
              className='add-button'
              onClick={this.props.removeFromSaved.bind(null, item.id)}
            >
              -
            </button>

            <h3 className='title'>{item.title}</h3>

            <a className='card-link' href={item.url}>
              Read the full article here...
            </a>
          </div>
        </div>
      );
    });
    return (
      <div className='header'>
        <div className='container'>
          <button className='nav-button' onClick={() => this.showMenu()}>
            ☰
          </button>
          <h3 className='header-title'>React.Js.News</h3>
          <p className='p-title'>
            Powered by:{' '}
            <a className='headerA' href='https://newsapi.org/'>
              Newsapi.org
            </a>
          </p>
          <hr />
          <div className={navclassName}>
            <div onClick={() => this.showMenu()} className='exit'></div>
          </div>
          <div className={navclassName}>
            <div className='form-container'>
              <form onSubmit={this.props.searchBarSubmit}>
                <input
                  className='search-input'
                  type='text'
                  placeholder='Search'
                  name='subject'
                  onChange={this.props.searchBarChange}
                />
                <button className='search-button'>></button>
              </form>
            </div>
            <div className='lang-button-container parent'>
              <button
                className='lang-button'
                onClick={this.props.changeLanguage}
              >
                Espanol
              </button>
              <button
                className='lang-button'
                onClick={this.props.changeLanguageBack}
              >
                English
              </button>
              <button
                className='lang-button parent'
                onClick={() => this.showSaved()}
              >
                Saved
              </button>
              <div className='child'>
                <p className='nos-style'>{numberOfSaved}</p>
              </div>
            </div>

            <div className={savedclassName}>{articlesMap}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
