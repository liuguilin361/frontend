<script lang="ts">
    import MenuIcon from "components/menu-icon.svelte";
    import {navigating, page} from "$app/state";
    import type {ClassValue} from "svelte/elements";
 

    let from = navigating.from ? navigating.from.url.pathname : "/";
    let {children, class: cls, id}: {
        children?: any,
        id?: string,
        class?: ClassValue,
    } = $props();

</script>


<div class="navbar sticky bg-base-200 z-4 rounded-t-box opacity-98 justify-between shadow-sm   top-0   {cls}">
    <div class="navbar-start w-auto flex-1/3">
    </div>
    <div class="navbar-center w-auto flex-1/3 justify-center">
        {@render children?.()}
    </div>
    <div class="dropdown-bottom dropdown-end pr-3 flex-1/3 flex justify-end">
        <a aria-label="close dialog" href={from}>
            <MenuIcon menu="close"/>
        </a>
    </div>
</div>
