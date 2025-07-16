<script lang="ts">
    import type {ThingDescription} from "models/types";
    import {CAPABILITY_ICONS, DEFAULT} from "data/capability-icons.ts";
    import "../../components/th-svg-icon.ts"
    import Api from "models/api.ts";

    let {thing}: { thing: ThingDescription } = $props();
    let {capability} = $state(
        thing.selectedCapability ||  // 首选 selectedCapability
        (typeof thing["@type"] === "string"
            ? thing["@type"]          // @type 是字符串时直接使用
            : thing["@type"]?.[0])    // @type 是数组时取第一个元素
        || ""                       // 以上都不存在时默认为空字符串
    );
    let path = $derived(CAPABILITY_ICONS[capability] ? CAPABILITY_ICONS[capability] : DEFAULT);
    let name = $state(thing.id);

    function handle_save() {
        thing.selectedCapability = capability
        thing.name = name;
        Api.addThing(thing).then(() => {
            console.log("Thing added:", thing);
        }).catch((e) => {
            console.error(e);
        })
    }
</script>


<div class="card card-side shadow-sm w-lg card-sm">
    <div class="flex items-center justify-center">
        <th-svg-icon {path}></th-svg-icon>
    </div>
    <div class="card-body">
        <label class="input ">
            <span class="label">Name</span>
            <input placeholder="Title" type="text" value={name}/>
        </label>
        <label class="select">
            <span class="label">Type</span>
            <select bind:value={capability}>
                {#each thing["@type"] as cap}
                    <option value={cap}>{cap}</option>
                {/each}
            </select>
        </label>
        <div class="card-actions justify-content-between">
            <button class="btn btn-primary" onclick={handle_save}>Save</button>
        </div>
    </div>
</div>

<style>
    th-svg-icon {
        --th-icon-width: 56px;
        --th-icon-height: 56px;
    }
</style>


