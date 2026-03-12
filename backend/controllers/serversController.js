const Server = require("../Models/Servers");
const GameUser = require("../Models/GameUser");

exports.createServer = async (req, res) => {
  try {
    const server = new Server(req.body);
    await server.save();
    res.json(server);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllServers = async (req, res) => {
  try {
    const servers = await Server.find();
    res.json(servers);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.addGameUserToServer = async (req, res) => {
  try {
    const { serverId } = req.params;
    const newUserData = req.body;

    const server = await Server.findById(serverId);
    if (!server) return res.status(404).json({ message: "Server not found" });

    const newGameUser = new GameUser(newUserData); // create new GameUser
    server.users.push(newGameUser); // push into server's users array
    await server.save();

    res.status(201).json(newGameUser);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
