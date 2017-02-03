import React, {Component} from 'react'

export function bindAll(fns, ctx) {
  fns.map((fn) => ctx[fn] = ctx[fn].bind(ctx));
}
