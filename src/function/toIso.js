

export default function toIso( inDay, inMonth, inYear, inHour, inMinute, inSecounds ){
    const day = ('0' + inDay).slice(-2);
    const month = ('0' + inMonth).slice(-2);
    const hour = ('0' + inHour).slice(-2);
    const minute = ('0' + inMinute).slice(-2);
    const secound = ('0' + inSecounds).slice(-2);

    return (`${inYear}-${month}-${day}T${hour}:${minute}:${secound}Z`)
}