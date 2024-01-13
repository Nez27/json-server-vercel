// See https://github.com/typicode/json-server#module
import jsonServer from "json-server";
import fs from "fs";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import {
  searchMusics,
  searchAlbums,
  searchPlaylists,
  getSuggestions,
  listMusicsFromAlbum,
  listMusicsFromPlaylist,
  searchArtists,
  getArtist,
} from "node-youtube-music";

const server = jsonServer.create();

// Uncomment to allow write operations
const filePath = path.join("db.json");
const data = fs.readFileSync(filePath, "utf-8");
const db = JSON.parse(data);
const router = jsonServer.router(db);

// Comment out to allow write operations
// const router = jsonServer.router('db.json')

const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(bodyParser.json());
server.use(
  cors({
    origin: "*",
  })
);

// Example: /search/musics?query=Ram%20ayenge
server.get("/api/express/search/musics", async (req, res) => {
  try {
    const musics = await searchMusics(req.query.query);
    res.json(musics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Example: /search/albums?query=Human%20after%20all
server.get("/api/express/search/albums", async (req, res) => {
  try {
    const albums = await searchAlbums(req.query.query);
    res.json(albums);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Example: /search/playlists?query=Jazz
server.get("/api/express/search/playlists", async (req, res) => {
  try {
    const playlists = await searchPlaylists(req.query.query);
    res.json(playlists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Example: /search/artists?query=Daft%20Punk
server.get("/api/express/search/artists", async (req, res) => {
  try {
    const artists = await searchArtists(req.query.query);
    res.json(artists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Example: /suggestions/{youtubeId}
server.get("/api/express/suggestions/:youtubeId", async (req, res) => {
  try {
    const suggestions = await getSuggestions(req.params.youtubeId);
    res.json(suggestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Example: /albums/{albumId}
server.get("/api/express/albums/:albumId", async (req, res) => {
  try {
    const albumSongs = await listMusicsFromAlbum(req.params.albumId);
    res.json(albumSongs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Example: /playlists/{playlistId}
server.get("/api/express/playlists/:playlistId", async (req, res) => {
  try {
    const playlistSongs = await listMusicsFromPlaylist(req.params.playlistId);
    res.json(playlistSongs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Example: /artists/{artistId}
server.get("/api/express/artists/:artistId", async (req, res) => {
  try {
    const artist = await getArtist(req.params.artistId);
    res.json(artist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
