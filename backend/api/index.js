//
const express = require("express");
const router = express.Router();
//
const cors = require("cors");
const axios = require("axios");

//
router.use(cors());
router.use(express.json());

//fn
async function findDataById(id) {
  //
  if (!id) return null;
  try {
    //
    const response = await axios.get(
      `https://todo-test-26825-default-rtdb.asia-southeast1.firebasedatabase.app/todos/${id}.json`
    );
    const data = response.data;

    if (data) {
      return {
        id,
        ...data,
      };
    } else {
      return null;
    }
  } catch (error) {
    //
    console.error("Error fetching data:", error);
    return null;
  }
}

//read all
router.get("/todos", async (req, res) => {
  //
  try {
    //
    const response = await axios.get(
      "https://todo-test-26825-default-rtdb.asia-southeast1.firebasedatabase.app/todos.json"
    );
    const data = response.data;

    const sendData = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));

    res.json({
      status: "success",
      datas: sendData,
      totalCount: sendData.length,
    });
  } catch (error) {
    //
    console.error("Error fetching data:", error);
    res.status(500).send({
      status: "error",
      message: "Error fetching data, " + error.message,
    });
  }
});

//read one
router.get("/todos/:id", async (req, res) => {
  //
  try {
    //
    const response = await axios.get(
      `https://todo-test-26825-default-rtdb.asia-southeast1.firebasedatabase.app/todos/${req.params.id}.json`
    );
    const data = response.data;

    if (data) {
      res.json({
        status: "success",
        data: {
          id: req.params.id,
          ...data,
        },
      });
    } else {
      res.status(404).send({
        status: "error",
        message: "Data not found",
      });
    }
  } catch (error) {
    //
    console.error("Error fetching data:", error);
    res.status(500).send({
      status: "error",
      message: "Error fetching data, " + error.message,
    });
  }
});

//create
router.post("/todos", async (req, res) => {
  //
  try {
    //
    console.log("req.body:", req.body);
    const { isDone, title, notes } = req.body;

    if (!title || !notes) {
      res.status(400).send({
        status: "error",
        message: "isDone, title, notes are required",
      });
      return;
    }

    const sort = new Date().getTime();
    const sendData = {
      isDone: !!isDone,
      title,
      notes,
      sort,
    };

    const response = await axios.post(
      "https://todo-test-26825-default-rtdb.asia-southeast1.firebasedatabase.app/todos.json",
      sendData
    );
    const data = response.data;

    res.json({
      status: "success",
      data: {
        id: data.name,
        ...sendData,
      },
    });
  } catch (error) {
    //
    console.error("Error posting data:", error);
    res.status(500).send({
      status: "error",
      message: "Error posting data, " + error.message,
    });
  }
});

//update
router.put("/todos/:id", async (req, res) => {
  //
  try {
    //
    const id = req.params.id;
    const foundData = await findDataById(id);
    if (!foundData) {
      res.status(404).send({
        status: "error",
        message: "data not found",
      });
      return;
    }

    //
    console.log("req.body:", req.body);
    const { isDone, title, notes, sort } = req.body;

    if (!title || !notes) {
      res.status(400).send({
        status: "error",
        message: "title, notes are required",
      });
      return;
    }

    const sendData = {
      isDone: !!isDone,
      sort: sort || foundData.sort || new Date().getTime(),
      title,
      notes,
    };

    const response = await axios.put(
      `https://todo-test-26825-default-rtdb.asia-southeast1.firebasedatabase.app/todos/${id}.json`,
      sendData
    );
    const data = response.data;

    res.json({
      status: "success",
      data: {
        id,
        ...data,
      },
    });
  } catch (error) {
    //
    console.error("Error putting data:", error);
    res.status(500).send({
      status: "error",
      message: "Error putting data, " + error.message,
    });
  }
});

//delete
router.delete("/todos/:id", async (req, res) => {
  //
  try {
    //
    const id = req.params.id;
    const foundData = await findDataById(id);
    if (!foundData) {
      res.status(404).send({
        status: "error",
        message: "data not found",
      });
      return;
    }

    const response = await axios.delete(
      `https://todo-test-26825-default-rtdb.asia-southeast1.firebasedatabase.app/todos/${id}.json`
    );
    const data = response.data;

    res.json({
      status: "success",
      data: {
        id,
        ...data,
      },
    });
  } catch (error) {
    //
    console.error("Error deleting data:", error);
    res.status(500).send({
      status: "error",
      message: "Error deleting data, " + error.message,
    });
  }
});

//err
router.use("/*", (req, res) => {
  throw new Error("無此路徑");
});
router.use((err, req, res, next) => {
  let err_obj = {
    message: "404 somthing wrong",
    req_url: "/api" + req.url, //if .use 加了 url 前綴會讀不到 req.url
    req_way: req.method,
  };

  res.status(404).json(err_obj);
});

module.exports = router;
