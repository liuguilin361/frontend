<script lang="ts">
    import type {ComponentProps} from "@sjsf/form";
    import {getField} from "components/form/field";

    let {
        value = $bindable(),
        config,
    }: ComponentProps["stringField"] = $props();

    let {description, title, readOnly} = getField(config);
</script>

<div class="flex flex-col}">
    <label class="input">
        <span class="label">{title}</span>
        <input bind:value={value} disabled={readOnly} placeholder={description} type="text"/>
    </label>
</div>

<div class="flex flex-col {config.schema.readOnly}">
    <label class="input">
        <span class="label">{title}</span>
        <input bind:value={value} placeholder={description} type="text"/>
    </label>
</div>
