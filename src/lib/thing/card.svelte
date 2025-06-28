<script lang="ts">
    import MenuIcon from "components/menu-icon.svelte";
    import TitleIcon from "models/title-icon.svelte";
    import type {ClassValue} from "svelte/elements";

    let {title, class: cls}: {
        isConnected?: boolean,
        title: string,
        class?: ClassValue
    } = $props();
    let state = $state("on");


</script>

<div class="card max-w-md bg-blue-300" id="thing-card">
    <div class="content   ">
        <div class="container flex flex-row items-center gap-[10px] flex-1 orange-block">
            <TitleIcon icon="mdi:lightbulb" onChange={()=>{ state==="on"? state="off":state="on" }} {state}/>
        </div>
    </div>
</div>

<div class="content   ">
    <ha-tile-icon data-domain="light" data-state="off" interactive="" role="button" tabindex="0">
        <ha-state-icon slot="icon"></ha-state-icon> <!--?lit$770490401$--> </ha-tile-icon>
    <ha-tile-info id="info"></ha-tile-info>
</div>
