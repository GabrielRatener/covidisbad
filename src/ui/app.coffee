
import React from "react"

import {
  Paper
  CircularProgress
  Icon
  TextField
  InputAdornment
  Grid
} from "@material-ui/core"

import * as data from "../data"
import {setTimeout, clear} from "../utils"
import {e} from "../ui-tools"

import Chart from "./chart.coffee"
import ButtonBar from "./button-bar.coffee"
import ChartModal from "./chart-modal.coffee"

export default class App extends React.Component

  constructor: ->
    super()

    @timer = null

    @state =
      lock: false
      results: []
      func: 'cumulative'
      country: null # selected country in modal

  isModalOpen: ->
    @state.country != null

  closeModal: ->
    @setState
      country: null
    0

  viewInModal: (index) ->
    @setState
      modal: yes
      country: @state.results[index]
    0

  resetSearchTimer: (term = '') ->
    if @timer
      clear(@timer)

    @setState
      results: []

    if term.length > 0
      @timer = setTimeout 500, () =>
        @setState
          lock: true
          results: []

        @search(term).then (results) =>
          @setState
            lock: false
            results: results

  search: (term = '') ->

    countries = []

    for await country from data.loadCountrySeries term
      countries.push country
      
    countries

  selectFunction: (func) ->
    @setState {func}
    0

  render: ->

    style =
      width: '80%'
      margin: 'auto'
      marginTop: 20
      padding: 10

    e Paper, '#app', {square: yes, elevation: 2, style}, [
      e 'h1',
        style:
          textAlign: 'center'
        ["Covid Blows!"]

      e 'hr'

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
          @resetSearchTimer(value)

      e Grid, {container: yes, spacing: 3}, [
        e Grid, {item: yes, lg: 12}, [
          e ButtonBar,
            onSelect: (selected) =>

              @selectFunction(selected)
              0
        ]

        ...@state.results.map (country, index) =>
          e Grid, {item: yes, xs: 6, key: country.code, style}, [
            e Chart,
              width: 420,
              height: 250
              fn: @state.func
              country: country
              # onClick: () =>
              #   @viewInModal(index)
          ]
      ]

      if @isModalOpen()
        e ChartModal,
          country: @state.country,
          open: yes
          onClose: () =>
            @closeModal()
    ]
    