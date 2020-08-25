const express = require("express");
const cors = require("cors");
const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs}= request.body;
 
  const repository ={
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);
  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
    const {id}= request.params;
    const {title, url, techs}= request.body;

    const repositoryIndex = repositories.findIndex(project => project.id === id)

    if(repositoryIndex < 0){
      return response.status(400).json({message: 'repository not '})
    }
    
    const repository = {
      ...repositories[repositoryIndex],
      title,
      url,
      techs,
    }

    repositories[repositoryIndex]= repository;

    return response.status(200).json(repository);
  
});

app.delete("/repositories/:id", (request, response) => {
    const { id }= request.params;

    const repositoryIndex = repositories.findIndex(project => project.id === id)

    if(repositoryIndex < 0){
      return response.status(400).json({message:"repository is not defined"});

    }

    repositories.splice(repositoryIndex, 1);
    return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id }=request.params;
  
  const repositoryIndex= repositories.findIndex(project => project.id === id);
  if(repositoryIndex < 0){
    return response.status(400).json({erro: 'repository does not exist'});

  }
  repositories[repositoryIndex].likes += 1;

  return response.json(repositories[repositoryIndex]);

});

module.exports = app;
