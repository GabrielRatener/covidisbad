
import React from "react"

import {
  LineChart
  XAxis
  YAxis
  CartesianGrid
  Line
  Tooltip
} from "recharts"

import {Paper} from "@material-ui/core"

import {e, tn} from "../ui-tools.js"
import {functions} from '../functions.js'

export default class Chart extends React.Component

  render: ->
    e Paper, [

      e 'h3',
        style:
          textAlign: 'center'
        [tn @props.country.title]

      e LineChart,
        key: @props.country.code
        width: 270
        height: 200
        data: @props.country.series.map (point, i, points) =>

          name: point.date
          value: point[@props.fn]
        [
          e XAxis,
            dataKey: 'name'

          e YAxis

          e CartesianGrid,
            strokeDasharray: '10 5'
            stroke: "#faf"

          e Line,
            type: 'monotone'
            dataKey: 'value'
            stroke: "#000"

          e Tooltip
        ]
    ]