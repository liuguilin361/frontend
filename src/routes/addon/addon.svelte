<script lang="ts">
    import type {AddonManifest} from "models/types";
    import AddonIcon from "$lib/components/addon-icon.svelte";
    import MenuIcon from "$lib/components/menu-icon.svelte";
    import {goto} from "$app/navigation"
    import Api from "models/api";

    let {children, addon}: { children?: any, addon: AddonManifest } = $props();
    let enabled = $state(addon.enabled);
    let staus = $state("");
    let errorMessage = $state("");

    function settings(enabled: boolean) {
        staus = "settings";
        Api.setAddonSetting(addon.id, enabled).then((result) => {
            enabled = enabled;
            staus = "";
            errorMessage = "";
        }).catch((err) => {
            staus = "";
            errorMessage == err.message;
        })
    }

    function remove() {
        staus = "remove";
        Api.uninstallAddon(addon.id).then(() => {
            staus = "";
            errorMessage = "";
        }).catch((err) => {
            staus = "";
            errorMessage == err.message;
        })
    }

</script>

<div class="card card-side bg-base-100 border-1 border-base-200 m-1 shadow-lg card-sm">
    <figure class="">
        <AddonIcon class="h-20 w-20" type={addon.primary_type}></AddonIcon>
    </figure>
    <div class="card-body flex-col lg:justify-between lg:flex-row">
        <div class="justify-end">
            <h2 class="card-title">{addon.name}</h2>
            <article class="prose w-full lg:max-w-70">
                <p hidden={!addon.description}>{addon.description}</p>
            </article>
            <p class="text-primary" hidden={!addon.id}>id:{addon.id}</p>
            <p class="text-primary" hidden={!addon.primary_type}>type:{addon.primary_type}</p>
            <p class="text-primary" hidden={!addon.manifest_version}>version:{addon.version}</p>
            <p class="text-primary" hidden={!addon.author}>author:
                <a class="link" href={addon.homepage_url}>{addon.author}</a>
            </p>
            <p class="text-error" hidden={!errorMessage}>{errorMessage}</p>
        </div>

        <div class="card-actions w-auto grid-flow-row">
            <button class="btn btn-soft btn-primary grid-rows-1 grid-cols-1" disabled={!!staus}
                    hidden={enabled} onclick={()=>settings(true)}>
                <MenuIcon menu={staus==="settings"? "loading":"check"}>enable</MenuIcon>
            </button>
            <button class="btn btn-soft btn-primary grid-rows-1 grid-cols-1" disabled={!!staus}
                    hidden={!enabled} onclick={()=>settings(false)}>
                <MenuIcon menu={staus==="settings"? "loading":"close"}>disable</MenuIcon>
            </button>
            <button class="btn btn-soft btn-secondary grid-rows-1 grid-cols-2" disabled={!!staus}
                    onclick={()=>remove()}>
                <MenuIcon menu={staus==="remove"? "loading":"trash"}>remove</MenuIcon>
            </button>
            <button class="btn btn-soft grid-rows-1 grid-cols-3" disabled={!!staus}
                    onclick={()=>goto(`/addon/${addon.id}/?from=/addon`)}>
                <MenuIcon menu="setting">config</MenuIcon>
            </button>
        </div>
    </div>
</div>
