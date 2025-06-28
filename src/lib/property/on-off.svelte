<script lang="ts">
    import type {ClassValue} from "svelte/elements";
    let {on, toggle,class:cls}: {
        toggle?: () => void;
        on: boolean;
        class?: ClassValue;
    } = $props();
</script>

<div class={["flex px-4 rounded-2xl  items-center w-xs h-16 shadow-sm",!on&&"bg-gray-300",cls]}>
    <h2 class="card-title"> {on ? "On" : "Off"}</h2>
    <div class="grow"></div>
    <div class="card-actions justify-end">
        <button class={["btn btn-circle",{"bg-white":on},{"bg-gray-200":!on}]} aria-label="on/off" onclick={()=>{toggle?.()}}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
              class={[on&&"fill-gray-400",!on&&"fill-white"]}>
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>
            </svg>
        </button>
    </div>
</div>
