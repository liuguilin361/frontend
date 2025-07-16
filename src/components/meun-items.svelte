<script lang="ts">
    import type {MenuItem} from "./types";
    import {page} from "$app/state";

    let {items}: { items: Array<MenuItem> } = $props();
    let pathname = $derived(page.url?.pathname);
</script>


{#each items as item}
    {#if !!item.icon}
        <li><a id="{item.id}-menu-item" href={item.url}
               style="background-size: contain;
                       background-image:  url({item.icon});
                       background-position: 1rem center;
                       padding-left: 3.5rem;background-size: auto 1.6rem;"
               class:menu-active={pathname === item.url}
               class="flex  bg-no-repeat pl-12 font-medium hover:bg-opacity-90 transition-all duration-200">
            <p>{item.title}</p>
        </a></li>
    {:else }
        <li><a id="{item.id}-menu-item" href={item.url}
               style="background-size: contain;
                       background-position: 1rem center;
                       padding-left: 3.5rem;background-size: auto 1.6rem;"
               class:menu-active={pathname === item.url}
               class="flex  bg-no-repeat pl-12 font-medium hover:bg-opacity-90 transition-all duration-200">
            <p>{item.title}</p>
        </a></li>
    {/if}

{/each}
