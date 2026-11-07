<script lang="ts">
	import Dashboard from '../../../ui/Dashboard.svelte';

	let { data } = $props();
</script>

<Dashboard lang={data.lang} />
