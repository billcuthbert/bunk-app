const express = require("express")
const cors = require("cors")
const axios = require("axios")

const app = express()
const port = 8081
const corsOptions = { origin: "http://localhost:4200" }

app.use(cors(corsOptions))

const launchURL = `https://api.spacexdata.com/v4/launches/upcoming`
const rocketURL = `https://api.spacexdata.com/v4/rockets/`
const crewURL = `https://api.spacexdata.com/v4/crew/`

app.get(`/launches`, (_: null, res: { json: (payload: JSON[]) => void }) => {
  console.log("launch")
  axios(launchURL).then((sl: SpacexLaunches) => {
    res.json(sl.data)
  })
})

app.get(`/rocket/:rocketId`, (req: Request, res: { json: (payload: JSON) => void }) => {
  const rId = req.params.rocketId
  console.log("rocket", rId)
  axios(rocketURL + rId).then((sd: SpacexData) => {
    res.json(sd.data)
  })
})

app.get(`/crew/:crewId`, (req: Request, res: { json: (payload: JSON) => void }) => {
  const cId = req.params.crewId
  console.log("crew", cId)
  axios(crewURL + cId).then((sd: SpacexData) => {
    res.json(sd.data)
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`)
})

interface SpacexLaunches {
  data: JSON[]
}

interface SpacexData {
  data: JSON
}

interface Request {
  params: {
    rocketId: string
    crewId: string
  }
}