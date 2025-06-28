<script lang="ts">
    import MenuIcon from "$lib/components/menu-icon.svelte";
    import {navigating} from "$app/state";

    let from = navigating.from ? navigating.from.url.pathname : "/";
    let {children}: { children?: any } = $props();
</script>


<div class="navbar bg-base-100 z-4 opacity-98  sticky  top-0 rounded-t-box shadow-sm">
    <div class="navbar-start w-auto flex-1/3">
        <label class="btn btn-ghost drawer-button lg:hidden" for="drawer">
            <MenuIcon menu="list"></MenuIcon>
        </label>
        <a aria-label="back" class="btn w-auto btn-ghost rounded-field navbar-start" href={from}
           style="anchor-name:--anchor-bar"
           tabindex="0">
            <svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                 stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 14 4 9l5-5"/>
                <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/>
            </svg>
        </a>
    </div>

    <div class="navbar-center w-auto flex-1/3 justify-center">
        {@render children?.()}
    </div>

    <div class="dropdown-bottom dropdown-end  flex-1/3 flex justify-end">
        <button aria-label="add menu" class="btn btn-ghost w-auto   rounded-field" popovertarget="popover-bar"
                style="anchor-name:--anchor-bar"
                tabindex="0">
            <svg fill="#1f1f1f" height="24px" viewBox="0 -960 960 960"
                 width="24px"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
            </svg>
        </button>
        <ul class="dropdown menu w-auto rounded-box bg-base-100 shadow-sm"
            id="popover-bar" popover style="position-anchor:--anchor-bar">
            <li>
                <a href="/">
                    <MenuIcon menu="device">Add device</MenuIcon>
                </a>
            </li>
            <li>
                <a href="/automation">
                    <MenuIcon menu="automation">Add automation</MenuIcon>
                </a>
            </li>
            <li>
                <a href="/store">
                    <MenuIcon menu="store">Store</MenuIcon>
                </a>
            </li>
        </ul>
    </div>
</div>
