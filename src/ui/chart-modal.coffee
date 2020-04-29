
import React from "react"
import PropTypes from "prop-types"

import {Modal, Paper} from "@material-ui/core"

import {e} from "../ui-tools"

import Chart from "./chart.coffee"
import ButtonBar from "./button-bar.coffee"

export default class ChartModal extends React.Component

  @propTypes =
    country: PropTypes.object.isRequired

  constructor: () ->
    super()

    @state =
      selected: 'cumulative'

  select: (selected) ->
    @setState {selected}

  render: () ->

    {country, ...props} = @props

    style =
      maxWidth: "#{80}%"
      display: 'flex'
      flexDirection: 'column'
      justifyContent: 'center'
      margin: 'auto'

    attributes =
      disablePortal: yes
      disableEnforceFocus: yes
      disableAutoFocus: yes

    e Modal, {open: yes, style, ...attributes, ...props}, [

      e Paper,
        style:
          padding: "#{10}px"
        [
          e 'h2', ["Data for #{country.title}"]
          e ButtonBar,
            onSelect: (selected) =>
              @select selected
              0

          e Chart,
            width: 700
            height: 350
            country: country
            fn: @state.selected
        ]
    ]

