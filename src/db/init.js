//arquivo rodado uma vez pra criar tabelas
const Database = require('./config')

const initDB = {
    async init() {

        const db = await Database()//chamar DB com prioridade pra ser terminado antes dos proximos comandos

        //

        const dbQuery = `CREATE TABLE profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            monthly_budget INT,
            days_per_week INT,
            hours_per_day INT,
            vacation_per_year INT,
            value_hour INT)`

                await db.exec(dbQuery)

                await db.exec(`CREATE TABLE jobs(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            daily_hours INT,
            total_hours INT,
            created_at DATETIME
        )`)


                //


                await db.run(`INSERT INTO profile(
            name,
            avatar,
            monthly_budget,
            days_per_week,
            hours_per_day,
            vacation_per_year,
            value_hour
        ) VALUES (
            "Matheus",
            "github.com/Math-e.png",
            3000,
            5,
            5,
            4,
            75
        )`)

                await db.run(`INSERT INTO jobs(
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "Pizzaria",
            2,
            1,
            1618264278028
        )`)
                await db.run(`INSERT INTO jobs(
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "OneTwo",
            3,
            40,
            1618264678028
        )`)


        //


        await db.close()
    }
}

initDB.init()