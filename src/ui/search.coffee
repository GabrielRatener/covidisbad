
import React from "react"

import {
  TextField
  InputAdornment
  CircularProgress
  Icon
} from "@material-ui/core"

import {e} from "../ui-tools"

import {setTimeout, clear} from "../utils"

import * as data from "../data"

loadCountries = (term) =>
  countries = []

  for await country from data.loadCountrySeries(term)
    countries.push country
  
  countries

export default class Search extends React.Component

  constructor: ->
    super()

    @state =
      lock: false
      term: ''
      timer: null

  resetSearch: (term = '') ->

    if @state.timer != null

      clear(@state.timer)

    if term == ''
      timer = null
    else
      timer = setTimeout 500, () =>

        @setState {lock: yes}
        
        loadCountries(term).then (results) =>

          @setState {lock: no}

          @props.onResults.apply @, [results]
          0
            
    @setState {term, timer}
    0

  render: ->

    e TextField,
      placeholder: 'Search countries'
      disabled: @state.lock
      inputProps:
        style:
          fontSize: "#{32}pt"
      InputProps:
        endAdornment:
          e InputAdornment, {position: 'end'}, [
            if @state.lock
              e CircularProgress, {color: 'primary', margin: 5}
            else
              e Icon, {fontSize: 'large'}, ['search']
          ]
      style:
        width: "#{100}%"
      onInput: (e) =>
        {value} = e.target
        @resetSearch(value)

