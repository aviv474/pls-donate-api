const express = require("express")
const axios = require("axios")
const cors = require("cors")

const app = express()
app.use(cors())

app.get("/gamepasses/:userid", async (req, res) => {
  const userId = req.params.userid
  const url = `https://games.roblox.com/v2/users/${userId}/games?accessFilter=2&limit=50`
  try {
    const response = await axios.get(url)
    const games = response.data.data
    if (!games || games.length === 0) return res.json([])

    const gameId = games[0].id
    const storeUrl = `https://games.roblox.com/v1/games/${gameId}/game-passes`
    const storeRes = await axios.get(storeUrl)

    res.json(storeRes.data.data || [])
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch" })
  }
})

app.listen(3000, () => {
  console.log("API is running on port 3000")
})
