<script
        generics="T, V extends Validator, O extends MyFormOptions<T, V>"
        lang="ts"
>
    import {BasicForm, type Validator} from "@sjsf/form";
    import Form from "@sjsf/daisyui5-theme/components/form.svelte";

    import {type MyFormOptions, createMyForm} from "./form";

    const props: O = $props();

    const form = createMyForm<T, V, O>(props);
</script>

<BasicForm class="flex flex-col w-auto" {form}/>
