export type interfaceVlitePlugins = Record<string, any>

export type interfacePluginsInstance = {
	id: string
	Plugin: any
	options: any
}

const vlitePlugins: interfaceVlitePlugins = {}
const pluginsOptions: any = {}

/**
 * Get plugins instances from the registered list
 * @param plugins List of plugins to enabled
 * @returns List of plugins instances to enabled
 */
export function getPluginInstance(plugins: string[]): interfacePluginsInstance[] {
	const pluginsInstance: interfacePluginsInstance[] = []
	const pluginsIds = Object.keys(vlitePlugins)

	plugins.forEach((id: string) => {
		if (pluginsIds.includes(id)) {
			pluginsInstance.push({
				id,
				Plugin: vlitePlugins[id],
				options: pluginsOptions[id]
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
 * @param options Plugin options
 * @returns No value to return
 */
export function registerPlugin(id: string, instance: any, options: any): undefined {
	if (typeof instance !== 'undefined') {
		if (!Object.keys(vlitePlugins).includes(id)) {
			vlitePlugins[id] = instance

			if (options) {
				pluginsOptions[id] = options
			}
			return
		}
		throw new Error(`vlitejs :: The plugin id "${id}" is already registered.`)
	}
	throw new Error(`vlitejs :: The plugin id "${id}" is undefined.`)
}

/**
 * Initialize plugins
 * @param options
 * @param options.plugins Plugins list
 * @param options.provider Player provider
 * @param options.type Player type (video|audio)
 * @param options.player Player instance
 */
export function initializePlugins({
	plugins,
	provider,
	type,
	player
}: {
	plugins: any[]
	provider: string
	type: string
	player: any
}) {
	getPluginInstance(plugins).forEach(
		({ id, Plugin, options }: { id: string; Plugin: any; options: any }) => {
			const plugin = new Plugin({ player, options })

			// Store the plugin instance on the player
			player.plugins[id] = plugin

			if (plugin.providers.includes(provider) && plugin.types.includes(type)) {
				plugin.init()
			} else {
				throw new Error(
					`vlitejs :: The "${id}" plugin is only compatible with providers:"${plugin.providers}" and types:"${plugin.types}"`
				)
			}
		}
	)
}
