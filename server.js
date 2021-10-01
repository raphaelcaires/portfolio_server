const express = require('express')
const nunjucks =require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true
})

server.get("/", function(req, res) {
  const about = {
    avatar: "/image/raphaelcaires.png",
    name: "Raphael Caires",
    role: "Software Engineer | Full-Stack",
    description: `Programming student at <a href="https://app.rocketseat.com.br/me/raphaelcaires" target="_blank">Rocketseat</a>, I love tech and like challenges. I'm always ready to learn! 😁`,
    links: [
      { name: "GitHub", url: "https://github.com/raphaelcaires/"},
      { name: "Twitter", url: "https://twitter.com/raphaelcaires/"},
      { name: "LinkedIn", url: "https://www.linkedin.com/in/dev-raphaelcaires/"}
    ]
  }

  return res.render("about", { about })
})

server.get("/portfolio", function(req, res) {
  return res.render("portfolio", {
    items: videos
  })
})

server.get("/video", function(req, res) {
  const id = req.query.id

  const video = videos.find(function(video) {
    return video.id == id
  })

  if (!video) {
    return res.send("Video not found!")
  }

  return res.render("video", { item: video })
})

server.listen(5000, function() {
  console.log("server is running")
})