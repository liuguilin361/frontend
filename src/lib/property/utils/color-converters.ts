// Define color model interfaces
export interface RGB {
    r: number;
    g: number;
    b: number;
}

export interface ColorChangeEventDetail extends HSL {
    kelvin?: number;
    rgb: RGB;
    hex: string;
}

export interface HSL {
    h: number;
    s: number;
    l: number;
}

// HSL to RGB conversion
export function hslToRgb(h: number, s: number, l: number): RGB {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0;
    let g = 0;
    let b = 0;

    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return { r, g, b };
}

// RGB to HSL conversion
export function rgbToHsl(r: number, g: number, b: number): HSL {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return { h, s, l };
}

// RGB to HEX conversion
export function rgbToHex(r: number, g: number, b: number): string {
    return (
        "#" +
        ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
    );
}



// HEX to RGB conversion
export function hexToRgb(hex: string): RGB | null {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
}

/**
 * 将色温（开尔文）转换为近似的RGB值。
 *
 * 该算法是一个近似值，用于模拟不同色温下的颜色。
 * 实际的色温转换非常复杂，通常需要查表或更复杂的数学模型。
 *
 * @param kelvin - 色温值，范围通常在 1000K 到 40000K 之间。
 * @returns 包含 r, g, b 分量的 RGB 对象。
 */
export function kelvinToRgb(kelvin: number): RGB {
    let r = 0;
    let g = 0;
    let b = 0;

    // 确保开尔文值在合理范围内
    kelvin = Math.max(1000, Math.min(kelvin, 40000)) / 100; // 简化为c

    // 计算红色
    if (kelvin < 66) {
        r = 255;
    } else {
        r = kelvin - 60;
        r = 329.698727446 * Math.pow(r, -0.1332047592);
        if (r < 0) r = 0;
        if (r > 255) r = 255;
    }

    // 计算绿色
    if (kelvin < 66) {
        g = kelvin;
        g = 99.4708025861 * Math.log(g) - 161.1195681661;
        if (g < 0) g = 0;
        if (g > 255) g = 255;
    } else {
        g = kelvin - 60;
        g = 288.1221695283 * Math.pow(g, -0.0755148492);
        if (g < 0) g = 0;
        if (g > 255) g = 255;
    }

    // 计算蓝色
    if (kelvin >= 66) {
        b = 255;
    } else if (kelvin < 19) {
        b = 0;
    } else {
        b = kelvin - 10;
        b = 138.5177312231 * Math.log(b) - 305.0447927307;
        if (b < 0) b = 0;
        if (b > 255) b = 255;
    }

    return {
        r: Math.round(r),
        g: Math.round(g),
        b: Math.round(b),
    };
}

// Kelvin to HEX conversion
export function kelvinToHex(value:number): string {
    const rgb = kelvinToRgb(value);
    return rgbToHex(rgb.r,rgb.g,rgb.b);
}

