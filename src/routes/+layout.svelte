<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/eu.ico';
	import { ModeWatcher } from 'mode-watcher';
	import ElectricCursor from '$lib/components/electricCursor.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />

<!-- In order to use the electric cursor -->
<!-- Add data-electric-cursor -->
<!--  to the elements to trigger the cursor -->
<ElectricCursor />

<div
	class="
	bg-(--customWhite) dark:bg-(--darkGray) rubikal
	flex flex-col items-center justify-center antialiased
	"
>
	{@render children?.()}
</div>
