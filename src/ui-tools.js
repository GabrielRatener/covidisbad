
import React from "react"

const isObject = (candidate) => {

  return candidate !== null && typeof candidate === 'object';
}

const parseShorthand = (shorthand) => {
  const collect = () => {

    if (str.length > 0) {
      switch (mode) {
        case 0:
          tuple.tag = str;
          break;
        case 1:
          tuple.id = str;
          break;
        case 2:
          tuple.classes.push(str);
          break;
      }
    }

    str = '';
  }

  const tuple = {
    tag: 'div',
    id: null,
    classes: []
  }

  let mode = 0;
  let str = '';

  for (const c of shorthand) {
    
    switch (c) {
      case '#':
        collect();
        mode = 1;
        break;

      case '.':
        collect();
        mode = 2;
        break;

      default:
        str += c;
    }
  }

  collect();

  return tuple;
}

const getClassList = (attributes) => {
  if (attributes) {
    if (Array.isArray(attributes)) {
      return [];
    } else {
      if (!attributes.hasOwnProperty('class')) {
        if (Array.isArray(attributes.class)) {
          return attributes.class;
        }

        if (typeof attributes.class === 'string') {
          return attributes.class
            .split(/\s+/g)
            .filter((s) => s.length > 0);
        }

        if (isObject(attributes.class)) {
          return Object.entries(attributes.class)
            .filter(([, value]) => !!value)
            .map(([key]) => key);
        }

      } else {
        return [];
      }
    }
  
  }

  return [];
}

const integrateClassSets = (fixedList, addedClassList) => {
  const fixedSet = new Set(fixedList);

  return [
    ...fixedSet,
    ...addedClassList.filter((className) => !fixedSet.has(className))
  ]
}

const el = (target, id, attributes, children) => {

  const {class: className, ...other} = attributes;

  const newAttributes = {
    ...other,
    ...(!attributes.hasOwnProperty('class') ? {} : {
      className: className.join(' ')
    }),
    ...(id === null ? {} : {id})
  }

  return React.createElement(target, newAttributes,
    children.length === 0 ? null : children);
}

export const c = (component, shorthand = '', attributes = {}, children = []) => {
  
  if (typeof shorthand !== 'string') {

    return c(component, '', shorthand,
      Array.isArray(attributes) ? attributes : []);
  } else if (Array.isArray(attributes)) {
    
    return c(component, shorthand, {}, attributes);
  } else {

    const {id, classes} = parseShorthand(shorthand);
    const customClasses = getClassList(attributes);
    const augmentedAttributes = {
      ...attributes,
      class: integrateClassSets(classes, customClasses),
    }

    return el(component, id, augmentedAttributes, children);
  }
}

export const t = (shorthand, attributes = {}, children = []) => {

  if (Array.isArray(attributes)) {
    
    return t(shorthand, {}, attributes);
  } else {

    const {tag, id, classes} = parseShorthand(shorthand);
    const customClasses = getClassList(attributes);
    const augmentedAttributes = {
      ...attributes,
      class: integrateClassSets(classes, customClasses),
    }

    return el(tag, id, augmentedAttributes, children);
  }
}

export const e = (lead, ...args) => {

  if (typeof lead === 'string') {
    return t(lead, ...args);
  } else {
    return c(lead, ...args);
  }
}

export const tn = (text) => text;
