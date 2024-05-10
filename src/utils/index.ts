import dayjs from 'dayjs';
/**
 * @param date - 时间
 * @param type - 格式化类型（'YYYY-MM-DD'、'YYYY年MM月DD日'）
 */
export function formatDate(date: string | number | Date | dayjs.Dayjs | null | undefined, type: string | undefined) {
    var time = date;
    type = type || 'YYYY-MM-DD';
    time = dayjs(date).format(type);
    if (date == null || date == '' || date == undefined) {
        return '';
    } else {
        return time;
    }
}