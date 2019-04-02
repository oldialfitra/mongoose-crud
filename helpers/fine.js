module.exports = (due_date, in_date) => {
    let msPerDay = 8.64e7
    return Math.round((new Date(in_date).setHours(12, 0, 0) - new Date(due_date).setHours(12, 0, 0)) / msPerDay) * 1000
}