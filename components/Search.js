import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, ActivityIndicator } from 'react-native'
import FilmList from './FilmList'
import { getFilms } from '../API/TMDBApi'

class Search extends React.Component {

  constructor(props) {
    super(props)
    this.searchedText = ""
    this.page = 0 //Compteur pour connaître la pae courante
    this.totalPages= 0 // Nombres de pages pour savoir si on a atteint la fin des retours de l'API
    this.state = {
      films: [],
      isLoading: false // Par défaut à false car il n'y a pas de chargement tant qu'on ne lance pas de recherche
    }
  }

  _displayDetailForFilm = (idFilm) => {
    this.props.navigation.navigate("FilmDetail", {idFilm: idFilm})
  }

  _loadFilms() {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true }) // Lancement du chargement
      getFilms(this.searchedText, this.page+1).then(data => {
        this.page = data.page
        this.totalPages = data.total_pages
          this.setState({
            films: this.state.films.concat(data.results),
            isLoading: false // Arrêt du chargement
          })
      })
    }
  }

  _inputTextChanged(text){
    this.searchedText = text;
    this.page = 0;
    this.totalPages = 0
    this.setState({
      films: []
    }, () => {
      this._loadFilms();
    })
  }

  _displayLoading() {
      if (this.state.isLoading) {
        return (
          <View style={styles.loading_container}>
            <ActivityIndicator size='large' />
          </View>
        )
      }
    }

  render() {
    return (
      <View style={styles.main_container}>
        <TextInput
          style={ styles.textinput }
          placeholder='Titre du film'
          onChangeText={(text) => this._inputTextChanged(text)}
          /*onSubmitEditing={() => this._loadFilms()}*/
        />
        {/*<Button title='Rechercher' onPress={() => this._loadFilms()}/>*/}
        <FilmList
          films = { this.state.films}
          navigation = { this.props.navigation}
          loadFilms = {this._loadFilms.bind(this)}
          page= {this.page}
          totalPages={this.totalPages}
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Search
