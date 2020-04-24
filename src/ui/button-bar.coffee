
import React from "react"

import {Chip} from "@material-ui/core"

import {e, tn} from "../ui-tools"
import {functions} from "../functions"

functionNames =
  Object.entries(functions)
    .filter(([name, {title}]) => !!title)
    .map ([name, {title}]) => {name, title}

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

    style =
      textAlign: 'left'

    e 'div', {style}, [
      ...functionNames.map ({name, title}) =>
        e Chip,
          key: name
          label: title
          variant: 'outlined'
          disabled: @state.selected == name
          style:
            borderRadius: 0
            margin: 5
            marginLeft: 0
          onClick: () =>

            @select(name)
    ]



