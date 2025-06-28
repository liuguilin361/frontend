<script>
    import Navbar from "components/navbar.svelte";
    import {page} from "$app/state";

    const name = page.url.pathname.split('/').pop();
</script>


<Navbar>{name}</Navbar>
