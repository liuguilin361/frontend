<script lang="ts">
    let {path, viewBox, secondaryPath, color, secondaryColor, width, height}: {
        path: string;
        viewBox?: string;
        secondaryPath?: string,
        secondaryColor?: string,
        color?: string,
        width?: string,
        height?: string,
    } = $props();
</script>


<svg
        width={width||"48px"}
        height={height||"48px"}
        viewBox={viewBox || "0 0 24 24"}
        preserveAspectRatio="xMidYMid meet"
        focusable="false"
        role="img"
        aria-hidden="true"
>
    <g>
        {#if path}
            <path fill={color||"currentColor"} class="primary-path" d={path}></path>
        {/if}
        {#if secondaryPath}
            <path fill={secondaryColor||color||"currentColor"} class="secondary-path" d={secondaryPath}></path>
        {/if}
    </g>
</svg>
