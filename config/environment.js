/**
 * @file Environment
 * @author Cody <1170096634@qq.com>
 */
export const { env, NODE_ENV } = process.env
export const isDev = Object.is(NODE_ENV, 'development')
export const isProd = Object.is(NODE_ENV, 'production')

export const isStatic = process && process.static
export const isServer = process && process.server
export const isBrowser = process && process.browser
export const isModern = process && process.modern