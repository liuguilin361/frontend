<script lang="ts">
    import Form from "components/form/form.svelte";
    import Dialogbar from "components/dialogbar.svelte";
    import type {Schema, UiSchema} from "@sjsf/form";
    import Api from "models/api.ts";
    import type {ThingDescription} from "models/types";
    import From from "./from.svelte"

    let promise = Api.getNewThings<ThingDescription>();


</script>


<Dialogbar></Dialogbar>
{#await promise}
{:then news}
    {#each Object.entries(news) as [key, thing]}
        <From {thing}></From>
    {/each}
{/await}


