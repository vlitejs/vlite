import PlayerHtml5 from './html5/html5'

interface interfaceVliteProviders {
	[key: string]: any
}
interface interfaceProvidersOptions {
	[key: string]: any
}

const vliteProviders: interfaceVliteProviders = {
	html5: PlayerHtml5
}
const providersOptions: interfaceProvidersOptions = {}

/**
 * Get provider instance from the registered list
 * @param {String} provider Provider ID
 * @param {Class} Player Player parent class
 * @returns {Class} Provider class
 */
export function getProviderInstance(provider: string, Player: any): any {
	const ProviderInstance: any = vliteProviders[provider]
	if (ProviderInstance) {
		return ProviderInstance(Player, providersOptions[provider])
	}
	throw new Error(`vlitejs :: Unknown provider "${provider}"`)
}

/**
 * Register the provider
 * @param id Provider ID
 * @param instance Provider instance
 * @returns {undefined} No value to return
 */
export function registerProvider(id: string, instance: any, options: interfaceProvidersOptions) {
	if (typeof instance !== 'undefined') {
		if (!Object.keys(vliteProviders).includes(id)) {
			vliteProviders[id] = instance

			if (options) {
				providersOptions[id] = options
			}
			return
		}
		throw new Error(`vlitejs :: The provider id "${id}" is already registered.`)
	}
	throw new Error(`vlitejs :: The provider id "${id}" is undefined.`)
}
