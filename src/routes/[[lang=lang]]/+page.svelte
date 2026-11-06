<script lang="ts">
	import Home from '../../ui/Home.svelte';

	let { data } = $props();
</script>

<Home lang={data.lang} />
