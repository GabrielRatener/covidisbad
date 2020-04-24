
import React from "react"

import {Grid, Button} from "@material-ui/core"

import {e, tn} from "../ui-tools.js"
import {functions} from "../functions.js"
import * as data from "../data.js"
import Chart from "./chart.coffee"

export default class App extends React.Component
  constructor: () ->
    super()

    @state =
      chunkSize: 3
      color: '#eee'
      selected: 'cumulative'

  selectFunction: (name) ->
    @setState
      selected: name
    0

  render: () ->

    e Grid, {container: yes, spacing: 3}, [
      e Grid, {item: yes, lg: 12}, [
        ...Object.entries(functions)
          .filter(([name, {title}]) => !!title)
          .map ([name, {title}]) =>

            e Button,
              key: name
              style:
                margin: 5
              onClick: () =>
                @selectFunction(name)
              [
                tn title
              ]
      ]

      ...@props.countries.map (country) =>
        e Grid, {item: yes, lg: 4, key: country.code}, [
          e Chart,
            fn: @state.selected
            country: country
        ]
    ]




