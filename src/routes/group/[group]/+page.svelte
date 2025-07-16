<script lang="ts">
    import Navbar from "../../../components/navbar.svelte";
    import {page} from "$app/state";
</script>

<Navbar>{page.url.pathname}</Navbar>
