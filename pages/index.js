import React, { useState, useEffect } from 'react'
import * as axios from 'axios';
import * as xml2js from 'xml2js'
const parser = new xml2js.Parser();

const App = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const getCollection = async () => {
    console.log('get collection for username', username);
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
      console.log('mapped collection is', results);
    } catch(e) {
      console.warn(`failed to get Collection for username: ${username}, failed with ${e}`);
      setError(e);
    } finally {
      setUsername('');
    }
  };

  return(
    <div>
      <div>hello gamers!</div>
      {error && <div>Error: {error}</div>}
      <input type="text" onChange={e => setUsername(e.target.value)}/>
      <button onClick={getCollection}>Get</button>
      <style jsx>{`
      `}</style>
    </div>
  );
};

export default App;
