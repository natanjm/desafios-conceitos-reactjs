import React, {useState, useEffect} from "react";
import api from './services/api'
import "./styles.css";



function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      url: "www.teste.com",
      title: `Novo repositorio ${Date.now()}`,
      techs: "ReactJS"
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);

    const repositoryID = repositories.findIndex(repository => repository.id == id);
    setRepositories(repositories.filter(repository => repository.id != id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
