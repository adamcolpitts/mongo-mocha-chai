const mongoose = require('mongoose');
const Router = require('express').Router;
const championsRouter = Router();
const Champion = require('../../models/champion');

championsRouter.route('')
  /*
  * GET /v1/champion to save a new book.
  */
  .get((req, res) => {
    //Query the DB and if no errors, send all the books
    let query = Champion.find({});
    query.exec((err, champs) => {
      if(err) res.send(err);
      //If no errors, send them back to the client
      res.json(champs);
    });
  })
  /*
   * POST /v1/champion to save a new book.
   */
  .post((req, res) => {
    //Creates a new champion
    var newChamp = new Champion(req.body);
    //Save it into the DB.
    newChamp.save((err,champ) => {
      if(err) {
        res.send(err);
      }
      else { //If no errors, send it back to the client
        res.json({message: "Champion successfully added!", champ });
      }
    });
  });

championsRouter.route('/:id')
  .get((req, res) => {
    Champion.findById(req.params.id, (err, champ) => {
      if(err) res.send(err);
      // If no errors, send it back to the client
      res.json(champ);
    });
  })
  .post((req, res) => {
    // Creates a new champion
    var newChamp = new Champion(req.body);
    // Save it into the DB.
    newChamp.save((err,champ) => {
      if(err) {
        res.send(err);
      }
      else { // If no errors, send it back to the client
        res.json({message: "Champion successfully added!", champ });
      }
    });
  })
  .put((req, res) => {
    Champion.findById({_id: req.params.id}, (err, champ) => {
      if(err) res.send(err);
      Object.assign(champ, req.body).save((err, champ) => {
        if(err) res.send(err);
        res.json({ message: 'Champion updated!', champ });
      });
    });
  })
  .delete((req, res) => {
    Champion.deleteOne({_id : req.params.id}, (err, result) => {
      res.json({ message: "Champion successfully deleted!", result });
    });
  });

module.exports = championsRouter;
