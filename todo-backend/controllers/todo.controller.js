const db = require("../models");
const Todo = db.todo;
const User = db.user;
const Op = db.Sequelize.Op;

const DatabaseUtils = require("../utils/database.util.js");
const addUsernameToData = DatabaseUtils.addUsernameToData;
const addUsernameToSingleData = DatabaseUtils.addUsernameToSingleData;


exports.create = (req, res) => {
  if (!req.body.text) {
      res.status(400).send({
          message: "Content can not be empty!"
      });
      return;
  }

  const todo = {
      text: req.body.text,
      userId: req.body.userId,
      isFinished: false,
  }

  Todo.create(todo)
    .then(async (data) => {
        User.increment("todoCount", { by: 1, where: { id: todo.userId }});
		try {
			const response = await addUsernameToSingleData(data)
			await res.send(response)
		} catch (error) {
			console.log(error)
		}
		
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "An error occurred while creating todo"
        })
    })

};


exports.findAll = (req, res) => {
    Todo.findAll()
	.then(async (data) => {
		const response = await addUsernameToData(data)
		await res.send(response)
	})
	.catch(err => {
		res.status(500).send({
			message: err.message || "An error occurred while retrieving todos"
	});
    });
};

exports.toggleFinished = (req, res) => {
	const id = req.params.id;

	const isFinished = req.body.isFinished;

	Todo.update({isFinished: true}, {
		where: {
			id: id
		}
	})
	  .then(data => {
		res.send(data);
	  })
	  .catch(err => {
		res.status(500).send({
		  message: `Error retrieving todo with id=${id}`
		});
	  });
};

exports.findOne = (req, res) => {
	const id = req.params.id;

	Todo.findByPk(id)
	  .then(data => {
		res.send(data);
	  })
	  .catch(err => {
		res.status(500).send({
		  message: `Error retrieving todo with id=${id}`
		});
	  });
};

exports.delete = (req, res) => {
	const id = req.params.id;

	Todo.destroy({
	  where: { id: id }
	})
	  .then(num => {
		if (num == 1) {
		  res.send({
			message: "Todo was deleted successfully!"
		  });
		} else {
		  res.send({
			message: `Cannot delete Todo with id=${id}`
		  });
		}
	  })
	  .catch(err => {
		res.status(500).send({
		  message: "Could not delete Todo with id=" + id
		});
	  });
};

exports.deleteAll = (req, res) => {
	Todo.destroy({
		where: {},
		truncate: false
	  })
		.then(nums => {
		  res.send({ message: `${nums} Todos were deleted successfully!` });
		})
		.catch(err => {
		  res.status(500).send({
			message:
			  err.message || "An error occurred while removing all todos."
		  });
		});
};