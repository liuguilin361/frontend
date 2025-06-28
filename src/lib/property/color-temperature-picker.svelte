<script lang="ts">
    import {type ColorChangeEventDetail, kelvinToHex, kelvinToRgb, rgbToHex} from "./utils/color-converters";


    let {
        target = false,
        initialKelvin = 6500,
        minKelvin = 1000,
        maxKelvin = 15000,
        onchange: dispatchChange = (detail: ColorChangeEventDetail) => {
        },
    } = $props<{
        target?: boolean,
        initialKelvin?: number;
        minKelvin?: number;
        maxKelvin?: number;
        onchange?: (detail: ColorChangeEventDetail) => void;
    }>();

    // Preset colors
    const presetKelvin = [
        1000,
        2000,
        3000,
        4000,
        5000,
        6500,
        9000,
        15000,
    ] as const;


    // 内部状态
    let currentKelvin = $state(initialKelvin);
    let anchorY = $state('50%'); // New state for anchor's vertical position

    // 派生状态
    const rgb = $derived(kelvinToRgb(currentKelvin));
    const hex = $derived(rgbToHex(rgb.r, rgb.g, rgb.b));
    const rgbString = $derived(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);

    // 计算滑块位置百分比 (0-100) - This is for the X-axis (Kelvin value)
    const sliderPositionX = $derived(
        ((currentKelvin - minKelvin) / (maxKelvin - minKelvin)) * 100
    );

    // 动态生成渐变颜色
    const generateGradient = () => {
        const steps = 10;
        const kelvinRange = maxKelvin - minKelvin;
        const kelvinStep = kelvinRange / (steps - 1);
        const gradientStops = [];

        for (let i = 0; i < steps; i++) {
            const kelvin = minKelvin + i * kelvinStep;
            const rgb = kelvinToRgb(kelvin);
            gradientStops.push(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
        }
        return `linear-gradient(to right, ${gradientStops.join(', ')})`;
    };

    // DOM引用
    let temperatureInputRectRef: HTMLDivElement | undefined;
    let isDragging = $state(false);

    // 更新色温值
    function setKelvin(newKelvin: number): void {
        const clamped = Math.max(minKelvin, Math.min(newKelvin, maxKelvin));
        const rounded = Math.round(clamped);

        if (rounded !== currentKelvin) {
            currentKelvin = rounded;
            dispatchChange({
                kelvin: currentKelvin,
                rgb: rgb,
                hex: hex,
            });
        }
    }

    // 从事件位置计算色温和更新锚点位置
    function updateFromEvent(event: MouseEvent | TouchEvent): void {
        if (!temperatureInputRectRef) return;

        const rect = temperatureInputRectRef.getBoundingClientRect();
        const clientX = 'clientX' in event ? event.clientX : event.touches[0].clientX;
        const clientY = 'clientY' in event ? event.clientY : event.touches[0].clientY;

        // Calculate X position relative to the element (for Kelvin calculation)
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));

        // Calculate Y position relative to the element (for anchor placement)
        const y = Math.max(0, Math.min(clientY - rect.top, rect.height));

        // Update anchorY state (as a percentage for consistent placement)
        anchorY = `${(y / rect.height) * 100}%`;

        // Calculate new Kelvin value based ONLY on X position
        const newKelvin = minKelvin + (x / rect.width) * (maxKelvin - minKelvin);
        setKelvin(newKelvin);
    }

    function selectPresetKelvin(value: number) {
        setKelvin(value);
        const newRgb = kelvinToRgb(value);
        const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
        if (newRgb) {
            dispatchChange({kelvin: value, rgb: newRgb, hex: hex});
        }
    }

    // 事件处理函数
    function handlePointerDown(event: MouseEvent | TouchEvent): void {
        if (!(event.currentTarget instanceof HTMLDivElement)) return;
        temperatureInputRectRef = event.currentTarget;
        isDragging = true;
        updateFromEvent(event);

        window.addEventListener("mousemove", handlePointerMove);
        window.addEventListener("mouseup", handlePointerUp);
        window.addEventListener("touchmove", handlePointerMove, {passive: false});
        window.addEventListener("touchend", handlePointerUp);

        event.preventDefault();
    }

    function handlePointerMove(event: MouseEvent | TouchEvent): void {
        if (!isDragging) return;
        updateFromEvent(event);
    }

    function handlePointerUp(): void {
        isDragging = false;
        window.removeEventListener("mousemove", handlePointerMove);
        window.removeEventListener("mouseup", handlePointerUp);
        window.removeEventListener("touchmove", handlePointerMove);
        window.removeEventListener("touchend", handlePointerUp);
    }
</script>

<div class="w-[300px]  bg-gray-50 rounded-lg shadow-md flex flex-col gap-4">
    <div class="relative w-full aspect-square rounded-full overflow-hidden cursor-crosshair"
         bind:this={temperatureInputRectRef}
         on:mousedown={handlePointerDown}
         on:touchstart={handlePointerDown}
         style="background: {generateGradient()};"
    >
        <div class="absolute w-4 h-4 rounded-full border-2 border-white shadow-sm -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style="left: {sliderPositionX}%; top: {anchorY};"
        ></div>
    </div>

    <div class="flex flex-wrap gap-2  justify-center  pb-3">
        {#each presetKelvin as preset}
            <div class="w-6 h-6 rounded-md border border-gray-200 cursor-pointer shadow-sm hover:scale-110 active:scale-95 transition-transform"
                 style={`background: ${ kelvinToHex(preset)}`}
                 on:click={() => selectPresetKelvin(preset)}>
            </div>
        {/each}
    </div>


    {#if target}
        <div class="flex items-start gap-4">
            <div
                    class="w-[80px] h-[80px] rounded-md border border-gray-300 shadow-inner shrink-0"
                    style="background-color: {rgbString};"
            ></div>

            <div class="flex flex-col gap-2 flex-grow">
                <div class="flex items-center gap-1.5">
                    <span class="text-sm text-gray-600 w-[60px] text-right">开尔文 (K)</span>
                    <span class="flex-grow py-1.5 px-2 border border-gray-300 rounded-md text-sm font-mono bg-gray-50">
                    {currentKelvin}
                </span>
                </div>
                <div class="text-sm text-gray-700 font-mono">
                    <p>RGB: {rgb.r}, {rgb.g}, {rgb.b}</p>
                    <p>HEX: {hex}</p>
                </div>
            </div>
        </div>
    {/if}

</div>
