import type Player from 'core/player.js'
import type {
	playerParameters,
	RegisterProviderOptions,
	VliteProviderFactory
} from 'shared/assets/types/types.js'
import PlayerHtml5 from './html5/html5.js'

type interfaceVliteProviders = Record<string, VliteProviderFactory>

const vliteProviders: interfaceVliteProviders = {
	html5: PlayerHtml5
}
const providersOptions: RegisterProviderOptions = {}

/**
 * Get provider instance from the registered list
 * @param provider Provider ID
 * @param Player Player parent class
 * @returns Provider class
 */
export function getProviderInstance(
	provider: string,
	Player: abstract new (...args: never[]) => Player
): new (
	args: playerParameters
) => Player {
	const ProviderInstance = vliteProviders[provider]
	if (ProviderInstance) {
		return ProviderInstance(Player, providersOptions[provider]) as new (
			args: playerParameters
		) => Player
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
export function registerProvider(
	id: string,
	instance: VliteProviderFactory,
	options?: RegisterProviderOptions
) {
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
