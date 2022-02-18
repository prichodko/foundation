import { promises, accessSync, constants, writeFileSync } from 'fs'
import { join } from 'path'

import * as ts from 'typescript'

export const existsSync = (f: string): boolean => {
  try {
    accessSync(f, constants.F_OK)
    return true
  } catch (_) {
    return false
  }
}

export function findPagesDir(dir: string): string {
  // prioritize ./pages over ./src/pages
  let curDir = join(dir, 'pages')
  if (existsSync(curDir)) return curDir

  curDir = join(dir, 'src/pages')
  if (existsSync(curDir)) return curDir

  // Check one level up the tree to see if the pages directory might be there
  if (existsSync(join(dir, '..', 'pages'))) {
    throw new Error(
      '> No `pages` directory found. Did you mean to run `next` in the parent (`../`) directory?'
    )
  }

  throw new Error(
    "> Couldn't find a `pages` directory. Please create one under the project root"
  )
}

export async function recursiveReadDir(
  dir: string,
  filter: RegExp,
  ignore?: RegExp,
  arr: string[] = [],
  rootDir: string = dir
): Promise<string[]> {
  const result = await promises.readdir(dir)

  await Promise.all(
    result.map(async (part: string) => {
      const absolutePath = join(dir, part)
      if (ignore && ignore.test(part)) return

      const pathStat = await promises.stat(absolutePath)

      if (pathStat.isDirectory()) {
        await recursiveReadDir(absolutePath, filter, ignore, arr, rootDir)
        return
      }

      if (!filter.test(part)) {
        return
      }

      arr.push(absolutePath.replace(rootDir, ''))
    })
  )

  return arr.sort()
}

export function collectPages(
  directory: string,
  pageExtensions: string[]
): Promise<string[]> {
  return recursiveReadDir(
    directory,
    new RegExp(`\\.(?:${pageExtensions.join('|')})$`)
  )
}

async function main() {
  const pagesDir = await findPagesDir('.')
  const pages = await collectPages(pagesDir, ['ts', 'tsx'])
  await writeFileSync(
    'routes.tsx',
    `export type Routes = ${pages.map(page => `"${page}"`).join(' | ')}`
  )
}

main()
