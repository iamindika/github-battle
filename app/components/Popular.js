import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';

function LanguagesNav({selected, onUpdateLanguage}){
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className='flex-center'>
      {languages.map((language) => (
        <li 
          key={language}
          style={language === selected 
            ? {color: 'rgb(187, 46, 31)'} 
            : null}
          onClick={() => onUpdateLanguage(language)}
        >
          <button className='btn-clear nav-link'>
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
}

function ReposGrid({repos}){
  return (
    <ul>
      <pre>{JSON.stringify(repos, null, 2)}</pre>
    </ul>
  )
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

export default class Popular extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      selectedLanguage: 'All',
      repos: {},
      error: null
    }

    this.updateLanguage = this.updateLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount(){
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
      error: null
    });

    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
      .then(data => {
        this.setState(({ repos }) => ({
          repos: {
            ...repos,
            [selectedLanguage]: data
          }
        }))
      })
      .catch(() => {
        console.warn('Error fetching repos: ', error);

        this.setState({
          error: 'There was an error fetching the repositories.'
        })
      }) 
    }
  }

  isLoading(){
    const { selectedLanguage, repos, error } = this.state;

    return !repos[selectedLanguage] && error === null;
  }

  render() {
    const { selectedLanguage, repos, error } = this.state;

    return (
      <React.Fragment>
        <LanguagesNav 
        selected={selectedLanguage} 
        onUpdateLanguage={this.updateLanguage}
        />

        {this.isLoading() && <p>LOADING</p>}

        {error && <p>{error}</p>}

        {repos[selectedLanguage] 
          && <ReposGrid repos={repos[selectedLanguage]} />}
      </React.Fragment>
    )
  }
}