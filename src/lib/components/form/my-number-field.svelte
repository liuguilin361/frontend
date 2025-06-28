<script lang="ts">
    import type {ComponentProps} from "@sjsf/form";
    import {getField} from "components/form/field";

    let {
        value = $bindable(),
        config,
    }: ComponentProps["numberField"] = $props();
    let {description} = getField(config);
</script>

<div class="flex flex-col">
    <label class="input">
        <span class="label">{config.title}</span>
        <input bind:value={value} placeholder={description} type="number"/>
    </label>
</div>
