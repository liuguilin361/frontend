<script lang="ts">

    import things from "models/things.svelte.ts"
    import {onMount} from "svelte";
    import {Thing} from "models/thing.svelte.ts";

    let {thing}: { thing: Thing } = $props();

    function update(data: { [key: string]: any }) {

    }

    onMount(() => {
        thing.subscribe(update)
        return
    })

</script>
