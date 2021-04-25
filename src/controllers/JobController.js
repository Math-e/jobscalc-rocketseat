const Job = require('../model/Job')
const JobUtils = require('../utils/jobUtils')
const Profile = require('../model/Profile')
const Language = require('./LangController')

module.exports = {
    create(req, res) {//pagina criar job
        return res.render("job", {lang: Language.get()})
    },

    async save(req, res) {//criar novo job
        
        await Job.create({
            name: req.body.name,
            daily_hours: req.body.daily_hours,
            total_hours: req.body.total_hours,
            created_at: Date.now()
        })


        return res.redirect('/')
    },

    async show(req, res) {
        const jobId = req.params.id
        const jobGet = await Job.get()

        const job = jobGet.find(job => Number(job.id) === Number(jobId))

        if (!job) {
            return res.send('Job not found!')
        }

        const profile = await Profile.get()

        job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

        return res.render("job-edit", { job, lang: Language.get() })
    },

    async update(req, res) {
        const jobId = req.params.id

        const updatedJob = {
            name: req.body.name,
            total_hours: req.body["total-hours"],
            daily_hours: req.body["daily-hours"],
        }

        await Job.update(updatedJob, jobId)

        res.redirect('/job/' + jobId)
    },

    delete(req, res) {
        const jobId = req.params.id
        
        Job.delete(jobId)

        return res.redirect('/')
    }
}