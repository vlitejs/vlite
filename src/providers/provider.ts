import PlayerHtml5 from './html5'
import { interfaceVliteProviders } from 'shared/assets/interfaces/interfaces'

const vliteProviders: interfaceVliteProviders = {
	html5: PlayerHtml5
}

/**
 * Get provider instance from the registered list
 * @param {String} provider Provider ID
 * @returns {Class} Provider instance
 */
export function getProviderInstance(provider: string): any {
	const ProviderInstance: any = vliteProviders[provider]
	if (ProviderInstance) {
		return ProviderInstance
	}
	throw new Error(`vlitejs :: Unknown provider "${provider}"`)
}

/**
 * Register the provider
 * @param id Provider ID
 * @param instance Provider instance
 * @returns {undefined} No value to return
 */
export function registerProvider(id: string, instance: any) {
	if (typeof instance !== 'undefined') {
		if (!Object.keys(vliteProviders).includes(id)) {
			vliteProviders[id] = instance
			return
		}
		throw new Error(`vlitejs :: The provider id "${id}" is already registered.`)
	}
	throw new Error(`vlitejs :: The provider id "${id}" is undefined.`)
}
