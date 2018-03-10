import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../App.css';
import { loadCharactersFromAPI } from '../redux/actions';

export class IndexPage extends Component {
  static propTypes = {
    characters: PropTypes.array,
    pages: PropTypes.number,
    pageCounter: PropTypes.number,
    loadCharactersFromAPI: PropTypes.func.isRequired
  };

  static defaultProps = {
    characters: [],
    pages: 0,
    pageCounter: 0
  };

  state = { page: 1, previousDisabled: true, nextDisabled: true };

  componentWillMount() {
    this.props.loadCharactersFromAPI();
  }

  componentWillReceiveProps(nextProps) {
    const nextDisabled = nextProps.pages === this.state.page;

    this.setState({ nextDisabled });
  }

  goToPreviousPage = () => {
    const page = this.state.page - 1;

    this.goToPage(page);
  };

  goToNextPage = () => {
    const page = this.state.page + 1;

    this.goToPage(page);
  };

  goToPage = page => {
    const previousDisabled = page === 1;
    const nextDisabled = this.props.pages === page;

    this.props.loadCharactersFromAPI(page);
    this.setState({ page, previousDisabled, nextDisabled });
  };

  render() {
    debugger;
    const characters = this.props.characters.map(value => (
      <li key={value.id}>{value.name}</li>
    ));
    return (
      <div className="index-page">
        <ul>{characters}</ul>
        <div>
          <button
            disabled={this.state.previousDisabled}
            onClick={this.goToPreviousPage}
          >
            Previous
          </button>
          {this.state.page}
          <button
            disabled={this.state.nextDisabled}
            onClick={this.goToNextPage}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    characters: state.characters,
    pageCounter: state.count,
    pages: state.pages
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadCharactersFromAPI: page => {
      dispatch(loadCharactersFromAPI(page));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
