<script lang="ts">
    import Thing from "src/models/thing.svelte.js";
    import Panel from "src/lib/components/thing/panel.svelte"
    let {thing}: { thing: Thing } = $props();
    let loading = $state(false);
</script>

<Panel setOn={(b)=>thing.setOn(b)} on={thing.on} title={thing.title} group={thing.group? thing.group:undefined}
       connected={thing.connected} {loading} status={thing.status} deviceType={thing.selectedCapability}>
    <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 0 24 24" width="50px"
         fill={thing.on? "var(--color-orange-400)":"gray"}>
        <g>
            <path d="M0,0h24v24H0V0z" fill="none"/>
        </g>
        <g>
            <g>
                <g>
                    <path d="M12,22c1.1,0,2-0.9,2-2h-4C10,21.1,10.9,22,12,22z"/>
                </g>
                <g>
                    <rect height="2" width="8" x="8" y="17"/>
                </g>
                <g>
                    <path d="M12,2C7.86,2,4.5,5.36,4.5,9.5c0,3.82,2.66,5.86,3.77,6.5h7.46c1.11-0.64,3.77-2.68,3.77-6.5C19.5,5.36,16.14,2,12,2z"/>
                </g>
            </g>
        </g>
    </svg>
</Panel>
