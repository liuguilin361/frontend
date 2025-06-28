<svelte:options customElement="thing-card"/>

<script>
    let {name = 'world'} = $props();
</script>

<h1>Hello {name}!</h1>
<slot/>

