import { useEffect, useState} from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import './custom.css'

function App() {
  const [products, setProducts] = useState([])
  const [text,setText] = useState('')
  const [suggestions, setSuggestions] = useState([])
  useEffect(() => {
    const loadProducts = async () => {
      const response = await axios.get('http://127.0.0.1:5000/product/view')
      console.log(response.data)
      setProducts(response.data.data)
    }

    loadProducts()
  }, [])


  const onSuggestionHandler = (text)=> {
    setText(text)
    setSuggestions([])
  }

  const onChangeHandler = (text) => {
    let matches = []
    if (text.length>0){
      matches = products.filter(product => {
        const regex = new RegExp(`${text}`, "gi")
        return product.name.match(regex)
      })
    }
    console.log(matches)
    setSuggestions(matches)
    setText(text)
  }
  return (
    <div className="container">
    
      <input type="text" className="col-md-12" style={{marginTop: 10}}
        onChange={e => onChangeHandler(e.target.value)}
        value={text}
        onBlur={()=> {
          setTimeout(()=>{
            setSuggestions([])
          },100)
        }}
      />
      {suggestions && suggestions.map((suggestion,i) =>
        <div key={i} className="suggestion col-md-12 justify-content-md-center"
        onClick={()=> onSuggestionHandler(suggestion.name)}
        >{suggestion.name}</div>
      )}
    </div>
  );
}

export default App;
