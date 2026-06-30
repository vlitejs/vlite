declare class ControlBar {
    player: any;
    type: string;
    touchEvents: string[];
    /**
     * @constructor
     * @param options
     * @param options.player Player instance
     * @param options.type Player type (video|audio)
     */
    constructor({ player, type }: {
        player: any;
        type: string;
    });
    /**
     * Initialize the control bar
     */
    init(): void;
    /**
     * Cache control bar HTML elements
     */
    cacheElements(): void;
    /**
     * Render the control bar
     */
    render(): void;
    /**
     * On player ready
     */
    onReady(): void;
    /**
     * Add event listeners
     */
    addEvents(): void;
    /**
     * On touch event progress bar
     * Fix for touch devices
     * @param e Touch event data
     */
    onTouchEventProgressBar(e: TouchEvent): void;
    /**
     * On input event on the progress bar
     * @param e Event data
     */
    onInputProgressBar(e: Event): void;
    /**
     * On click on the control bar
     * @param e Event data
     */
    onClickOnControlBar(e: Event): void;
    /**
     * Toggle the video status (play|pause)
     * @param e Event data
     */
    togglePlayPause(e: Event): void;
    /**
     * Toggle the volume
     * @param e Event data
     */
    toggleVolume(e: Event): void;
    /**
     * Toggle the fullscreen
     * @param e Event data
     */
    toggleFullscreen(e: Event): void;
    /**
     * Check if Orientation API is available
     * Firefox is excluded because landscape mode is automatically trigger after the fullscreen
     * @returns
     */
    isOrientationApiAvailable(): boolean;
    /**
     * Get the template
     * @returns Generated HTML
     */
    getTemplate(): string;
    /**
     * Remove event listeners
     */
    removeEvents(): void;
    /**
     * Destroy the control bar
     */
    destroy(): void;
}

/**
 * Events dispatched on the player container (`CustomEvent`, except plugin-specific extensions).
 * `(string & {})` keeps autocomplete for known names while still allowing other strings.
 */
type PlayerEventName = 'play' | 'pause' | 'progress' | 'timeupdate' | 'volumechange' | 'sourcechange' | 'ended' | 'end' | 'enterfullscreen' | 'exitfullscreen' | 'enterpip' | 'leavepip' | 'trackenabled' | 'trackdisabled' | 'castsessionstarted' | 'castsessionended' | 'airplaysessionstarted' | 'airplaysessionended' | 'entersticky' | 'leavesticky' | 'adsloader' | 'adsrequest' | 'adsmanager' | 'playing' | 'waiting' | 'seeking' | 'seeked' | (string & {});
/**
 * Plugin class passed to `Vlitejs.registerPlugin`.
 * `options` is `any` at this boundary so each plugin can narrow types internally.
 */
type VlitePluginConstructor = new (args: {
    player: Player;
    options?: any;
}) => {
    init(): void;
    providers: string[];
    types: string[];
};
type FullScreenSupport = {
    requestFn: string;
    cancelFn: string;
    changeEvent: string;
    isFullScreen: string;
};
type Options = {
    autoplay: boolean;
    controls: boolean;
    playPause: boolean;
    progressBar: boolean;
    time: boolean;
    volume: boolean;
    fullscreen: boolean;
    poster: null | string;
    bigPlay: boolean;
    autoHide: boolean;
    autoHideDelay: number;
    playsinline: boolean;
    loop: boolean;
    muted: boolean;
    [key: string]: boolean | null | string | number;
};
/** Arguments for the `Player` constructor (other data is provided via `Vlitejs`). */
type playerParameters = {
    Vlitejs: any;
    type: string;
};
/**
 * Factory passed to `Vlitejs.registerProvider`.
 * The second argument is optional (options stored when `registerProvider` is called).
 */
type VliteProviderFactory = (base: abstract new (...args: never[]) => Player, options?: any) => new (args: playerParameters) => unknown;
type configEvent = {
    type: PlayerEventName;
    listener: EventListener;
};
/** Third argument to `Vlitejs.registerProvider`: keys are provider ids, values are provider-specific options. */
type RegisterProviderOptions = Record<string, unknown>;

/**
 * Vlitejs Player
 * @module Vlitejs/Player
 */
declare abstract class Player {
    Vlitejs: any;
    type: string;
    media: HTMLAudioElement | HTMLVideoElement;
    options: Options;
    isCast: boolean;
    isLinearAd: boolean;
    isFullScreen: boolean;
    isMuted: boolean;
    isPaused: null | boolean;
    controlBar: ControlBar;
    playerEvents: configEvent[];
    isTouch: boolean;
    plugins: Record<string, any>;
    elements: {
        outerContainer: HTMLElement;
        container: HTMLElement;
        bigPlay: HTMLElement | null;
        poster: HTMLElement | null;
        controlBar: HTMLElement | null;
        playPause: HTMLElement | null;
        progressBar: HTMLInputElement | null;
        currentTime: HTMLElement | null;
        duration: HTMLElement | null;
        volume: HTMLElement | null;
        fullscreen: HTMLElement | null;
    };
    /**
     * @constructor
     * @param options
     * @param options.Vlitejs Vlitejs instance
     * @param options.type Player type (video|audio)
     */
    constructor({ Vlitejs, type }: playerParameters);
    /**
     * Build the player
     */
    build(): void;
    /**
     * init
     * Extends by the provider
     * @abstract
     */
    abstract init(): void;
    /**
     * waitUntilVideoIsReady
     * Extends by the provider
     * @abstract
     */
    abstract waitUntilVideoIsReady(): Promise<any>;
    /**
     * getInstance
     * Extends by the provider
     * @abstract
     */
    abstract getInstance(): HTMLElement;
    /**
     * getCurrentTime
     * Extends by the provider
     * @abstract
     */
    abstract getCurrentTime(): Promise<number>;
    /**
     * methodSeekTo
     * Extends by the provider
     * @abstract
     */
    abstract methodSeekTo(newTime: number): void;
    /**
     * getDuration
     * Extends by the provider
     * @abstract
     */
    abstract getDuration(): Promise<number>;
    /**
     * methodPlay
     * Extends by the provider
     * @abstract
     */
    abstract methodPlay(): void;
    /**
     * methodPause
     * Extends by the provider
     * @abstract
     */
    abstract methodPause(): void;
    /**
     * methodSetVolume
     * Extends by the provider
     * @abstract
     */
    abstract methodSetVolume(newVolume: number): void;
    /**
     * methodGetVolume
     * Extends by the provider
     * @abstract
     */
    abstract methodGetVolume(): Promise<number>;
    /**
     * methodMute
     * Extends by the provider
     * @abstract
     */
    abstract methodMute(): void;
    /**
     * methodUnMute
     * Extends by the provider
     * @abstract
     */
    abstract methodUnMute(): void;
    /**
     * methodSetSource
     * Extends by the provider
     * @abstract
     */
    abstract methodSetSource(videoId: string): void;
    /**
     * On the player is ready
     */
    onReady(): void;
    /**
     * Trigger on ready component's functions
     */
    triggerOnReady(): void;
    /**
     * Add media action listeners on the container
     * @param type Event type
     * @param listener Event listener
     */
    on(type: PlayerEventName, listener: EventListener): void;
    /**
     * Remove media action listeners on the container
     * @param type Event type
     * @param listener Event listener
     */
    off(type: PlayerEventName, listener: EventListener): void;
    /**
     * Dispatch custom event on the container
     * @param type Event type
     * @param detail Event detail
     */
    dispatchEvent(type: PlayerEventName, detail?: unknown): void;
    /**
     * Update the loader status
     * @param state Status of the loader
     */
    loading(state: boolean): void;
    /**
     * On time update
     * Update current time displaying in the control bar
     * Udpdate the progress bar
     */
    onTimeUpdate(): void;
    /**
     * Update the progress bar
     * @param options
     * @param options.seconds Current time in seconds
     * @param options.duration Duration in seconds
     * @param options.isRemote Cast mode is enabled
     */
    updateProgressBar({ seconds, duration, isRemote }: {
        seconds: number;
        duration: number;
        isRemote?: boolean;
    }): void;
    /**
     * On media ended
     */
    onMediaEnded(): void;
    /**
     * Play the media element
     */
    play(): void;
    /**
     * Pause the media element
     */
    pause(): void;
    /**
     * Callback function after the play|pause
     */
    afterPlayPause(): void;
    /**
     * Set player volume
     * @param volume New volume
     */
    setVolume(volume: number): void;
    /**
     * Get player volume
     * @returns Player volume
     */
    getVolume(): Promise<number>;
    /**
     * Mute the volume on the media element
     */
    mute(): void;
    /**
     * Unmute the volume on the media element
     */
    unMute(): void;
    /**
     * Set the new source of the player
     * @param videoId Video ID
     */
    setSource(videoId: string): void;
    /**
     * Update the current time of the media element
     * @param newTime New current time of the media element
     */
    seekTo(newTime: number): void;
    /**
     * Request the fullscreen
     */
    requestFullscreen(): void;
    /**
     * Exit the fullscreen
     * @param options
     * @param options.escKey The exit is trigger by the esk key
     */
    exitFullscreen({ escKey }?: {
        escKey?: boolean;
    }): void;
    /**
     * Destroy the player
     * Remove event listeners, player instance and HTML
     */
    destroy(): void;
}

/**
 * Register the plugin
 * @param id Plugin ID
 * @param instance Plugin instance
 * @param options Plugin options
 * @returns No value to return
 */
declare function registerPlugin(id: string, instance: VlitePluginConstructor, options?: unknown): undefined;

/**
 * Register the provider
 * @param id Provider ID
 * @param instance Provider instance
 * @param options Provider options
 * @returns No value to return
 */
declare function registerProvider(id: string, instance: VliteProviderFactory, options?: RegisterProviderOptions): void;

/**
 * Vlitejs entrypoint
 * @module vLite/entrypoint
 */
declare class Vlitejs {
    static registerPlugin: typeof registerPlugin;
    static registerProvider: typeof registerProvider;
    media: HTMLVideoElement | HTMLAudioElement | HTMLDivElement;
    provider: string;
    onReady: (player: Player) => void;
    type: string;
    supportFullScreen: FullScreenSupport;
    options: Options;
    autoHideGranted: boolean;
    outerContainer: HTMLElement;
    container: HTMLElement;
    player: Player;
    controlBar: any;
    timerAutoHide: number;
    /**
     * @constructor
     * @param selector CSS selector or HTML element
     * @param options
     * @param options.options Player options
     * @param options.provider Player provider
     * @param options.plugins Player plugins
     * @param options.onReady Callback function when the player is ready
     */
    constructor(selector: string | HTMLElement, { options, provider, plugins, onReady }?: {
        options?: Options | object;
        provider?: string;
        plugins?: string[];
        onReady?: (player: Player) => void;
    });
    /**
     * Wrap the media element
     */
    wrapElement(): void;
    /**
     * Build the HTML of the player
     */
    renderLayout(): void;
    /**
     * Add evnets listeners
     */
    addEvents(): void;
    /**
     * On click on the player
     * @param e Event data
     */
    onClickOnPlayer(e: Event): void;
    /**
     * On double click on the player
     * @param e Event data
     */
    onDoubleClickOnPlayer(e: Event): void;
    /**
     * On mousemove on the player
     */
    onMousemove(): void;
    /**
     * On fullscreen change (espace key pressed)
     * @doc https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
     */
    onChangeFullScreen(): void;
    /**
     * Stop the auto hide timer and show the video control bar
     */
    stopAutoHideTimer(): void;
    /**
     * Start the auto hide timer and hide the video control bar after a delay
     */
    startAutoHideTimer(): void;
    /**
     * Remove events listeners
     */
    removeEvents(): void;
    /**
     * Destroy the player
     */
    destroy(): void;
}

export { Player, Vlitejs as default };
export type { Options, PlayerEventName, VlitePluginConstructor, VliteProviderFactory };
