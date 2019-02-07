import React, { Component } from 'react';

import 'typeface-roboto';
import './App.css'
import CssBaseline from '@material-ui/core/CssBaseline';

import Form from './components/Form'
import Navigation from './components/Navigation'
import Article from './components/Article'
import Footer from './components/Footer'

const API_KEY = 'ed0429d83eed40febac227e116d45763'

class App extends Component {
  state = {
    keyword: '',
    articles: [],
    status: true
  }

  getNews = async(event) => {
    event.preventDefault()
    console.log(this.state)

    const query = event.target.elements.keyword.value


    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}&pageSize=3`

    console.log(url)

    const api_call = await fetch(url)

    const data = await api_call.json()

    console.log('data', data)
    console.log('status:', data.status)
    console.log('articles:', data.articles)
    
    if (data.status == 'ok'){
      this.setState({
        articles: data.articles,
        keyword: query,
        status: true
      })
    } else {
      this.setState({
        status: false,
        error: `Error, Please input some keyword.`
      })
    }
  }

  handleOnChange = async(event, value) => {
    console.log(value)
    await this.setState({
      countryCode: value
    })

    let url = ''

    if(value == ''){
      url = `https://newsapi.org/v2/everything?q=${this.state.keyword}&apiKey=${API_KEY}&pageSize=3`
    } else {
      url = `https://newsapi.org/v2/top-headlines?country=${value}&apiKey=${API_KEY}&pageSize=3`
    }

    console.log(url)

    const api_call = await fetch(url)

    const data = await api_call.json()

    console.log('data', data)
    console.log('status:', data.status)
    console.log('articles:', data.articles)
    
    if (data.status == 'ok'){
      this.setState({
        articles: data.articles,
        status: true
      })
    } else {
      this.setState({
        status: false,
        error: `Cound not find any news.`
      })
    }

  }
  render() {
    return (
      <CssBaseline>
        <div className='wrapper'>
          <div className='title'>
            <h1>React News App</h1>
          </div>
          <Form 
            getNews = {this.getNews}
          />
          <Navigation 
            value = { this.props.value}
            onChange = { this.handleOnChange}
          />
          <div className='news_section'>
            {!this.state.status && <p style={{textAlign: 'center'}}>{this.state.error}</p>}
            {this.state.status && this.state.articles.map((article) => {
              return (
                <Article
                source={article.source.name}
                author={article.author}
                title={article.title}
                description={article.description}
                url={article.url}
                urlToImage={article.urlToImage}
                publishedAt={article.publishedAt}
                content={article.content}
              />
            )})}
          </div>
          <Footer />
        </div> 
      </CssBaseline>
    );
  }
}

export default App;
