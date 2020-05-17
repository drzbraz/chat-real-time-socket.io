let moment = require('moment-timezone')
moment.updateLocale('pt-BR')

class DateService {
    static now() {
        return moment.tz(process.env.TIMEZONE)
    }

    static toDate(date, format = null) {
        if (format) {
            return moment(date, format)
        }

        return moment(date)
    }
}

module.exports = DateService