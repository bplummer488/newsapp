this.changeNews = this.changeNews.bind(this);

changeNews(n){

    let checkN = String(n);
    let stringN = String(this.state.subject);
    let checkState = stringN.length;
    let checkWS = checkN.trim().length;
    console.log(checkState);
    console.log('hello' + checkWS);
    
    if (checkState > 1){
      if (checkWS > 1){
        this.setState({
          subject: n.target.value
        });
      } else if (checkWS < 1){
        this.setState({
          subject: 'news'
        });
      }

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

      console.log(this.state.subject);

    } else {
    
      this.setState({
        subject: 'news'
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

      console.log(this.state.subject);
    }
  }


  <input type="text" onChange={this.changeNews}/>