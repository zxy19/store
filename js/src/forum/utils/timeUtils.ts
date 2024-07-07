import dayjs from 'dayjs';
import app from 'flarum/forum/app';
export function expireTimeFormat(expire_at: string) {
    const d: Date = new Date(expire_at);
    const targ = dayjs(d);
    if (targ.year() != dayjs().year()) {
        return targ.format('YYYY-MM-DD');
    }
    if (targ.diff(dayjs(), 'day') > 3) {
        return targ.format('MM-DD HH');
    }
    return targ.format('DD HH:mm');
}
export function effectLengthFormat(expire_time: number) {
    const TIMES = (app.translator.trans("xypp-store.forum.time_segs") as string[])[0].split("|");
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
    const d = Math.floor(expire_time / 60);
    if (d == 0) {
        return h + TIMES[1] + " " + m + TIMES[2];
    } else {
        return d + TIMES[0] + " " + h + TIMES[1] + " " + m + TIMES[2];
    }
}