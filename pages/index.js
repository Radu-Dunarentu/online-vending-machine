import React, { useState, useEffect } from 'react'
import * as axios from 'axios';
import * as xml2js from 'xml2js'
const parser = new xml2js.Parser();
const baseUrl = 'http://localhost:3000/api';

const App = () => {
  const [username, setUsername] = useState('');
  const [collection, setCollection] = useState(null);
  const [error, setError] = useState('');

  const getCollection = async () => {
    console.log('get collection for username', username);
    setCollection(null);
    setError('');
    try {
      const {data} = await axios.get(`https://www.boardgamegeek.com/xmlapi2/collection?username=${username}&excludesubtype=boardgameexpansion&own=1`)
      const {items} = await parser.parseStringPromise(data);
      const results = items.item.map(e => {
        return {
          name: e.name[0]._,
          imageUrl: e.image[0],
          thumbnailUrl: e.thumbnail[0],
          yearPublished: e.yearpublished[0],
          objectType: e.$.objecttype,
          objectId: e.$.objectid,
          subtype: e.$.subtype,
          collectionId: e.$.collid
        }
      });
      setCollection(results);
      console.log('mapped collection is', results);
    } catch(e) {
      console.warn(`failed to get Collection for username: ${username}`, e);
      setError('failed to get collection, try again', username);
    }
  };

  const addCollection = async () => {
    console.log('add collection for', username);
    setError('');
    try {
      const data = await axios.post(`${baseUrl}/collections/${username}`, {collection});
      console.log('added Collection ', data);
    } catch(e) {
      console.warn('failed to add collection', e);
      setError('failed to add');
    } finally {
      setCollection(null);
      setUsername('');
    }
  };

  return(
    <div>
      <div>hello gamers!</div>
      {error && <div>Error: {error}</div>}
      {collection && <div>Collection set {collection.length}</div>}
      <input type="text" onChange={e => setUsername(e.target.value)}/>
      <button onClick={getCollection}>Get</button><button onClick={addCollection}>Set</button>
      <style jsx>{`
      `}</style>
    </div>
  );
};

export default App;
