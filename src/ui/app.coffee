
import React from "react"
import {e} from "../ui-tools.js"
import * as data from "../data.js"

import {LineChart, XAxis, YAxis, CartesianGrid, Line} from "recharts"

fn = (item, index, series) =>
  index

export default class App extends React.Component
  constructor: () ->
    super()

    @state =
      color: '#eee'
      countries: []

  componentDidMount: () ->
    
    for await dataset from data.loadCountrySeries()

      @setState
        countries: [...@state.countries, dataset]
    0

  render: () ->
    e '#app',
      [
        ...@state.countries.map (country) =>

          e LineChart,
            key: country.code
            width: 500
            height: 300
            data: country.series.map (point, i) =>
              name: point.date
              value: fn point, i, country.series
            [
              e XAxis,
                dataKey: 'name'

              e YAxis

              e CartesianGrid,
                strokeDasharray: '5 5'
                stroke: @state.color

              e Line,
                type: 'monotone'
                dataKey: 'value'
                stroke: @state.color
            ]
      ]




