
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

import {round} from "../utils"
import {e, tn} from "../ui-tools.js"
import {functions} from '../functions.js'

export default class Chart extends React.Component

  render: ->

    style = {
      padding: 5
      cursor: 'pointer'
    }

    events =
      onClick: () =>
        if @props.onClick?
          @props.onClick(@props.country)

    e Paper, {square: yes, elevation: 5, style, ...@props}, [

      e 'h3',
        style:
          textAlign: 'center'
        ["#{@props.country.title}"]

      e LineChart,
        style:
          margin: 'auto'
        key: @props.country.code
        width: @props.width or 270
        height: @props.height or 200
        data: @props.country.series.map (point, i, points) =>
          [_, y, m, d] = /^(\d+)-(\d+)-(\d+)$/.exec point.date

          name: "#{m}/#{d}"
          value: round 2, point[@props.fn]
        [
          e XAxis, {dataKey: 'name'}
          e YAxis
          e CartesianGrid, {strokeDasharray: '10 5', stroke: '#faf'}
          e Line,
            type: 'monotone'
            dataKey: 'value'
            stroke: '#00f'
            name: functions[@props.fn].title

          e Tooltip
        ]
    ]