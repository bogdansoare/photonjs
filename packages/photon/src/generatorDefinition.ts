import { GeneratorDefinition, GeneratorFunction } from '@prisma/cli'
import { generateClient } from './generation/generateClient'
import { getDatamodel } from './utils/getDatamodel'

const defaultOutput = 'node_modules/@generated/photon'

const knownPlatforms = [
  'native',
  'darwin',
  'linux-glibc-libssl1.0.1',
  'linux-glibc-libssl1.0.2',
  'linux-glibc-libssl1.1.0',
  'linux-musl-libssl1.1.0',
]

const generate: GeneratorFunction = async ({ generator, cwd }) => {
  // if (generator.pinnedPlatform) {
  //   throw new Error(`pinnedPlatform is not implemented yet`)
  // }
  // // TODO more validation
  // if (generator.platforms.length === 0) {
  //   throw new Error(`Please provide at least one platform in \`platforms\``)
  // }
  // for (const platform of generator.platforms) {
  //   if (!knownPlatforms.includes(platform)) {
  //     throw new Error(`Unknown platform ${platform}. Possible platforms: ${knownPlatforms.join(', ')}`)
  //   }
  // }
  const datamodel = await getDatamodel(cwd)
  const output = generator.output || defaultOutput
  const transpile =
    generator.config && typeof generator.config.transpile !== 'undefined'
      ? parseBoolean(generator.config.transpile)
      : true
  await generateClient({ datamodel, cwd, outputDir: output, transpile })
  return ''
}

export const generatorDefinition: GeneratorDefinition = {
  prettyName: 'Photon JS Client',
  generate,
  defaultOutput,
}

function parseBoolean(value: any): boolean {
  if (value === 'true') {
    return true
  }

  if (value === 'false') {
    return false
  }

  return Boolean(value)
}
