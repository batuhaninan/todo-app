const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.username) {
      res.status(400).send({
          message: "Content can not be empty!"
      });
      return;
  }

  const user = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      todoCount: 0,
  }

  User.create(user)
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "An error occurred while creating user"
        })
    })

};

exports.findAll = (req, res) => {
    User.findAll()
	.then(data => {
		res.send(data);
	})
	.catch(err => {
		res.status(500).send({
			message: err.message || "An error occurred while retrieving users"
	});
    });
};

exports.findOne = (req, res) => {
	const id = req.params.id;

	User.findByPk(id)
	  .then(data => {
		res.send(data);
	  })
	  .catch(err => {
		res.status(500).send({
		  message: `Error retrieving user with id=${id}`
		});
	  });
};

exports.delete = (req, res) => {
	const id = req.params.id;

	User.destroy({
	  where: { id: id }
	})
	  .then(num => {
		if (num == 1) {
		  res.send({
			message: "User was deleted successfully!"
		  });
		} else {
		  res.send({
			message: `Cannot delete User with id=${id}`
		  });
		}
	  })
	  .catch(err => {
		res.status(500).send({
		  message: "Could not delete User with id=" + id
		});
	  });
};

exports.deleteAll = (req, res) => {
	User.destroy({
		where: {},
		truncate: false
	  })
		.then(nums => {
		  res.send({ message: `${nums} Users were deleted successfully!` });
		})
		.catch(err => {
		  res.status(500).send({
			message:
			  err.message || "An error occurred while removing all users."
		  });
		});
};