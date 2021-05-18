import { hot } from 'react-hot-loader/root';
import React, { useEffect, useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';

function App(props) {
  
   const [jokes, setJokes] = useState([]);
   const [fetchJokes, setFetchJokes] = useState([]);
   
   const [favtJokes, setFavtJokes] = useState([]);

   if(localStorage.getItem ('favtJokes')){
    setFavtJokes(localStorage.setItem (favtJokes));
   }

   const [randomInterval, setRandomInterval] = useState([]);
   const [isLoading, setLoading] = useState(false);
    
  
  

   useEffect(() => {
    fetch('https://api.icndb.com/jokes/random/10')
    .then((res) => res.json())
    .then((res) => {
    //   console.log(res);
      setJokes(res.value)
      setFetchJokes(res.value.slice(0, 10))
    })
    .catch((err) => console.log(err));
  },[]);

  const favJokes = (id) => {

    console.log(favtJokes);
    //   console.log('liking', id);
      if (favtJokes.length < 10) {
        if (favtJokes.find((j) => j.id === id)) return;
        const favtJokesNew = jokes.find((j) => j.id === id);
        favtJokes.push(favtJokesNew);
        setFavtJokes([...favtJokes]);

        localStorage.setItem([...favtJokes]);
      }
  }
  const unlikeFavJoke = (id) => {
      
    const newUnlikedJokes = favtJokes.filter((j) => j.id !== id);
    setFavtJokes(newUnlikedJokes);  
  };

  const fetchRandom = () => {
        setLoading(true);
      if (!Array.isArray(randomInterval) && randomInterval!==null) {
        clearInterval(randomInterval);
        setRandomInterval(null);
        if(localStorage.getItem('favtJokes')){
            setFavtJokes(localStorage.setItem([...favtJokes]));
        }
        setLoading(false);
      } else {
        console.log(randomInterval);
        setRandomInterval(setInterval(() => {
            if (favtJokes.length < 10) {
                fetch('https://api.icndb.com/jokes/random/1')
                .then((res) => res.json())
                .then((res) => {
                //   console.log(res);
                jokes.push(res.value[0]);
                setJokes([...jokes]);
                favJokes(res.value[0].id);
                setLoading(true);
                if(localStorage.getItem('favtJokes')){
                  setFavtJokes(localStorage.setItem([...favtJokes]));
              }
                })
                .catch((err) => console.log(err));
            }

           

        }, 5000));
      }
  }
  
  const handleClick = () => setLoading(true);
    return (
        
            <div className="App">
                <h1 align="center">Chuck Norries jokes</h1>

                <Button type="button" class={isLoading ? "btn btn-success" : "btn btn-primary"} onClick={() => fetchRandom()}>{isLoading ? 'Loading…' : 'Click to load'}</Button>
                <div className="tab-wrapper">
                <div className='container-fluid' >
                    <div className="row">
                    <div className="col-sm-12">
                        <Tabs defaultActiveKey="jokePanel" transition={false} >
                            <Tab eventKey="jokes" title="Fetch Jokes">
                            {fetchJokes.map((joke) => ( 
                            <div className="row">
                                <div className="col-sm-11">
                                <ul><li key={joke.id}>{joke.joke}   </li>   </ul>
                                </div>
                                <div className="col-sm-1"><button type="button" class="btn btn-info"  onClick={() => favJokes(joke.id)}>Add</button></div>
                            </div>
                             ) )}
                            </Tab>
                            <Tab eventKey="favtJokes" title="Favorite Jokes">
                            {favtJokes.map((joke) => (             
                            <div className="row">
                                <div className="col-sm-11">
                                    <ul> <li key={joke.id}>{joke.joke}   </li>  </ul>
                                </div>
                                <div className="col-sm-1"><button type="button" class="btn btn-info" onClick={() => unlikeFavJoke(joke.id)}>unlike</button></div>
                            </div>
                             ) )}

                                  <div>
                                

                                </div>
                            </Tab>                        
                        </Tabs>

                    </div>
                    </div>
                </div>
                </div>
                
               
                <div>

               
                </div>
                

            </div>
        
    );
}

export default hot(App);