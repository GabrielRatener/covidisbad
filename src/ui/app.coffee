
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
import Search from "./search.coffee"

export default class App extends React.Component

  constructor: ->
    super()

    @state =
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

  selectFunction: (func) ->
    @setState {func}
    0

  setResults: (results) ->
    @setState {results}
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

      e Search,
        onResults: (results) =>
          @setResults(results)
          0

      e Grid, {container: yes, spacing: 3}, [
        e Grid, {item: yes, lg: 12}, [
          e ButtonBar,
            onSelect: (selected) =>

              @selectFunction(selected)
              0
        ]

        ...@state.results.map (country, index) =>
          e Grid,
            item: yes
            xs: 6
            key: country.code
            style:
              textAlign: 'left'
            [
              e Chart,
                width: 420,
                height: 250
                fn: @state.func
                country: country
                onClick: () =>
                  @viewInModal(index)
            ]
      ]

      if @isModalOpen()
        e ChartModal,
          country: @state.country,
          open: yes
          onClose: () =>
            @closeModal()
    ]
    