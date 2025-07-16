<script lang="ts">
    import type {ClassValue} from "svelte/elements";
    import Icon from "@iconify/svelte";
    import SvgIcon from "./svg-icon.svelte"

    let {path, icon, iconColor, class: cls}: {
        path?: string;
        icon?: string,
        iconColor: string,
        class: ClassValue
    } = $props();

</script>


{#if path}
    <button class="btn {cls}">
        <SvgIcon {path}></SvgIcon>
    </button>
{/if}

{#if icon}
    <button class="btn {cls}">
        <Icon icon={icon}/>
    </button>
{/if}
