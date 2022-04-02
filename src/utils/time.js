
const timeConver = ( date1, date2 ) => {

    let airDate = new Date( date1 )
    let created = new Date( date2 )
    let diffDate = airDate.getTime() - created.getTime()
    let ms = -1 * diffDate
    let msAge = 1000 * 60 * 60 * 24 * 365
    let msMonth = 1000 * 60 * 60 * 24 * 30
    let msDay = 1000 * 60 * 60 * 24
    let msHour = 1000 * 60 * 60
    let msMinute = 1000 * 60
    let msSeconds = 1000
    let años = Math.floor( ms / msAge )
    ms = ms - ( msAge * años )
    let meses = Math.floor( ms / msMonth )
    ms = ms - ( msMonth * meses )
    let dias = Math.floor( ms / msDay )
    ms = ms - ( msDay * dias )
    let horas = Math.floor( ms / msHour )
    ms = ms - ( msHour * horas )
    let minutos = Math.floor( ms / msMinute )
    ms = ms - ( msMinute * minutos )
    let segundos = Math.floor( ms / msSeconds )

    return {
        diffDate : -1*diffDate,
        time : ` ${ años }a ${ meses }m ${ dias }d ${ horas }h ${ minutos }m ${ segundos }s `
    }

}

export default timeConver
