
import React from "react"

import {Button} from "@material-ui/core"

import {e, tn} from "../ui-tools"
import {functions} from "../functions"

export default class ButtonBar extends React.Component

  constructor: ->
    
    super()
    @state =
      selected: 'cumulative'

  select: (selected) ->

    @setState {selected}

    if @props.onSelect
      @props.onSelect(selected)
    0

  render: ->

    functionNames =
      Object.entries(functions)
        .filter(([name, {title}]) => !!title)
        .map ([name, {title}]) => {name, title}

    e 'div', [
      ...functionNames.map ({name, title}) =>
        e Button,
          key: name
          variant: 'outlined'
          disabled: @state.selected == name
          style:
            borderRadius: 0
            margin: 5
            marginLeft: 0
          onClick: () =>

            @select(name)
          [
            tn title
          ]
    ]



