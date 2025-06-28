<!-- ColorPalette.svelte -->
<script lang="ts">
    let {
        colors = [
            '#FF5733', '#33FF57', '#3357FF', '#F3FF33',
            '#FF33F3', '#33FFF3', '#000000', '#FFFFFF'
        ],
        defaultColor = $bindable('#FF5733'),
        onColorChange = (newColors: string[]) => {} // 新增事件回调
    } = $props();

    // 使用 $state 管理状态
    let selectedColor = $state(defaultColor);
    let editingIndex = $state<number | null>(null);
    let tempColor = $state('#FFFFFF');
    let longPressTimer: number;

    // 确保始终只有8种颜色，并创建响应式副本
    let localColors = $state(colors.slice(0, 8));

    // 监听外部 colors 变化，同步到 localColors
    $effect(() => {
        localColors = colors.slice(0, 8);
    });

    function handleLongPress(index: number, color: string) {
        cancelLongPress(); // 防止多次触发
        longPressTimer = setTimeout(() => {
            editingIndex = index;
            tempColor = color;
        }, 800); // 800ms 长按触发
    }

    function cancelLongPress() {
        clearTimeout(longPressTimer);
    }

    // 保存颜色并通知父组件
    function saveColor() {
        if (editingIndex === null) return;
        const newColors = [...localColors];
        newColors[editingIndex] = tempColor;
        localColors = newColors; // 更新本地副本
        selectedColor = tempColor; // 更新选中颜色
        onColorChange(newColors); // 通知父组件
        editingIndex = null; // 关闭模态框
    }
</script>

<div class="color-palette p-4 bg-white rounded-lg shadow-md w-[300px] max-w-xs">
    <h3 class="text-lg font-semibold mb-3 text-gray-800">颜色调板</h3>

    <!-- 颜色网格 - 固定8个 -->
    <div class="grid grid-cols-4 gap-3 mb-4">
        {#each localColors as color,index (index)}
            <div class="relative">
                <button
                        class="w-10 h-10 rounded-full border-2 transition-all duration-200
                 hover:scale-110 focus:outline-none
                 {selectedColor === color ? 'border-blue-500 scale-110' : 'border-gray-200'}"
                        style={`background-color: ${color}`}
                        on:click={() => selectedColor = color}
                        on:mousedown={() => handleLongPress(index, color)}
                        on:mouseup={cancelLongPress}
                        on:mouseleave={cancelLongPress}
                        on:touchstart|preventDefault={() => handleLongPress(index, color)}
                        on:touchend|preventDefault={cancelLongPress}
                        on:touchcancel={cancelLongPress}
                        aria-label={`选择颜色 ${color}`}
                        title="点击选择，长按编辑"
                >
                    {#if selectedColor === color}
                        <span class="sr-only">已选中</span>
                    {/if}
                </button>
            </div>
        {/each}
    </div>

    <!-- 当前颜色预览 -->
    <div class="p-3 rounded bg-gray-50 border border-gray-200">
        <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-gray-600">当前选择:</span>
            <span class="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{selectedColor}</span>
        </div>
        <div class="w-full h-8 rounded border border-gray-300" style={`background-color: ${selectedColor}`}></div>
    </div>

    <!-- 颜色编辑模态框 -->
    {#if editingIndex !== null}
        <div
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                on:click={() => editingIndex = null}
        >
            <div
                    class="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full"
                    on:click|stopPropagation
            >
                <h4 class="text-lg font-medium mb-4">编辑颜色</h4>

                <div class="flex items-center mb-4">
                    <div
                            class="w-12 h-12 rounded border border-gray-300 mr-4"
                            style={`background-color: ${tempColor}`}
                    ></div>
                    <input
                            type="color"
                            bind:value={tempColor}
                            class="flex-1 h-12 cursor-pointer"
                            aria-label="选择新颜色"
                    >
                </div>

                <div class="flex justify-end space-x-3">
                    <button
                            class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                            on:click={() => editingIndex = null}
                    >
                        取消
                    </button>
                    <button
                            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            on:click={saveColor}
                    >
                        保存
                    </button>
                </div>
            </div>
        </div>
    {/if}
</div>
