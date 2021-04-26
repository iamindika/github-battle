import React from 'react';
import { RuntimeGlobals } from 'webpack';

export default class Popular extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      selectedLanguage: 'All'
    }

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage
    });
  }

  render() {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    console.log(`Selected Language: ${this.state.selectedLanguage}`);
    return (
      <ul className='flex-center'>
        {languages.map((language) => (
          <li key={language}>
            <button 
              className='btn-clear nav-link'
              style={language === this.state.selectedLanguage ? {color: 'rgb(187, 46, 31)'} : null}
              onClick={() => this.updateLanguage(language)}
            >
              {language}
            </button>
          </li>
        ))}
      </ul>
    )
  }
}