<script lang="ts">
    import SvgIcon from "../../components/svg-icon.svelte"
    let {bgColor, path,disabled,color}: { bgColor: string; color: string; path: string,disabled:boolean } = $props();
</script>

<button style="background: {bgColor? bgColor:'currentColor'}"   {disabled} class="btn  btn-circle">
    <SvgIcon {color} {path} ></SvgIcon>
</button>
