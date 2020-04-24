
import React from "react"

import {TextField} from "@material-ui/core"

import * as data from "../data"
import {setTimeout, clear} from "../utils"
import {e} from "../ui-tools"

import Results from "./results.coffee"

export default class App extends React.Component

  constructor: ->
    super()

    @timer = null

    @state =
      lock: false
      results: []

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

  render: ->
    e '#app',
      style:
        width: '80%'
        margin: 'auto'
        marginTop: 20
      [
        e TextField,
          disabled: @state.lock
          style:
            width: "#{100}%"
            height: 50
            outline: 'none'
            fontSize: "#{16}pt"
            border: 'none'
          onInput: (e) =>
            {value} = e.target
            @resetSearchTimer(value)
        e Results,
          countries: @state.results
      ]
    