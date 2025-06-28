<script lang="ts">
    let {state = "off", isConnected = true, children, icon, onChange}: {
        state?: string,
        isConnected?: boolean,
        children?: any,
        icon?: string,
        onChange?: (event: any) => void,
    } = $props();
</script>


<div class="title-icon">
    <button aria-label="thing title button" class="btn fill-current rounded-full" onclick={()=>onChange?.(state)}>
        <iconify-icon {icon} style:color={state==="on"? "red":"currentColor"}></iconify-icon>
        {@render children?.()}
    </button>
</div>
