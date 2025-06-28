<script lang="ts">
    import type {ClassValue} from "svelte/elements";
    import type {Capabilities} from "src/models/types";


    let {
        title = "Title",
        group = "default",
        class: cls,
        deviceType,
        on,
        color = "#f5b041",
        connected = true,
        loading = false,
        status = "",
        setOn,
        children,
    }: {
        title: string;
        class?: ClassValue;
        deviceType?: Capabilities;
        connected?: boolean;
        on?: boolean;
        color?: string;
        loading?: boolean;
        status: string;
        setOn?: (arg0:boolean) => void;
        group?: string;
        children?:any;
    } = $props();

</script>

<div class={["flex border-1 flex-col p-2 rounded-2xl max-w-40 shadow-md aspect-[5/4]",cls]} class:bg-gray-100={!on}>
    <div id="panel-top" class="flex flex-row flex-1/3 ">
        <div id="icons-start" class="flex flex-1/2 items-center">
            {@render children?.()}
        </div>
        <div id="icons-end" class={["flex flex-1/2 flex-row justify-end items-center"]}>
            {#if on !== undefined}
              <button class={["btn btn-circle",{"bg-cyan-300":on}]} aria-label="on/off" onclick={()=>{setOn?.(!on)}}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={on? "white":"gray"}>
                       <path d="M0 0h24v24H0V0z" fill="none"/><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>
                  </svg>
              </button>
            {/if}
        </div>
    </div>

    <div id="panel-bot" class="flex pt-2 flex-2/3 flex-row ">
        <div class="flex grow flex-col justify-center  items-start">
            <span class="flex-1/3 text-sm {on ? 'text-gray-500' : 'text-gray'}">{group}</span>
            <strong class=" flex-1/3 text-sm font-semibold   {on ? 'text-gray-800' : 'text-gray'}">{title}</strong>
            <p class="flex-1/3 text-sm font-semibold text-center {on ? 'text-gray-500' : 'text-gray'}">
                {status}
            </p>
        </div>
    </div>

</div>

