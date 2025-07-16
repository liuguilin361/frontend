<script lang="ts">
    import '../app.css';
    import CategoryIcon from '$lib/thing/category-icon.svelte';
    import GroupIcon from '$lib/thing/group-icon.svelte';
    import {page} from '$app/state';
    import things from "models/things.svelte"
    import Api from "models/api"
    import type {ExtensionResource, GroupDescription} from "models/types"
    import App from "../views/app.svelte";
    import "../components/th-card.ts"

    let categories = $derived.by(() => {
        let set = new Set<{ capability: string }>();
        for (const thing of things.things.values()) {
            thing.selectedCapability
            let item: { capability: string } = {
                capability: thing.selectedCapability as string,
            }
            set.add(item);
        }
        return Array.from(set.values());
    });

    let groupsPromise = Api.getGroups<GroupDescription>();
    let {children} = $props();
    let pathname = $derived(page.url.pathname);
    const mainItems = App.mainItems;
    const extensionItems = App.extensionItems;
    const development = App.development;
    let promise = Api.getExtensions<ExtensionResource>();
</script>


<svelte:head>
    <script src="https://code.iconify.design/iconify-icon/3.0.0/iconify-icon.min.js"></script>
    <script src="/src/views/extension.ts" type="module"></script>
    {#await promise then items}
        {#each Object.entries(items) as [id, item]}
            {#each item.content_scripts as content}
                {#if (content.js)}
                    {#each content.js as data}
                        <script type="module" src='/extensions/{id}/{data}'></script>
                    {/each}
                {/if}
                {#if (content.css)}
                    {#each content.css as css}
                        <link rel="stylesheet" href='/extensions/{id}/{css}'/>
                    {/each}
                {/if}
            {/each}
        {/each}
    {/await}
</svelte:head>


<div class="drawer lg:drawer-open">

    <input class="drawer-toggle" id="drawer" type="checkbox"/>
    <div class="drawer-content h-full flex flex-col">
        <!-- Navbar -->
        <!-- Page content here -->
        {@render children()}
    </div>
    <div class="drawer-side  h-[100vh]  z-5">

        <label aria-label="close sidebar" class="drawer-overlay" for="drawer"></label>
        <ul class="menu menu-md w-56 bg-gray-300 min-h-[100vh]   rounded-box" id="main-menu">
            <!-- Sidebar content here -->

            <!--   Main item-->
            <MenuItems items={mainItems}/>

            <!--   Extension item-->
            <MenuItems items={extensionItems}/>

            <li class="mt-5 menu-xs" hidden={categories.length===0}>
                <details open>
                    <summary>category</summary>
                    <ul class=" ">
                        {#each categories as item}
                            <li><a href="/category/light" class={{"menu-active":pathname==="/category/light" }}>>
                                <CategoryIcon capability={item.capability}>{item.capability}</CategoryIcon>
                            </a></li>
                        {/each}
                    </ul>
                </details>
            </li>

            <li class="mt-5" hidden={development.length===0}>
                <details open>
                    <summary>development</summary>
                    <ul>
                        <MenuItems items={development}/>
                    </ul>
                </details>
            </li>

            {#await groupsPromise then groups}
                {@const list = Object.values(groups)}
                <li hidden={list.length===0} class="mt-5 menu-xs">
                    <details open>
                        <summary>Groups</summary>
                        <ul class="menu-xs">
                            {#each list as group}
                                {@const url = `/group/${group.id}` }
                                <li>
                                    <a href={url} class={{"menu-active":pathname===url}}>
                                        <GroupIcon class="w-4 h-4" group={group.title}>{group.title}</GroupIcon>
                                    </a>
                                </li>
                            {/each}
                        </ul>
                    </details>
                </li>
            {/await}
            <li class="divider">Path Name</li>
            <li>{pathname}</li>
        </ul>
    </div>
</div>







