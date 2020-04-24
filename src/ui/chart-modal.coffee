
import React from "react"

import {Modal, Paper} from "@material-ui/core"

import {e} from "../ui-tools"

import Chart from "./chart.coffee"
import ButtonBar from "./button-bar.coffee"

export default class ChartModal extends React.Component

  constructor: () ->
    super()

    @state =
      selected: 'cumulative'

  select: (selected) ->
    @setState {selected}

  render: () ->

    {country, children, ...props} = @props

    e Modal, {open: yes}, [

      e Paper, [
        e 'h2', ["Data for #{country.title}"]
        e ButtonBar,
          onSelect: (selected) =>
            @select selected
            0

        e Chart, {country, fn: @state.selected}
      ]
    ]

