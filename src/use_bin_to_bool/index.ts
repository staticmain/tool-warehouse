export enum BinMode {
    // 正常模式
    Normal = 'normal',
    // 反转模式
    Reverse = 'reverse'
}

/**
 * 解析按位存储的十进制数字或字符串，数字转为boolean数组
 * @param bin 按位存储的十进制数字
 * @param count 位数，当前需要解析多少位
 * @param mode 模式，是否需要反转
 * @returns boolean数组
 */
export function useBinToBool(bin: number | string, count: number, mode: BinMode = BinMode.Normal): boolean[] {
    let binStr = Number(bin).toString(2);
    if (binStr.length < count) {
        binStr = '0'.repeat(count - binStr.length) + binStr;
    }

    return mode === BinMode.Normal ?
        binStr.split('').map(value => value === '1') :
        binStr.split('').map(value => value === '1').reverse();
}