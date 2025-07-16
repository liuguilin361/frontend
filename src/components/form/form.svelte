<script
        generics="T, V extends Validator, O extends MyFormOptions<T, V>"
        lang="ts"
>
    import {BasicForm} from "@sjsf/form";

    import {createMyForm} from "./form.ts";

    const props: O = $props();

    const form = createMyForm<T, V, O>(props);
</script>

<BasicForm class="flex flex-col w-auto" {form}/>
