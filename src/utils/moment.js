import moment from "moment"

export const TimeBeranda = () => {
    let day = moment().format('dddd');

    if (day == 'Monday') day = `Senin`
    if (day == 'Tuesday') day = `Selasa`
    if (day == 'Wednesday') day = `Rabu`
    if (day == 'Thursday') day = `Kamis`
    if (day == 'Friday') day = `Jum'at`
    if (day == 'Saturday') day = `Sabtu`
    if (day == 'Sunday') day = `Minggu`

    let date = moment().format('D')

    let month = moment().format("MMMM");

    if (month == 'January') month = 'Januari'
    if (month == 'February') month = 'Februari'
    if (month == 'March') month = 'Maret'
    if (month == 'April') month = 'April'
    if (month == 'May') month = 'Mei'
    if (month == 'June') month = 'Juni'
    if (month == 'July') month = 'Juli'
    if (month == 'August') month = 'Agustus'
    if (month == 'September') month = 'September'
    if (month == 'October') month = 'Oktober'
    if (month == 'November') month = 'Novembar'
    if (month == 'December') month = 'Desember'

    let year = moment().format('YYYY');

    return day + ',  ' + date + '  ' + month + '  ' + year
}

export const convertCreateAt = (data) => {
    let convert = data.split('T')
    let date = convert[0]
    let temp = convert[1].split('z')
    let clock = temp[0].split(':')

    return date + '  ' + clock[0] + ':' + clock[1]
}

export const convertnotivTime = (data) => {

    let temp = data.replace('T', " ").replace("Z", " +0700");
    let convert = moment().subtract(temp, 'days').calendar()

    return convert
}