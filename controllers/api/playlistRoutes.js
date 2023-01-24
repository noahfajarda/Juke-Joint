const router = require("express").Router();
const Playlist = require("../../models/Playlist");

router.post('/', async (req,res) => {
    try {
        Playlist.create({
            trackName: req.body.trackName,
            trackArtist: req.body.trackArtist,
        })
            .then((playlistData) => {
                res.json(playlistData);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(error);
            });
    } catch (err) {
        res.status(500).json(err);
    }
})


router.get('/playlist', async (req,res) => {
    console.log("GETTING PLAYLIST TEST")
    try {
        console.log('TEST FOR TRY BLOVK')
        Playlist.findAll({
            // where: {
            //     trackName: {
            //         [Op.not]: null,
            //     }
            // },
        })
            .then((playlistData) => {
                const filteredData = playlistData.map((playlist) => playlist.get({ plain: true }));

                console.log('TESTINGGGGG')
                console.log(filteredData)
                res.render("playlist", { filteredData } );
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(error);
            });
    } catch (err) {
        res.status(500).json(err);
    }
})


router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Playlist.findByIdAndDelete(id)
      .then(() => res.json({ success: true }))
      .catch(err => res.status(404).json({ success: false }));
  });


module.exports = router;
