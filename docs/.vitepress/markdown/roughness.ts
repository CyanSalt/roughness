import type MarkdownIt from 'markdown-it'
import type { RenderRule } from 'markdown-it/lib/renderer.mjs'
import type Token from 'markdown-it/lib/token.mjs'

export default function (md: MarkdownIt) {
  const defaultRule: RenderRule = function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }
  // `<RLink />` as link
  const isPermalinkOpen = (token: Token | undefined) => {
    return token !== undefined
      && token.type === 'link_open'
      && token.attrGet('class') === 'header-anchor'
  }
  const renderLinkOpen = md.renderer.rules.link_open ?? defaultRule
  const renderLinkClose = md.renderer.rules.link_close ?? defaultRule
  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    // Skip permalinks
    if (!isPermalinkOpen(tokens[idx])) {
      tokens[idx].tag = 'RLink'
    }
    return renderLinkOpen(tokens, idx, options, env, self)
  }
  md.renderer.rules.link_close = function (tokens, idx, options, env, self) {
    if (!isPermalinkOpen(tokens[idx - 2])) {
      tokens[idx].tag = 'RLink'
    }
    return renderLinkClose(tokens, idx, options, env, self)
  }
  // `<RDetails />` as container_details
  const renderRDetails: RenderRule = function (tokens, idx, options, env, self) {
    const token = tokens[idx]
    const info = token.info.trim().slice('details'.length).trim()
    const attrs = md.renderer.renderAttrs(token)
    if (token.nesting === 1) {
      const title = md.renderInline(info, {
        references: env.references,
      })
      return `<RDetails ${attrs}><template #summary>${title}</template>\n`
    } else {
      return `</RDetails>\n`
    }
  }
  md.renderer.rules.container_details_close = renderRDetails
  md.renderer.rules.container_details_open = renderRDetails
  // `<RCard />` as container_(info|tip|warning|danger)
  const createRCardRenderer = (name: string, type: string): RenderRule => function (tokens, idx, options, env, self) {
    const token = tokens[idx]
    const info = token.info.trim().slice(name.length).trim()
    const attrs = md.renderer.renderAttrs(token)
    if (token.nesting === 1) {
      const title = md.renderInline(info, {
        references: env.references,
      })
      return `<RCard type="${type}" ${attrs}>${title ? `<template #title>${title}</title>` : ''}\n`
    } else {
      return `</RCard>\n`
    }
  }
  const renderInfoRCard = createRCardRenderer('info', 'comment')
  md.renderer.rules.container_info_close = renderInfoRCard
  md.renderer.rules.container_info_open = renderInfoRCard
  const renderTipRCard = createRCardRenderer('tip', 'info')
  md.renderer.rules.container_tip_close = renderTipRCard
  md.renderer.rules.container_tip_open = renderTipRCard
  const renderWarningRCard = createRCardRenderer('warning', 'warning')
  md.renderer.rules.container_warning_close = renderWarningRCard
  md.renderer.rules.container_warning_open = renderWarningRCard
  const renderDangerRCard = createRCardRenderer('danger', 'error')
  md.renderer.rules.container_danger_close = renderDangerRCard
  md.renderer.rules.container_danger_open = renderDangerRCard
}
