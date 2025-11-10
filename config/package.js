import pkg from '../package.json' with { type: 'json' }

const { author, license, name, version } = pkg

export const banner = `/*!\n * @license ${license}\n * @name ${name}\n * @version ${version}\n * @copyright ${new Date().getUTCFullYear()} ${author}\n */`
export const providers = ['youtube', 'vimeo', 'dailymotion']
export const plugins = [
	'subtitle',
	'pip',
	'cast',
	'airplay',
	'ima',
	'volume-bar',
	'sticky',
	'hotkeys'
]
