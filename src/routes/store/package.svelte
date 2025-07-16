<script lang="ts">
    import type {AddonDescription} from "models/types";
    import AddonIcon from "../../components/addon-icon.svelte";
    import MenuIcon from "../../components/menu-icon.svelte";
    import Api from "models/api";

    let {children, addon}: { children?: any, addon: AddonDescription } = $props();
    let installed = $state(addon.installed);
    let errorMessage = $state(null);
    let installing = $state(false);

    function handleInstall() {
        installing = true;
        Api.installAddon(addon.id, addon.url, addon.checksum).then(() => {
            installing = false;
            installed = true;

        }).catch(e => {
            errorMessage = e.message;
            installing = false;
            installed = false;
        })
    }

</script>

<div class="card card-side bg-base-100 border-1 border-base-200 m-1 shadow-lg card-sm">
    <figure class="">
        <AddonIcon class="h-20 w-20" type={addon.primary_type}></AddonIcon>
    </figure>
    <div class="card-body flex-col sm:justify-between sm:flex-row">
        <div class="justify-end">
            <h2 class="card-title">{addon.name}</h2>
            <article class="prose max-w-80">
                <p hidden={!addon.description}>{addon.description}</p>
            </article>
            <p class="text-primary" hidden={!addon.id}>id:{addon.id}</p>
            <p class="text-primary" hidden={!addon.primary_type}>type:{addon.primary_type}</p>
            <p class="text-primary" hidden={!addon.language_name}>language:{addon.language_name}</p>
            <span class="text-primary" hidden={!addon.author}>author:<a class="link" href={addon.homepage_url}>
                {addon.author}
            </a></span>
            <p class="text-primary" hidden={!addon.version}>version:{addon.version}</p>
            <p class="text-error" hidden={!errorMessage}>{errorMessage}</p>
        </div>
        <div class="card-actions w-auto grid-flow-row">
            <button class="btn  btn-soft btn-primary grid-rows-1 grid-cols-1" disabled={installed||installing}
                    onclick={handleInstall}>
                <MenuIcon menu={installing? "loading":"download"}>{installed ? "installed" : "install"}</MenuIcon>
            </button>
        </div>
    </div>
</div>
