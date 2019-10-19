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
      ? 'nav-dropdown-show'
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

            <a href={item.url}>Read the full article here...</a>
          </div>
        </div>
      );
    });
    return (
      <div style={headerBack}>
        <div style={headerContainer}>
          <button className='nav-button' onClick={() => this.showMenu()}>
            ☰
          </button>
          <h3 style={headerStyle}>React.Js.News</h3>
          <p style={pStyle}>
            Powered by:{' '}
            <a className='headerA' href='https://newsapi.org/'>
              Newsapi.org
            </a>
          </p>

          <div className={navclassName}>
            <div className='form-container'>
              <form onSubmit={this.props.searchBarSubmit}>
                <input
                  className='login-input'
                  type='text'
                  placeholder='e-mail'
                  name='subject'
                  onChange={this.props.searchBarChange}
                />
                <input
                  className='pass-input'
                  type='text'
                  placeholder='Password'
                  name='subject'
                  onChange={this.props.searchBarChange}
                />
                <button className='search-button'>></button>
              </form>
            </div>

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

const headerBack = {
  position: 'fixed',
  width: '100%',
  background: 'grey',
  zIndex: '1',
  top: '0',
  margin: '0',
  boxShadow: '1px 2px 8px rgba(0, 0, 0, 0.25)'
};

const headerContainer = {
  maxWidth: '1000px',
  margin: '0 auto',
  padding: '10px'
};

const headerStyle = {
  color: 'white',
  margin: '0'
};

const pStyle = {
  color: 'white',
  margin: '0'
};

export default Header;
