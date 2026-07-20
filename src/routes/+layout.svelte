<script lang="ts">
	import '../app.css';
	import unwantedFavicon from '$lib/assets/unwantedfavicon.svg';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={unwantedFavicon} />
</svelte:head>

<ModeWatcher />

<div
	class="
	bg-(--customWhite) dark:bg-(--darkGray) rubikal
	flex flex-col items-center justify-center antialiased
	"
>
	{@render children?.()}
</div>
