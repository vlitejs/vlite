import {
	interfaceVlitePlugins,
	interfacePluginsInstance
} from 'shared/assets/interfaces/interfaces'

const vlitePlugins: interfaceVlitePlugins = {}

/**
 * Get plugins instances from the registered list
 * @param {Array} plugins List of plugins to enabled
 * @returns {Array} List of plugins instances to enabled
 */
export function getPluginInstance(plugins: Array<string>): Array<interfacePluginsInstance> {
	const pluginsInstance: Array<interfacePluginsInstance> = []
	const pluginsIds = Object.keys(vlitePlugins)

	plugins.forEach((id: string) => {
		if (pluginsIds.includes(id)) {
			pluginsInstance.push({
				id,
				Plugin: vlitePlugins[id]
			})
		} else {
			throw new Error(`vlitejs :: Unknown plugin "${id}".`)
		}
	})

	return pluginsInstance
}

/**
 * Register the plugin
 * @param id Plugin ID
 * @param instance Plugin instance
 * @returns {undefined} No value to return
 */
export function registerPlugin(id: string, instance: any): undefined {
	if (typeof instance !== 'undefined') {
		if (!Object.keys(vlitePlugins).includes(id)) {
			vlitePlugins[id] = instance
			return
		}
		throw new Error(`vlitejs :: The plugin id "${id}" is already registered.`)
	}
	throw new Error(`vlitejs :: The plugin id "${id}" is undefined.`)
}

/**
 * Initialize plugins
 * @param {Object} options
 * @param {Array} options.plugins Plugins list
 * @param {String} options.provider Player provider
 * @param {Array} options.mode Player mode (video|audio)
 * @param {Array} options.playerInstance Player instance
 */
export function initializePlugins({
	plugins,
	provider,
	mode,
	playerInstance
}: {
	plugins: Array<any>
	provider: string
	mode: string
	playerInstance: any
}) {
	getPluginInstance(plugins).forEach(({ id, Plugin }: { id: string; Plugin: any }) => {
		const plugin = new Plugin({ player: playerInstance })
		if (plugin.providers.includes(provider) && plugin.types.includes(mode)) {
			plugin.init()
		} else {
			throw new Error(
				`vlitejs :: The "${id}" plugin is only compatible with providers:"${plugin.providers}" and types:"${plugin.types}"`
			)
		}
	})
}
