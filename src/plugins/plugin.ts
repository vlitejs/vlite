import type Player from 'core/player.js'
import type { VlitePluginConstructor } from 'shared/assets/types/types.js'

export type interfaceVlitePlugins = Record<string, VlitePluginConstructor>

export type interfacePluginsInstance = {
	id: string
	Plugin: VlitePluginConstructor
	options: unknown
}

const vlitePlugins: interfaceVlitePlugins = {}
const pluginsOptions: Record<string, unknown> = {}

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
export function registerPlugin(
	id: string,
	instance: VlitePluginConstructor,
	options?: unknown
): undefined {
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
	plugins: string[]
	provider: string
	type: string
	player: Player
}) {
	getPluginInstance(plugins).forEach(({ id, Plugin, options }: interfacePluginsInstance) => {
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
	})
}
