<script lang="ts">

    import Navbar from "../components/navbar.svelte";
    import "../components/th-svg-icon.ts"
    import "../components/th-icon-button.ts"
    import "../components/th-card.ts"
    import "../components/tile/th-tile-icon.ts"
    import "../components/tile/th-tile-info.ts"
    import things from "models/things.svelte.ts"
    import "../components/th-thing.ts"
    import "../layouts/th-main.ts"
</script>


<Navbar>Home</Navbar>

<th-layout>
    {#each things.things.values() as thing}
        <th-thing thing={thing}></th-thing>
    {/each}
</th-layout>


