import {useState} from 'react'
import Header from '../../compnents/header/header'
import Explore from '../../compnents/exploreMenu/explore'
import './home.css'
import Display from '../../compnents/displayFood/display'
const Home = () => {
  const [category,setCategory] = useState('All')

  return (
    <div>
        <Header />
        <Explore category={category} setCategory={setCategory}/>
        <Display category={category}/>
    </div>
  )
}

export default Home