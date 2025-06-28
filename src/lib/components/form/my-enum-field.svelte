<script lang="ts">
    import type {ComponentProps} from "@sjsf/form";
    import {getField} from "components/form/field";

    let {
        value = $bindable(),
        config,
    }: ComponentProps["enumField"] = $props();

    let {description, options, title} = getField(config);

</script>


<div class="flex flex-col">
    <span class="label"> {description}</span>
    <label class="select">
        <span class="label"> {title}</span>
        <select bind:value={value}>
            {#each options as option}
                <option value="{option}">{option}</option>
            {/each}
        </select>
    </label>
</div>
