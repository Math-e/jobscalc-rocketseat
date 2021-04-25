const Job = require('../model/Job')
const Profile = require('../model/Profile')
const JobUtils = require('../utils/jobUtils')
const Language = require('./LangController')

module.exports = {
    async index(req, res) {
        const jobGet = await Job.get()
        const profileGet = await Profile.get()

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobGet.length
        }

        let jobTotalHours = 0

        const updatedJobs = jobGet.map((job) => {
            // ajustes no job
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'

            //soma de status
            statusCount[status]++

            //soma de horas trabalhadas por dia
            jobTotalHours = status == 'progress' ? jobTotalHours += Number(job['daily-hours']) : jobTotalHours
            //if(status === 'progress') jobTotalHours += Number(job['daily-hours'])

            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profileGet["value-hour"])
            }
        })

        const freeHours = profileGet["hours-per-day"] - jobTotalHours

        return res.render("index", {
            jobs: updatedJobs,
            profile: profileGet,
            statusCount: statusCount,
            freeHours: freeHours,
            lang: Language.get()
        })
    }
}