export interface interfaceVlitePlugins {
	[key: string]: any
}

export interface interfacePluginsInstance {
	id: string
	Plugin: any
}

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
 * @param {Array} options.type Player type (video|audio)
 * @param {Array} options.playerInstance Player instance
 */
export function initializePlugins({
	plugins,
	provider,
	type,
	playerInstance
}: {
	plugins: Array<any>
	provider: string
	type: string
	playerInstance: any
}) {
	getPluginInstance(plugins).forEach(({ id, Plugin }: { id: string; Plugin: any }) => {
		const plugin = new Plugin({
			element: playerInstance.element,
			container: playerInstance.container,
			options: playerInstance.options,
			vliteInstance: playerInstance.vliteInstance
		})
		if (plugin.providers.includes(provider) && plugin.types.includes(type)) {
			plugin.init()
		} else {
			throw new Error(
				`vlitejs :: The "${id}" plugin is only compatible with providers:"${plugin.providers}" and types:"${plugin.types}"`
			)
		}
	})
}
