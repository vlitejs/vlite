import PlayerHtml5 from './html5/html5.js'

type interfaceVliteProviders = Record<string, any>
type interfaceProvidersOptions = Record<string, any>

const vliteProviders: interfaceVliteProviders = {
	html5: PlayerHtml5
}
const providersOptions: interfaceProvidersOptions = {}

/**
 * Get provider instance from the registered list
 * @param provider Provider ID
 * @param Player Player parent class
 * @returns Provider class
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
 * @param options Provider options
 * @returns No value to return
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
