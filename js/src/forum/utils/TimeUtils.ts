import dayjs from 'dayjs';
import app from 'flarum/forum/app';
export function expireTimeFormat(expire_at: string) {
    const d: Date = new Date(expire_at);
    const targ = dayjs(d);
    if (targ.year() != dayjs().year()) {
        return targ.format('YYYY-MM-DD');
    }
    return targ.format('MM-DD HH:mm');
}
function padZero(n: number): string {
    if (n < 10) return '0' + n;
    return n + "";
}
export function effectLengthFormat(expire_time: number) {
    const TIMES = (app.translator.trans("xypp-store.forum.time_segs") as string[])[0].split("|");
    let ret = "";
    expire_time = Math.floor(expire_time / 60);
    if (expire_time == 0) {
        return "<" + 1 + TIMES[2];
    }
    const m = expire_time % 60;
    expire_time = Math.floor(expire_time / 60);
    if (expire_time == 0) {
        return m + TIMES[2];
    }

    const h = expire_time % 60;
    const d = Math.floor(expire_time / 24);

    if (d == 0) {
        if (m == 0) {
            return h + TIMES[1];
        }
        return h + TIMES[1] + " " + m + TIMES[2];
    } else {
        if (h == 0) {
            return d + TIMES[0];
        }
        return d + TIMES[0] + " " + h + TIMES[1];
    }
}