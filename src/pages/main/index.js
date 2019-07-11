import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Creators as FavoriteActions } from '../../store/ducks/favorites';

class Main extends Component {
  static propTypes = {
    addFavoriteRequest: PropTypes.func.isRequired,
    favorites: PropTypes.shape({
      loading: PropTypes.bool,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          description: PropTypes.string,
          url: PropTypes.string,
        }),
      ),
      error: PropTypes.oneOfType([null, PropTypes.string]),
    }).isRequired,
  };

  state = {
    repositoryInput: '',
  };

  HandleAddRepository = (event) => {
    event.preventDefault();
    this.props.addFavoriteRequest(this.state.repositoryInput);
    this.setState({ repositoryInput: '' });
  };

  render() {
    return (
      <>
        <form onSubmit={this.HandleAddRepository}>
          <input
            placeholder="Usuário/Repositório"
            value={this.state.repositoryInput}
            onChange={event => this.setState({ repositoryInput: event.target.value })}
          />
          <button type="submit">Adicionar</button>

          {this.props.favorites.loading && <span>Carregando...</span>}
          {!!this.props.favorites.error && (
            <span style={{ color: '#f00' }}>{this.props.favorites.error}</span>
          )}
        </form>
        <ul>
          {this.props.favorites.data.map(favorite => (
            <li>
              <p>
                <strong>{favorite.name}</strong>
(
                {favorite.description}
)
              </p>
              <a href={favorite.url}>Acessar</a>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

const mapStateToProps = state => ({
  favorites: state.favorites,
});

const mapDispatchToProps = dispatch => bindActionCreators(FavoriteActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
