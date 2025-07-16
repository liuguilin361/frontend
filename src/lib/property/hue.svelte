<!-- ColorPalette.svelte -->
<script lang="ts">
    import {hexToRgb, type HSL, type RGB, rgbToHsl} from "../../components/property/utils/color-converters";

    // Define component event detail type (no alpha)
    interface ColorChangeEventDetail extends HSL { // Changed from HSLA to HSL
        rgb: RGB;
        hex: string;
    }

    let mode: "temp" | "color" = "color";

    let {
        defaultColor = $bindable('#FF5733'),
        colors = $bindable([
            '#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#DDDDDD',
        ]),
        onColorChange: dispatchChange = (detail: ColorChangeEventDetail) => {
        },
    } = $props();


    // Internal state - use HSL model (no alpha)
    const initialRgb: RGB | null = hexToRgb(defaultColor);

    let color: HSL = $state( // Changed from HSLA to HSL
        initialRgb
            ? rgbToHsl(initialRgb.r, initialRgb.g, initialRgb.b)
            : {h: 0, s: 100, l: 50},
    );


    // Preset color click
    function selectPresetColor(hexValue: string): void {
        const newRgb = hexToRgb(hexValue);
        defaultColor = hexValue;
        if (newRgb) {
            const newHsl = rgbToHsl(newRgb.r, newRgb.g, newRgb.b);
            color.h = newHsl.h;
            color.s = newHsl.s;
            color.l = newHsl.l;
            // No alpha to set here
            dispatchChange({
                h: color.h,
                s: color.s,
                l: color.l,
                rgb: newRgb,
                hex: hexValue,
            });
        }
    }

    // 使用 $state 管理状态
    let editingIndex = $state<number | null>(null);

    // 确保始终只有8种颜色，并创建响应式副本
    let localColors = $state(colors.slice(0, 8));

    // 监听外部 colors 变化，同步到 localColors
    $effect(() => {
        localColors = colors.slice(0, 8);
    });


    // 保存颜色并通知父组件
    function saveColor() {
        if (editingIndex === null) return;
        localColors = [...localColors]; // 更新本地副本
        // onColorChange(newColors); // 通知父组件
        editingIndex = null; // 关闭模态框
    }
</script>

<div class="color-palette p-4 bg-white rounded-lg shadow-md w-[300px] max-w-xs">
    <h3 class="text-lg font-semibold mb-3 text-gray-800">颜色</h3>


    <div class="flex flex-wrap gap-2 justify-end">
        <div
                class="w-7 h-7 rounded-md border border-gray-300 cursor-pointer shadow-inner transition-transform duration-100 hover:scale-105 active:scale-95"
                style="background: radial-gradient(  #ff0000, #ffff00, #ffffff, #0000ff)"></div>
        <div
                class="w-7 h-7 rounded-md border border-gray-300 cursor-pointer shadow-inner transition-transform duration-100 hover:scale-105 active:scale-95"
                style="background:  linear-gradient(  #ff0000, #ffff00, #ffffff, #0000ff)"></div>
        <hr/>
        {#each colors as preset,index (index)}
            <div
                    class="w-7 h-7 rounded-md border border-gray-300 cursor-pointer shadow-inner transition-transform duration-100 hover:scale-105 active:scale-95   {preset === defaultColor ? 'border-gray-500 scale-110' : 'border-gray-200'}"
                    style="background-color: {preset};"
                    onclick={() => selectPresetColor(preset)}
            ></div>
        {/each}
    </div>

    <!-- 当前颜色预览 -->
    <div class="mt-4 p-3 rounded bg-gray-50 border border-gray-200">
        <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-gray-600">当前选择:</span>
            <span class="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{defaultColor}</span>
        </div>
        <div class="w-full h-8 rounded border border-gray-300" style={`background-color: ${defaultColor}`}></div>
    </div>

</div>
