<script lang="ts">
    import type {ClassValue} from "svelte/elements";

    let {value = 50, on = true,onchange, class: cls}: {
        value: number; on: boolean; color?: string; class?: ClassValue;onchange?:(arg:number)=>void;
    } = $props();

    function handleInput(e:Event) {
        const target = e.target as HTMLInputElement;
        value = parseInt(target.value, 10);
         console.log("value=",value);
    }

</script>

<div class={["relative z-0 mt-2 w-xs h-15 rounded-2xl shadow-md overflow-hidden",!on&&"bg-gray-300"]}>
    <!-- Background track -->
    <div class={["flex flex-row absolute z-1 inset-0 rounded-lg",{"opacity-30":on},{"opacity-0":!on},cls]}>
    </div>

    <!-- Progress bar -->
    <div
            class={["absolute h-full shadow-lg z-1",{"opacity-100":on},{"opacity-20":!on},cls]}
            style={`width: ${value}%`}
    ></div>

    <!-- Text content -->
    <div class="absolute inset-0 z-2 flex items-center justify-between px-4">
        <h1 class="text-current">Dimmer</h1>
        <p class="text-current">{value}%</p>
    </div>

    <!-- Slider input -->
    <input
            onchange={handleInput}
            type="range"
            min="0"
            max="100"
            bind:value
            class="absolute inset-0 z-10 opacity-0 w-full h-full cursor-pointer"
            aria-label="Progress selector"
    />
</div>
