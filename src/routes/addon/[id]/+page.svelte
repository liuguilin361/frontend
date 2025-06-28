<script lang="ts">
    import {SimpleForm} from "@sjsf/form";
    import type {Schema} from "@sjsf/form";
    import {resolver} from "@sjsf/form/resolvers/basic";
    import {translation} from "@sjsf/form/translations/en";
    import {theme} from "@sjsf/daisyui5-theme";
    import Dialogbar from "components/dialogbar.svelte";
    import Api from "models/api";
    import type {AddonManifest} from "models/types";
    import {page} from '$app/state';
    import Form from "components/form/form.svelte"
    import {navigating} from "$app/state";

    const id = page.params["id"] as string;
    let promise = Api.getInstalledAddon<AddonManifest>(id);

</script>

<Dialogbar>Config</Dialogbar>

{#await promise then addon}
    <Form schema={addon.schema}></Form>
    <SimpleForm
            onSubmit={ () => {}}
            {resolver}
            schema={addon.schema}
            {theme}
            {translation}
            validator={{ isValid: () => true }}
    />
{/await}


