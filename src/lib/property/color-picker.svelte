<script lang="ts">
    import {
        hslToRgb,
        rgbToHex,
        hexToRgb,
        rgbToHsl,
        type RGB,
        type HSL,
        type ColorChangeEventDetail
    } from "./utils/color-converters";

    let {
        initialColor = "#FF0000",
        target = false,
        onchange: dispatchChange = (detail: ColorChangeEventDetail) => {},
    } = $props<{
        target?: boolean,
        initialColor?: string;
        onchange?: (detail: ColorChangeEventDetail) => void;
    }>();

    // Convert initial color to HSL
    const initialRgb = hexToRgb(initialColor);
    let color: HSL = $state(
        initialRgb ? rgbToHsl(initialRgb.r, initialRgb.g, initialRgb.b) : { h: 0, s: 100, l: 50 }
    );

    // Derived values
    const rgb = $derived(hslToRgb(color.h, color.s, color.l));
    const hex = $derived(rgbToHex(rgb.r, rgb.g, rgb.b));
    const rgbString = $derived(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);

    // DOM reference
    let colorAreaRef: HTMLDivElement;

    // Color selection logic
    let isDragging = false;

    function handleMouseDown(e: MouseEvent) {
        isDragging = true;
        updateColor(e);
        window.addEventListener("mousemove", updateColor);
        const handleMouseUp = () => {
            isDragging = false;
            window.removeEventListener("mousemove", updateColor);
            window.removeEventListener("mouseup", handleMouseUp);
        };
        window.addEventListener("mouseup", handleMouseUp);
    }

    function updateColor(e: MouseEvent) {
        if (!isDragging || !colorAreaRef) return;

        const rect = colorAreaRef.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

        // Calculate polar coordinates from the center of the square
        const dx = (x / rect.width - 0.5) * 2; // Normalize x to [-1, 1]
        const dy = (y / rect.height - 0.5) * 2; // Normalize y to [-1, 1]

        // Radius (distance from center), capped at 1
        const radius = Math.min(Math.sqrt(dx * dx + dy * dy), 1);
        // Angle in degrees
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        // Calculate HSL values based on polar coordinates
        color.h = (angle + 360) % 360; // Hue is the angle (0-360)
        color.s = radius * 100; // Saturation is the distance from the center (0-100)
        color.l = 100 - (radius * 50); // Lightness goes from 100 (center) to 50 (edge)

        // Ensure values are within valid ranges
        color.h = Math.max(0, Math.min(360, color.h));
        color.s = Math.max(0, Math.min(100, color.s));
        color.l = Math.max(0, Math.min(100, color.l));

        dispatchChange({ ...color, rgb, hex });
    }

    // Input handlers with proper typing
    function handleHexChange(e: Event) {
        const target = e.target as HTMLInputElement;
        const newHex = target.value;
        const newRgb = hexToRgb(newHex);
        if (newRgb) {
            const newHsl = rgbToHsl(newRgb.r, newRgb.g, newRgb.b);
            Object.assign(color, newHsl);
            dispatchChange({ ...color, rgb: newRgb, hex: newHex });
        }
    }

    // Preset colors
    const presetColors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF", "#FFA500", "#F0F0F0"] as const;

    function selectPresetColor(hexValue: string) {
        const newRgb = hexToRgb(hexValue);
        if (newRgb) {
            const newHsl = rgbToHsl(newRgb.r, newRgb.g, newRgb.b);
            Object.assign(color, newHsl);
            dispatchChange({ ...color, rgb: newRgb, hex: hexValue });
        }
    }
</script>

<div class="w-xs bg-gray-50 rounded-lg shadow-md flex flex-col gap-4">
    <div class="relative w-full aspect-square rounded-full overflow-hidden cursor-crosshair"
         bind:this={colorAreaRef}
         onmousedown={handleMouseDown}
         style="background: conic-gradient(from 90deg, hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%));">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,white_0%,transparent_100%)]"></div>
        <div class="absolute w-4 h-4 rounded-full border-2 border-white shadow-sm -translate-x-1/2 -translate-y-1/2 pointer-events-none"
             style={`left: ${50 + (color.s / 100) * Math.cos((color.h * Math.PI) / 180) * 50}%;
                     top: ${50 + (color.s / 100) * Math.sin((color.h * Math.PI) / 180) * 50}%`}></div>
    </div>

    <div class="flex flex-wrap gap-2 justify-center pb-3">
        {#each presetColors as preset}
            <div class="w-6 h-6 rounded-md border border-gray-200 cursor-pointer shadow-sm hover:scale-110 active:scale-95 transition-transform"
                 style={`background: ${preset}`}
                 onclick={() => selectPresetColor(preset)}></div>
        {/each}
    </div>

    {#if target}
        <div class="flex gap-3">
            <div class="w-14 h-14 rounded-md border border-gray-200 shadow-inner"
                 style={`background: ${rgbString}`}></div>
            <div class="grid grid-cols-3 gap-2 flex-1">
                <div class="flex flex-col gap-1 col-span-2">
                    <p class="text-xs text-gray-500">HEX</p>
                    <input type="text" value={hex}
                           class="w-full text-sm border border-gray-200 rounded focus:border-blue-400 focus:ring-1 focus:ring-blue-200 outline-none"
                           onchange={handleHexChange} />
                </div>
            </div>
        </div>
    {/if}
</div>
