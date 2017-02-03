import React, {Component} from 'react'

export function bindAll(fns, ctx) {
  fns.map((fn) => {
    try {
      ctx[fn] = ctx[fn].bind(ctx)
    } catch(e) {
      throw `bindAll error: ${fn} is not a function`;
    }
  });
}
