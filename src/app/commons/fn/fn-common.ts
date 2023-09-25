export function isDate(data: any) {
    return Object.prototype.toString.call(data) === '[object Date]';
}

export function isRegex(data: any) {
    return Object.prototype.toString.call(data) === '[object RegExp]';
}

export function encode(value: unknown): string {
    if (isDate(value)) {
        return '__st_date|' + (value as Date).toUTCString();
    }
    if (isRegex(value)) {
        return '__st_expr|' + (value as RegExp).source;
    }
    if (typeof value === 'number') {
        return '__st_numb|' + value;
    }
    if (typeof value === 'boolean') {
        return '__st_bool|' + (value ? '1' : '0');
    }
    if (typeof value === 'string') {
        return '__st_strn|' + value;
    }
    if (typeof value === 'function') {
        return '__st_strn|' + value.toString();
    }
    if (value === Object(value)) {
        return '__st_objt|' + JSON.stringify(value);
    }

    return value + '';
}

export function decode(value: string): unknown {
    const length = value.length;
    if (length < 10) {
        return value;
    }

    const type = value.substr(0, 9);
    const source = value.substring(10);

    switch (type) {
        case '__st_date':
            return new Date(source);

        case '__st_expr':
            return new RegExp(source);

        case '__st_numb':
            return Number(source);

        case '__st_bool':
            return Boolean(source === '1');

        case '__st_strn':
            return '' + source;

        case '__st_objt':
            return JSON.parse(source);

        default:
            return value
    }
}